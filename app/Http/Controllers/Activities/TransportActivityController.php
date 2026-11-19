<?php

namespace App\Http\Controllers\Activities;

use App\Http\Requests\TransportActivityRequest;
use App\Models\Activity;
use App\Models\CarbonFootprint;
use App\Models\EmissionFactor;
use App\Models\Period;
use App\Models\TransportActivity;
use App\Models\TransportEmissionFactor;
use App\Models\TransportType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TransportActivityController
{



    /**
     * Store a newly created resource in storage.
     */
    public function store(TransportActivityRequest $request)
    {
        $data = $request->validated();

        $fuel_type = $data['fuel_type_id'];

        $emission_factor = TransportEmissionFactor::with(['emissionFactor'])->where([
            'transport_type_id' => $data['transport_type_id'],
            'fuel_type_id' => $fuel_type,

        ])->whereHas('emissionFactor', function ($query) {
            $query->where('active', true);
        })->get()->first();

        if (!$emission_factor) {
            return back()->with('error', 'Aun no tenemos un factor de emision para ese transporte o combustible');
        }



        $period = Period::where('user_id', auth()->id())
            ->whereDate('start_date', '<=', $data['activity_date'])
            ->whereDate('end_date', '>=', $data['activity_date'])
            ->first();

        if (!$period) {
            $start_date = Carbon::parse($data['activity_date'])->startOfMonth()->toDateString();
            $end_date = Carbon::parse($data['activity_date'])->endOfMonth()->toDateString();
            $name_period = Str::ucfirst(Carbon::parse($data['activity_date'])->locale('es')->translatedFormat('F \d\e Y'));

            $period = Auth::user()->periods()->create([
                'name' => $name_period,
                'start_date' => $start_date,
                'end_date' => $end_date
            ]);
        }

        $carbon_footprint =  CarbonFootprint::where('period_id', '=', $period->id)->first();

        if (!$carbon_footprint) {
            $carbon_footprint = $period->carbonFootprint()->create([
                'total_emissions' => 0,
                'calculated_at' => now()
            ]);
        }


        try {
            DB::transaction(function () use ($carbon_footprint, $emission_factor, $data, $period) {
                $name_activity = TransportType::find($data['transport_type_id'], ['name'])->name;

                $activity = Activity::create([
                    'period_id' => $period->id,
                    'activity_category_id' => 1,
                    'emission_factor_id' => $emission_factor->emission_factor_id,
                    'activity_date' => $data['activity_date'],
                    'name' => $name_activity,
                    'description' => $data['description'],
                    'quantity' => $data['quantity'],
                    'measurement_unit_id' => $data['measurement_unit_id']
                ]);

                $activity->transportDetail()->create([
                    'transport_type_id' => $data['transport_type_id'],
                    'fuel_type_id' => $data['fuel_type_id']
                ]);

                $emissions =  $data['quantity'] * $emission_factor->emissionFactor->value;


                $carbon_footprint->items()->create([
                    'activity_id' => $activity->id,
                    'category_id' => 1,
                    'activity_description' => $activity->description,
                    'quantity' => $activity->quantity,
                    'measurement_unit_id' => $data['measurement_unit_id'],
                    'emission_factor_value' => $emission_factor->emissionFactor->value,
                    'emissions' => $emissions
                ]);

                $carbon_footprint->update([
                    'total_emissions' => $carbon_footprint->total_emissions + $emissions
                ]);
            });
            return redirect()->route('dashboard.activities.index')->with('status', 'Registro creado con exito');
        } catch (\Exception $e) {
            return back()->with(
                'error',
                'Hubo un error al registrar la actividad'
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TransportActivity $transportActivity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TransportActivity $transportActivity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TransportActivityRequest $request, Activity $activity)
    {
        $data = $request->validated();
        $emission_factor = TransportEmissionFactor::with(['emissionFactor'])->where([
            'transport_type_id' => $data['transport_type_id'],
            'fuel_type_id' => $data['fuel_type_id'],

        ])->whereHas('emissionFactor', function ($query) {
            $query->where('active', true);
        })->get()->first();
        if (!$emission_factor) {
            return back()->with('error', 'Aun no tenemos un factor de emision para ese transporte o combustible');
        }
        $name_activity = TransportType::find($data['transport_type_id'], ['name'])->name;

        try {
            DB::transaction(function () use ($name_activity, $data, $emission_factor, $activity,) {
                $activity->update([
                    'activity_date' => $data['activity_date'],
                    'name' => $name_activity,
                    'emission_factor_id' => $emission_factor->id,
                    'description' => $data['description'],
                    'quantity' => $data['quantity']

                ]);

                $activity->transportDetail()->update([
                    'transport_type_id' => $data['transport_type_id'],
                    'fuel_type_id' => $data['fuel_type_id']
                ]);


                $emissions = (float) $data['quantity'] * (float)$emission_factor->emissionFactor->value;

                $total_emisions = (float)$activity->carbonFootprintItem->carbonFootprint->total_emissions - (float)$activity->carbonFootprintItem->emissions;

                $activity->carbonFootprintItem()->update([
                    'emissions' => $emissions,
                    'quantity' => $data['quantity'],
                ]);
                $total_emisions = $total_emisions + $emissions;
                $activity->carbonFootprintItem->carbonFootprint()->update([
                    'total_emissions' => $total_emisions,
                ]);
            });
            return back()->with('status', 'Registro actualizado con exito');
        } catch (\Exception $e) {
            return back()->with(
                'error',
                'Hubo un error al actualizar la actividad'
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {

        try {
            DB::transaction(function () use ($activity) {
                $total_emisions = (float)$activity->carbonFootprintItem->carbonFootprint->total_emissions - (float)$activity->carbonFootprintItem->emissions;

                $activity->carbonFootprintItem->carbonFootprint()->update([
                    'total_emissions' => $total_emisions
                ]);

                $activity->delete();
            });

            return back()->with('status', 'Registro eliminado con exito');
        } catch (\Exception $e) {
            return back()->with(
                'error',
                'Hubo un error al eliminar la actividad'
            );
        }
    }
}
