<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\CarbonFootprint;
use App\Models\EquivalenceFactor;
use App\Models\Period;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PeriodController
{
    public function index()
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
            'lastestFootPrint' => $latestPeriod ? fn() => $latestPeriod->carbonFootprint->total_emissions : null,
            'promedioEmisiones' => $promedioEmisiones
        ]);
    }

    public function show(Period $period)
    {
        Gate::authorize('view', $period);
        $period->load(['carbonFootprint']);

        $activities = Activity::where('period_id', '=', $period->id)->with(['category', 'measurementUnit', 'carbonFootprintItem'])->paginate(4)->onEachSide(1);

        return Inertia::render('Dashboard/History/ShowPeriod', [
            'period' => $period,
            'activities' => $activities,
            'emissions_per_categories' => $period ? [
                'Transporte' =>  $period->carbonFootprint->items->where('category_id', 1)->sum('emissions'),
                'Energía' => $period->carbonFootprint->items->where('category_id', 2)->sum('emissions'),
            ] : null,
            'equivalenceFactors' => fn() => EquivalenceFactor::limit(3)->where('is_active', '=', true)->get()
        ]);
    }
}
