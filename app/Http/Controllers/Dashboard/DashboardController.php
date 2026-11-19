<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\ActivityCategory;
use App\Models\CarbonFootprint;
use App\Models\Period;
use App\Models\Recommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController
{
    public function index()
    {
        $user = Auth::user();
        $lastest_period = $user->periods()->latest()->first();



        $categories = $lastest_period
            ? ActivityCategory::query()
            ->whereHas('activities.carbonFootprintItem', function ($query) use ($lastest_period) {
                $query->where('carbon_footprint_id', $lastest_period->carbonFootprint->id)
                    ->where('emissions', '>', 0);
            })
            ->get()
            : collect();

        $mostEmissionsCategory = $lastest_period ? $lastest_period->carbonFootprint->items()
            ->orderByDesc('emissions')
            ->value('category_id') : null;


        $recommendations_for_you = Recommendation::query()
            ->withExists(['users as is_adopted' => function ($query) use ($user) {
                $query->where('users.id', $user->id);
            }])
            ->join('activity_categories as ac', 'ac.id', '=', 'recommendations.category_id')
            ->leftJoin('user_recommendations as ur', function ($join) use ($user) {
                $join->on('ur.recommendation_id', '=', 'recommendations.id')
                    ->where('ur.user_id', '=', $user->id);
            })
            ->where('recommendations.is_active', true)
            ->whereIn('recommendations.category_id', $categories->pluck('id'))
            ->select([
                'ac.name as category_name',
                'recommendations.*',
                'ur.status as user_status',
            ])
            ->orderByRaw(
                "CASE WHEN recommendations.category_id = ? AND recommendations.priority = 'high' THEN 1 ELSE 2 END",
                [$mostEmissionsCategory]
            )
            ->orderByDesc('recommendations.estimated_savings')
            ->limit(3)->get();


        return Inertia::render('Dashboard/Dashboard', [
            'recommendations_for_you' => fn() => $recommendations_for_you
        ]);
    }

    public function habits()
    {

        return Inertia::render('Dashboard/Habits/Habits');
    }

    public function history()
    {
        $user = Auth::user();

        $periods = $user ? Period::with(['carbonFootprint'])->where('user_id', '=', $user->id)->withSum(['items as transport_emissions' => function ($query) {
            $query->where('category_id', 1);
        }], 'emissions')
            ->withSum(['items as energy_emissions' => function ($query) {
                $query->where('category_id', 2);
            }], 'emissions')->paginate(3)->onEachSide(1) : null;

        $latestPeriod = $user ? $user->periods()->latest()->first() : null;

        $promedioEmisiones = $user
            ? CarbonFootprint::whereHas('period', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->avg('total_emissions')
            : null;





        return Inertia::render('Dashboard/History/History', [
            'periods' => fn() => $periods,
            'lastestFootPrint' => fn() => $latestPeriod->carbonFootprint->total_emissions,
            'promedioEmisiones' => $promedioEmisiones
        ]);
    }
}
