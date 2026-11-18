<?php

namespace App\Http\Controllers;

use App\Models\ActivityCategory;
use App\Models\EmissionFactor;
use App\Models\EnergySource;
use App\Models\FuelType;
use App\Models\MeasurementUnit;
use App\Models\TransportType;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class EmissionFactorController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $filterName = $request->query('nameEmission');
        $filterCategory = $request->query('categoryEmission');

        $factores = EmissionFactor::with(['activityCategory', 'measurementUnit'])->when($filterName, function ($query) use ($filterName) {
            return $query->where('name', 'ILIKE', '%' . $filterName . '%');
        })->when($filterCategory && $filterCategory !== 'all', function ($query) use ($filterCategory) {
            return $query->where('category_id', '=', $filterCategory);
        })->paginate(4)->onEachSide(1)->withQueryString();

        $factores->groupBy('category_id')->each(function ($grupo, $categoryId) {
            match ((int) $categoryId) {
                1 => $grupo->load(['transportEmissionFactor', 'transportEmissionFactor.transportType', 'transportEmissionFactor.fuelType']),
                2 => $grupo->load(['energyEmissionFactor', 'energyEmissionFactor.energySource'])
            };
        });

        return Inertia::render('Admin/EmisionFactors/EmisionFactors', [
            'emissionFactors' => fn() => $factores,
            'activityCategories' => fn() => ActivityCategory::all(),
            'energySource' => fn() =>  EnergySource::all(),
            'transportType' => fn() =>  TransportType::all(),
            'fuelType' => fn() =>  FuelType::all(),
            'measurementUnits' => fn() => MeasurementUnit::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $category_id = $request->validate([
            'category_id' => ['numeric', 'exists:activity_categories,id']
        ])['category_id'];


        switch ($category_id) {
            case 1:
                $data = $request->validate([
                    'name' => ['required', 'string', 'max:150'],
                    'measurement_unit_id' => ['required', 'numeric', 'exists:measurement_units,id'],
                    'value' => ['required', 'decimal:0,6'],
                    'source' => ['required', 'string'],
                    'valid_from' => ['required', 'date', 'after_or_equal:1930-01-01'],
                    'valid_until' => ['nullable', 'date', 'after_or_equal:1930-01-01'],
                    'active' => ['required', 'boolean'],
                    'transport_type_id' => ['required', 'numeric', 'exists:transport_types,id'],
                    'fuel_type_id' => ['required', 'numeric', 'exists:fuel_types,id']
                ]);


                try {
                    DB::transaction(function () use ($category_id, $data) {
                        $emissionFactor = EmissionFactor::create([
                            'category_id' => $category_id,
                            'name' => $data['name'],
                            'measurement_unit_id' => $data['measurement_unit_id'],
                            'value' => $data['value'],
                            'source' => $data['source'],
                            'valid_from' => $data['valid_from'],
                            'valid_until' => $data['valid_until'],
                            'active' => $data['active'],
                            'created_at' => now()

                        ]);

                        $emissionFactor->transportEmissionFactor()->create([
                            'emission_factor_id' => $emissionFactor->id,
                            'transport_type_id' => $data['transport_type_id'],
                            'fuel_type_id' => $data['fuel_type_id'],
                            'created_at' => now()
                        ]);
                    });
                    return back()->with('status', 'Factor de emision creado con exito.');
                } catch (Exception $e) {
                    if (
                        $e->getCode() === '23505'
                    ) {
                        return back()->with(
                            'error',
                            'Ya existe un factor con esa combinacion.'
                        );
                    }
                    return back()->with('error', 'Hubo un error al crear el factor de emision.');
                }
            case 2:
                $data = $request->validate([
                    'name' => ['required', 'string', 'max:150'],
                    'measurement_unit_id' => ['required', 'numeric', 'exists:measurement_units,id'],
                    'value' => ['required', 'decimal:0,6'],
                    'source' => ['required', 'string'],
                    'valid_from' => ['required', 'date', 'after_or_equal:1930-01-01'],
                    'valid_until' => ['nullable', 'date', 'after_or_equal:1930-01-01'],
                    'active' => ['required', 'boolean'],
                    'energy_source_id' => ['required', 'numeric', 'exists:energy_sources,id'],

                ]);


                try {
                    DB::transaction(function () use ($category_id, $data) {
                        $emissionFactor = EmissionFactor::create([
                            'category_id' => $category_id,
                            'name' => $data['name'],
                            'measurement_unit_id' => $data['measurement_unit_id'],
                            'value' => $data['value'],
                            'source' => $data['source'],
                            'valid_from' => $data['valid_from'],
                            'valid_until' => $data['valid_until'],
                            'active' => $data['active'],
                            'created_at' => now()

                        ]);

                        $emissionFactor->energyEmissionFactor()->create([
                            'emission_factor_id' => $emissionFactor->id,
                            'energy_source_id' => $data['energy_source_id'],
                            'created_at' => now()
                        ]);
                    });
                    return back()->with('status', 'Factor de emision creado con exito.');
                } catch (Exception $e) {
                    if (
                        $e->getCode() === '23505'
                    ) {
                        return back()->with(
                            'error',
                            'Ya existe un factor con esa combinacion.'
                        );
                    }
                    return back()->with('error', 'Hubo un error al crear el factor de emision.');
                }

            default:
                return back()->with('error', 'Categoria no valida');
        };
    }

    /**
     * Display the specified resource.
     */
    public function show(EmissionFactor $emissionFactor)
    {
        $emissionFactor->load(['activityCategory', 'measurementUnit']);

        if ($emissionFactor->category_id === 1) {
            $emissionFactor->load(['transportEmissionFactor', 'transportEmissionFactor.transportType']);
        } else {
            $emissionFactor->load(['energyEmissionFactor', 'energyEmissionFactor.energySource']);
        }

        return Inertia::render('Admin/EmisionFactors/Show/ShowFactor', [
            'emissionFactor' => $emissionFactor,
            'activityCategories' => fn() => ActivityCategory::all(),
            'energySource' => fn() =>  EnergySource::all(),
            'transportType' => fn() =>  TransportType::all(),
            'fuelType' => fn() =>  FuelType::all(),
            'measurementUnits' => fn() => MeasurementUnit::all()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmissionFactor $emissionFactor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EmissionFactor $emissionFactor)
    {
        $category_id = $request->validate([
            'category_id' => ['numeric', 'exists:activity_categories,id']
        ])['category_id'];

        switch ($category_id) {
            case 1:
                $data = $request->validate([
                    'name' => ['required', 'string', 'max:150'],
                    'measurement_unit_id' => ['required', 'numeric', 'exists:measurement_units,id'],
                    'value' => ['required', 'decimal:0,6'],
                    'source' => ['required', 'string'],
                    'valid_from' => ['required', 'date', 'after_or_equal:1930-01-01'],
                    'valid_until' => ['nullable', 'date', 'after_or_equal:1930-01-01'],
                    'active' => ['required', 'boolean'],
                    'transport_type_id' => ['required', 'numeric', 'exists:transport_types,id'],
                    'fuel_type_id' => ['required', 'numeric', 'exists:fuel_types,id']
                ]);


                try {
                    DB::transaction(function () use ($category_id, $emissionFactor, $data) {
                        $emissionFactor->update([
                            'category_id' => $category_id,
                            'name' => $data['name'],
                            'measurement_unit_id' => $data['measurement_unit_id'],
                            'value' => $data['value'],
                            'source' => $data['source'],
                            'valid_from' => $data['valid_from'],
                            'valid_until' => $data['valid_until'],
                            'active' => $data['active']

                        ]);

                        $emissionFactor->transportEmissionFactor()->update([
                            'transport_type_id' => $data['transport_type_id'],
                            'fuel_type_id' => $data['fuel_type_id']
                        ]);
                    });
                    return back()->with('status', 'Factor de emision actualizado con exito.');
                } catch (Exception $e) {
                    if (
                        $e->getCode() === '23505'
                    ) {
                        return back()->with(
                            'error',
                            'Ya existe un factor con esa combinacion.'
                        );
                    }
                    return back()->with('error', 'Hubo un error al actualizar el factor de emision.');
                }
            case 2:
                $data = $request->validate([
                    'name' => ['required', 'string', 'max:150'],
                    'measurement_unit_id' => ['required', 'numeric', 'exists:measurement_units,id'],
                    'value' => ['required', 'decimal:0,6'],
                    'source' => ['required', 'string'],
                    'valid_from' => ['required', 'date', 'after_or_equal:1930-01-01'],
                    'valid_until' => ['nullable', 'date', 'after_or_equal:1930-01-01'],
                    'active' => ['required', 'boolean'],
                    'energy_source_id' => ['required', 'numeric', 'exists:energy_sources,id'],

                ]);


                try {
                    DB::transaction(function () use ($category_id, $emissionFactor, $data) {
                        $emissionFactor->update([
                            'category_id' => $category_id,
                            'name' => $data['name'],
                            'measurement_unit_id' => $data['measurement_unit_id'],
                            'value' => $data['value'],
                            'source' => $data['source'],
                            'valid_from' => $data['valid_from'],
                            'valid_until' => $data['valid_until'],
                            'active' => $data['active']

                        ]);

                        $emissionFactor->energyEmissionFactor()->update([
                            'energy_source_id' => $data['energy_source_id'],
                        ]);
                    });
                    return back()->with('status', 'Factor de emision actualizado con exito.');
                } catch (Exception $e) {
                    if (
                        $e->getCode() === '23505'
                    ) {
                        return back()->with(
                            'error',
                            'Ya existe un factor con esa combinacion.'
                        );
                    }
                    return back()->with('error', 'Hubo un error al actualizar el factor de emision.');
                }
            default:
                return back()->with('error', 'Categoria no valida');
        };
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmissionFactor $emissionFactor)
    {
        //
    }
}
