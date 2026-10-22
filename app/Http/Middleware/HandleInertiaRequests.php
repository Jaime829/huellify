<?php

namespace App\Http\Middleware;

use App\Models\ActivityCategory;
use App\Models\FuelType;
use App\Models\MeasurementUnit;
use App\Models\TransportType;
use Illuminate\Http\Request;
use Inertia\Middleware;

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

            ],
            'flash' => [
                'status' => fn() => $request->session()->get('status'),
                'error'   => fn() => $request->session()->get('error'),
            ],
        ]);
    }
}
