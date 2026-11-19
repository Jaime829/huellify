<?php

namespace App\Http\Controllers;

use App\Models\ActivityCategory;
use App\Models\CarbonFootprintItem;
use App\Models\Recommendation;
use App\Models\UserRecommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecommendationController
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
            ->paginate(4, ['*'], 'for_you_page')->onEachSide(1)
            ->withQueryString();



        return Inertia::render('Dashboard/Recommendations/Recommendations', [
            'general_recommendations' => fn() => Recommendation::query()
                ->leftJoin('user_recommendations as ur', function ($join) use ($user) {
                    $join->on('ur.recommendation_id', '=', 'recommendations.id')
                        ->where('ur.user_id', '=', $user->id);
                })
                ->select([
                    'recommendations.*',
                    'ur.status as user_status',
                ])
                ->withExists(['users as is_adopted' => function ($query) use ($user) {
                    $query->where('users.id', $user->id);
                }])
                ->whereNull('recommendations.category_id')
                ->where('recommendations.is_active', true)
                ->orderByDesc('recommendations.estimated_savings')
                ->paginate(3, ['*'], 'general_page')->onEachSide(1)
                ->withQueryString(),
            'recommendations_for_you' => fn() => $recommendations_for_you,
        ]);
    }

    public function updateStatus(Recommendation $recommendation)
    {
        $user = Auth::user();

        $isUserAdoptRecommendation = $recommendation->users()->where('user_id', '=', $user->id)->exists();

        if (!$isUserAdoptRecommendation) {
            return UserRecommendation::create([
                'user_id' => $user->id,
                'recommendation_id' => $recommendation->id,
                'status' => 'adopted',
                'adopted_at' => now()
            ]) ?  back()->with('status', 'Recomendacion adoptada con exito.') : back()->with('error', 'Error al adoptar la recomendacion');
        }
        $userRecommendationSaved = UserRecommendation::where([
            ['user_id', '=', $user->id],
            ['recommendation_id', '=', $recommendation->id]
        ])->first();

        if ($userRecommendationSaved->status === 'adopted') {
            return $userRecommendationSaved->update([
                'status' => 'pending'
            ]) ? back()->with('status', 'Recomendacion marcada como pendiente correctamente') : back()->with('error', 'Hubo un error al marcar la recomendacion como pendiente');
        }

        return $userRecommendationSaved->update([
            'status' => 'adopted'
        ]) ? back()->with('status', 'Recomendacion readoptada correctamente') : back()->with('error', 'Hubo un error al readoptada la recomendacion');
    }
}
