<?php

namespace App\Http\Middleware;

use App\Models\Activity;
use App\Models\ActivityCategory;
use App\Models\CarbonFootprint;
use App\Models\FuelType;
use App\Models\MeasurementUnit;
use App\Models\Period;
use App\Models\TransportType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;

use function PHPSTORM_META\map;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'layouts/app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();



        $periods = $user ? Period::where('user_id', $user->id)
            ->with('carbonFootprint')
            ->orderBy('created_at', 'asc')
            ->get() : null;

        $previousEmissions = null;

        $periodsWithVariation = $user ? $periods->map(function ($period) use (&$previousEmissions) {
            $currentEmissions = $period->carbonFootprint?->total_emissions ?? 0;
            if ($previousEmissions !== null && $previousEmissions > 0) {
                $variation = (($currentEmissions - $previousEmissions) / $previousEmissions) * 100;
            } else {
                $variation = 0;
            }

            $previousEmissions = $currentEmissions;

            return [
                'id' => $period->id,
                'name' => $period->name,
                'created_at' => $period->created_at->format('Y-m-d'),
                'total_emissions' => $currentEmissions,
                'variation_percentage' => round($variation, 2),
            ];
        }) : null;


        $categoriaMasContaminante = DB::table('periods as p')
            ->join('activities as a', 'p.id', '=', 'a.period_id')
            ->join('activity_categories as ac', 'a.activity_category_id', '=', 'ac.id')
            ->join('carbon_footprint_items as cfi', 'a.id', '=', 'cfi.activity_id')
            ->where('p.user_id', $user->id)
            ->groupBy('ac.id', 'ac.name')
            ->select('ac.name', 'ac.slug', DB::raw('SUM(cfi.emissions) as total_emissions'))
            ->orderByDesc('total_emissions')
            ->first();


        $latestPeriod = $user ? Auth::user()->periods()->latest()->first() : null;

        $typeFilter = $request->query('category_type');


        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'dias_activos' => $request->user()?->diasActivos() ?? 0,
                'activitiesCategory' => ActivityCategory::all(),
                'transport' => [
                    'types' => TransportType::all(),
                    'fuelTypes' => FuelType::all(),
                    'measurementUnits' => MeasurementUnit::where('measurement_type', '=', 'distance')->get()
                ],
                'mostFrequentActivity' => $categoriaMasContaminante,
                'last_footprint' => $latestPeriod ? $latestPeriod->carbonFootprint : null,
                'emissions_per_categories' => $latestPeriod ? [
                    'transport' =>  $latestPeriod->carbonFootprint->items->where('category_id', 1)->sum('emissions'),
                    'energy' => $latestPeriod->carbonFootprint->items->where('category_id', 2)->sum('emissions'),
                    'food' => $latestPeriod->carbonFootprint->items->where('category_id', 3)->sum('emissions'),
                    'waste' => $latestPeriod->carbonFootprint->items->where('category_id', 4)->sum('emissions')
                ] : null,
                'periods' => $periodsWithVariation,
                'periodsGraphic' => [
                    3 =>    Period::whereDate('start_date', '>=', Carbon::now()->subMonths(3))->where('user_id', '=', $user->id)->join('carbon_footprints as cf', 'periods.id', '=', 'cf.period_id')->select('periods.name as mes', 'cf.total_emissions as emisiones')->get(),
                    6 =>    Period::whereDate('start_date', '>=', Carbon::now()->subMonths(6))->where('user_id', '=', $user->id)->join('carbon_footprints as cf', 'periods.id', '=', 'cf.period_id')->select('periods.name as mes', 'cf.total_emissions as emisiones')->get(),
                    12 =>    Period::whereDate('start_date', '>=', Carbon::now()->subMonths(12))->where('user_id', '=', $user->id)->join('carbon_footprints as cf', 'periods.id', '=', 'cf.period_id')->select('periods.name as mes', 'cf.total_emissions as emisiones')->get(),
                ],
                'activities' => $user ? DB::table('periods as p')
                    ->join('activities as a', 'p.id', '=', 'a.period_id')
                    ->join('activity_categories as ac', 'a.activity_category_id', '=', 'ac.id')
                    ->join('carbon_footprint_items as cfi', 'a.id', '=', 'cfi.activity_id')
                    ->where('p.user_id', $request->user()->id)
                    ->when($typeFilter && $typeFilter !== 'all', function ($query) use ($typeFilter) {
                        return $query->where('ac.id', $typeFilter);
                    })
                    ->select('a.*', 'ac.name as category_name', 'cfi.emissions')
                    ->paginate(5)
                    ->withQueryString()
                    : null,

            ],
            'flash' => [
                'status' => fn() => $request->session()->get('status'),
                'error'   => fn() => $request->session()->get('error'),
            ],
        ]);
    }
}
