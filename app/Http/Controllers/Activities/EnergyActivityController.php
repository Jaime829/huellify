<?php

namespace App\Http\Controllers\Activities;

use App\Http\Requests\EnergyActivityRequest;
use App\Models\Activity;
use App\Models\CarbonFootprint;
use App\Models\EnergyEmissionFactor;
use App\Models\EnergySource;
use App\Models\Period;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EnergyActivityController
{
    public function store(EnergyActivityRequest $request)
    {
        $data = $request->validated();

        $emission_factor = EnergyEmissionFactor::with(['emissionFactor'])->where([
            'energy_source_id' => $data['energy_source_id'],
        ])->whereHas('emissionFactor', function ($query) {
            $query->where('active', true);
        })->get()->first();

        if (!$emission_factor) {
            return back()->withErrors(['status' => 'Aun no tenemos un factor de emision para esa fuente de energia']);
        }

        $period = Period::where('user_id', auth()->id())
            ->whereDate('start_date', '<=', $data['activity_date'])
            ->whereDate('end_date', '>=', $data['activity_date'])
            ->first();

        if (!$period) {
            $start_date = Carbon::parse($data['activity_date'])->startOfMonth()->toDateString();
            $end_date = Carbon::parse($data['activity_date'])->endOfMonth()->toDateString();
            $name_period = Carbon::parse($data['activity_date'])->locale('es')->translatedFormat('F \d\e Y');

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
                $name_activity = EnergySource::find($data['energy_source_id'], ['name'])->name;

                $activity = Activity::create([
                    'period_id' => $period->id,
                    'activity_category_id' => 2,
                    'emission_factor_id' => $emission_factor->emission_factor_id,
                    'activity_date' => $data['activity_date'],
                    'name' => $name_activity,
                    'description' => $data['description'],
                    'quantity' => $data['quantity'],
                    'measurement_unit_id' => $data['measurement_unit_id']
                ]);

                $activity->energyDetail()->create([
                    'energy_source_id' => $data['energy_source_id'],
                ]);

                $emissions =  $data['quantity'] * $emission_factor->emissionFactor->value;


                $carbon_footprint->items()->create([
                    'activity_id' => $activity->id,
                    'category_id' => 2,
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
                'Hubo un error al registrar la actividad: ' . $e->getMessage()
            );
        }
    }
    public function update(EnergyActivityRequest $request, Activity $activity)
    {
        $data = $request->validated();
        $emission_factor = EnergyEmissionFactor::where([
            'energy_source_id' => $data['energy_source_id'],
        ])->whereHas('emissionFactor', function ($query) {
            $query->where('active', true);
        })->get()->first();
        if (!$emission_factor) {
            return back()->with('error', 'Aun no tenemos un factor de emision para ese transporte o combustible');
        }

        try {
            DB::transaction(function () use ($data, $emission_factor, $activity,) {
                $name_activity = EnergySource::find($data['energy_source_id'], ['name'])->name;
                $activity->update([
                    'activity_date' => $data['activity_date'],
                    'name' => $name_activity,
                    'emission_factor_id' => $emission_factor->id,
                    'description' => $data['description'],
                    'quantity' => $data['quantity']

                ]);

                $activity->energyDetail()->update([
                    'energy_source_id' => $data['energy_source_id'],
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
