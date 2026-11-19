<?php

namespace App\Http\Controllers;

use App\Models\ActivityCategory;
use App\Models\EmissionFactor;
use App\Models\EnergySource;
use App\Models\FuelType;
use App\Models\MeasurementUnit;
use App\Models\Recommendation;
use App\Models\TransportType;
use App\Models\User;
use App\Models\UserRecommendation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController
{
    public function index()
    {

        $factores = EmissionFactor::with(['activityCategory', 'measurementUnit'])->limit(4)->latest()->get();

        $factores->groupBy('category_id')->each(function ($grupo, $categoryId) {
            match ((int) $categoryId) {
                1 => $grupo->load(['transportEmissionFactor', 'transportEmissionFactor.transportType', 'transportEmissionFactor.fuelType']),
                2 => $grupo->load(['energyEmissionFactor', 'energyEmissionFactor.energySource'])
            };
        });



        return Inertia::render('Admin/Admin', [
            'totalEmissionsFactor' => EmissionFactor::all()->count(),
            'totalEmissionsFactorActive' => EmissionFactor::where('active', '=', true)->count(),
            'categoriasCubiertas' => fn() => ActivityCategory::pluck('name'),
            'lastestEmissionFactors' => fn() => $factores,
            'activityCategories' => fn() => ActivityCategory::all(),
            'energySource' => fn() =>  EnergySource::all(),
            'transportType' => fn() =>  TransportType::all(),
            'fuelType' => fn() =>  FuelType::all(),
            'measurementUnits' => fn() => MeasurementUnit::all(),

        ]);
    }

    public function recommendationsMetrics(Request $request)
    {
        $period = $request->query('period', 'all');
        $categoryId = $request->query('category_id', 'all');

        $startDate = match ($period) {
            '7d'  => now()->subDays(7),
            '30d' => now()->subDays(30),
            '6m'  => now()->subMonths(6),
            '12m' => now()->subMonths(12),
            default => null,
        };



        return Inertia::render('Admin/Recommendations/Metrics/RecommendationsMetrics', [
            'totalRecommendations' => Recommendation::all()->count(),
            'totalAdoptions' => UserRecommendation::select('recommendation_id')->where('status', '=', 'adopted')->distinct()->count(),
            'totalUsuarios' => User::whereHas('recommendations', function ($query) {
                $query->where('status', 'adopted');
            })->count(),
            'recommendationsGraphic' => fn() => [
                'general' =>  UserRecommendation::join('recommendations as r', 'r.id', 'user_recommendations.recommendation_id')->whereNull('r.category_id')->select('user_recommendations.recommendation_id')->where('user_recommendations.status', '=', 'adopted')->distinct()->count('user_recommendations.recommendation_id'),
                'transport' =>  UserRecommendation::join('recommendations as r', 'r.id', 'user_recommendations.recommendation_id')->where('r.category_id', '=', 1)->select('user_recommendations.recommendation_id')->where('user_recommendations.status', '=', 'adopted')->distinct()->count('user_recommendations.recommendation_id'),
                'energy' =>  UserRecommendation::join('recommendations as r', 'r.id', 'user_recommendations.recommendation_id')->where('r.category_id', '=', 2)->select('user_recommendations.recommendation_id')->where('user_recommendations.status', '=', 'adopted')->distinct()->count('user_recommendations.recommendation_id'),
            ],
            'topRecommendations' => fn() => UserRecommendation::join('recommendations as r', 'r.id', 'user_recommendations.recommendation_id')
                ->where('user_recommendations.status', 'adopted')
                ->when($startDate, fn($q) => $q->where('user_recommendations.created_at', '>=', $startDate))
                ->when($categoryId && $categoryId !== 'all', fn($q) => $q->where('r.category_id', '=', $categoryId))
                ->select('r.id', 'r.title', 'r.category_id', 'r.icon')
                ->selectRaw('COUNT(user_recommendations.id) as total_adoptions')
                ->groupBy('r.id', 'r.title', 'r.category_id', 'r.icon')
                ->orderByDesc('total_adoptions')
                ->limit(5)
                ->get(),
            'categories' => fn() => ActivityCategory::all()
        ]);
    }
}
