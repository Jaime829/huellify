<?php

namespace App\Http\Controllers\Transport;

use App\Http\Requests\TransportActivityRequest;
use App\Models\Activity;
use App\Models\CarbonFootprint;
use App\Models\EmissionFactor;
use App\Models\Period;
use App\Models\Period as ModelsPeriod;
use App\Models\TransportActivity;
use App\Models\TransportEmissionFactor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransportActivityController
{



    /**
     * Store a newly created resource in storage.
     */
    public function store(TransportActivityRequest $request)
    {
        $data = $request->validated();

        $fuel_type = $data['transport_type_id'] == 2 ? 6 : $data['fuel_type_id'];

        $emission_factor = TransportEmissionFactor::where([
            'transport_type_id' => $data['transport_type_id'],
            'fuel_type_id' => $fuel_type
        ])->get()->first();

        if (!$emission_factor) {
            return back()->withErrors(['status' => 'Aun no tenemos un factor de emision para ese transporte o combustible']);
        }



        $period = Period::where('user_id', auth()->id())
            ->whereDate('start_date', '<=', $data['activity_date'])
            ->whereDate('end_date', '>=', $data['activity_date'])
            ->first();

        if (!$period) {
            $start_date = Carbon::parse($data['activity_date'])->startOfMonth()->toDateString();
            $end_date = Carbon::parse($data['activity_date'])->endOfMonth()->toDateString();
            $name_period = Carbon::parse($data['activity_date'])->locale('es')->translatedFormat('F \d\e Y');

            $period = auth()->user()->periods()->create([
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


        return DB::transaction(function () use ($carbon_footprint, $emission_factor, $data, $period) {

            $activity = Activity::create([
                'period_id' => $period->id,
                'activity_category_id' => 1,
                'emission_factor_id' => $emission_factor->emission_factor_id,
                'activity_date' => $data['activity_date'],
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



            return redirect()->route('activities.index')->with('status', 'Registro creado con exito');
        });
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
    public function update(Request $request, TransportActivity $transportActivity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransportActivity $transportActivity)
    {
        //
    }
}
