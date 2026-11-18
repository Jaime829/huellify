<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityCategory;
use App\Models\EnergySource;
use App\Models\FuelType;
use App\Models\Period;
use App\Models\TransportType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ActivityController
{
    public function index(Request $request)
    {
        $user = $request->user();

        $typeFilter = $request->query('category_type');

        return Inertia::render(
            'Dashboard/Activities/Activities',
            [
                'activities' => $user ? fn() => Activity::query()
                    ->join('periods as p', 'p.id', '=', 'activities.period_id')
                    ->join('activity_categories as ac', 'activities.activity_category_id', '=', 'ac.id')
                    ->join('carbon_footprint_items as cfi', 'activities.id', '=', 'cfi.activity_id')
                    ->join('measurement_units as mu', 'activities.measurement_unit_id', '=', 'mu.id')
                    ->leftJoin('transport_details as td', 'activities.id', '=', 'td.activity_id')
                    ->leftJoin('energy_details as ed', 'activities.id', '=', 'ed.activity_id')

                    ->where('p.user_id', $user->id)
                    ->when($typeFilter && $typeFilter !== 'all', function ($query) use ($typeFilter) {
                        return $query->where('ac.id', $typeFilter);
                    })

                    ->select([
                        'activities.*',
                        'ac.name as category_name',
                        'mu.symbol as measurement_unit',
                        'cfi.emissions',
                        DB::raw('CASE
            WHEN activities.activity_category_id = 1 THEN td.transport_type_id
            ELSE ed.energy_source_id
        END as source_id'),
                        DB::raw('CASE
    WHEN activities.activity_category_id = 1 THEN td.fuel_type_id
END as fuel_type_id')
                    ])
                    ->paginate(5)->onEachSide(1)
                    ->withQueryString()
                    : null,
                'transportTypes' => fn() => TransportType::all(),
                'fuelTypes' => fn() => FuelType::all(),
                'energySources' => fn() => EnergySource::all()
            ]
        );
    }

    public function create()
    {
        return Inertia::render('Dashboard/Activities/CreateActivity');
    }
}
