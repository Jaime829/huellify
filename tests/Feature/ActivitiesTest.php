<?php

use App\Models\Activity;
use App\Models\CarbonFootprint;
use App\Models\EnergyEmissionFactor;
use App\Models\TransportEmissionFactor;
use App\Models\User;

beforeEach(function () {
    $this->seed();
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

it('muestra el listado y el formulario de actividades', function () {
    $this->get(route('dashboard.activities.index'))->assertOk();
    $this->get(route('dashboard.activities.create'))->assertOk();
});

it('valida los datos de una actividad de transporte', function () {
    $this->post(route('dashboard.activities.transport.store'), [])
        ->assertSessionHasErrors(['transport_type_id', 'fuel_type_id', 'quantity', 'measurement_unit_id', 'activity_date']);
});

it('registra una actividad de transporte y calcula sus emisiones', function () {
    $factor = TransportEmissionFactor::with('emissionFactor')
        ->whereHas('emissionFactor', fn ($query) => $query->where('active', true))
        ->firstOrFail();

    $quantity = 10;

    $this->post(route('dashboard.activities.transport.store'), [
        'transport_type_id' => $factor->transport_type_id,
        'fuel_type_id' => $factor->fuel_type_id,
        'quantity' => $quantity,
        'measurement_unit_id' => $factor->emissionFactor->measurement_unit_id,
        'activity_date' => now()->toDateString(),
        'description' => 'Trayecto de prueba',
    ])->assertRedirect(route('dashboard.activities.index'))->assertSessionHas('status', 'Registro creado con exito');

    $activity = Activity::where('activity_category_id', 1)->firstOrFail();
    $footprint = CarbonFootprint::where('period_id', $activity->period_id)->firstOrFail();
    $item = $activity->carbonFootprintItem;

    expect($item)->not->toBeNull();
    expect((float) $item->emissions)->toEqualWithDelta($quantity * (float) $factor->emissionFactor->value, 0.001);
    expect((float) $footprint->total_emissions)->toEqualWithDelta($quantity * (float) $factor->emissionFactor->value, 0.001);
    $this->assertDatabaseHas('transport_details', ['activity_id' => $activity->id]);
});

it('registra una actividad de energia y calcula sus emisiones', function () {
    $factor = EnergyEmissionFactor::with('emissionFactor')
        ->whereHas('emissionFactor', fn ($query) => $query->where('active', true))
        ->firstOrFail();

    $quantity = 20;

    $this->post(route('dashboard.activities.energy.store'), [
        'energy_source_id' => $factor->energy_source_id,
        'quantity' => $quantity,
        'measurement_unit_id' => $factor->emissionFactor->measurement_unit_id,
        'activity_date' => now()->toDateString(),
        'description' => 'Consumo de prueba',
    ])->assertRedirect(route('dashboard.activities.index'))->assertSessionHas('status', 'Registro creado con exito');

    $activity = Activity::where('activity_category_id', 2)->firstOrFail();
    $item = $activity->carbonFootprintItem;

    expect((float) $item->emissions)->toEqualWithDelta($quantity * (float) $factor->emissionFactor->value, 0.001);
    $this->assertDatabaseHas('energy_details', ['activity_id' => $activity->id]);
});

it('actualiza una actividad de transporte y recalcula el total', function () {
    $factor = TransportEmissionFactor::with('emissionFactor')
        ->whereHas('emissionFactor', fn ($query) => $query->where('active', true))
        ->firstOrFail();

    $this->post(route('dashboard.activities.transport.store'), [
        'transport_type_id' => $factor->transport_type_id,
        'fuel_type_id' => $factor->fuel_type_id,
        'quantity' => 10,
        'measurement_unit_id' => $factor->emissionFactor->measurement_unit_id,
        'activity_date' => now()->toDateString(),
        'description' => 'Inicial',
    ])->assertSessionHas('status', 'Registro creado con exito');

    $activity = Activity::where('activity_category_id', 1)->firstOrFail();

    $this->put(route('dashboard.activities.transport.update', $activity), [
        'transport_type_id' => $factor->transport_type_id,
        'fuel_type_id' => $factor->fuel_type_id,
        'quantity' => 25,
        'measurement_unit_id' => $factor->emissionFactor->measurement_unit_id,
        'activity_date' => now()->toDateString(),
        'description' => 'Actualizado',
    ])->assertSessionHas('status', 'Registro actualizado con exito');

    expect((float) $activity->fresh()->carbonFootprintItem->emissions)
        ->toEqualWithDelta(25 * (float) $factor->emissionFactor->value, 0.001);
});

it('elimina una actividad y descuenta sus emisiones del total', function () {
    $factor = EnergyEmissionFactor::with('emissionFactor')
        ->whereHas('emissionFactor', fn ($query) => $query->where('active', true))
        ->firstOrFail();

    $this->post(route('dashboard.activities.energy.store'), [
        'energy_source_id' => $factor->energy_source_id,
        'quantity' => 10,
        'measurement_unit_id' => $factor->emissionFactor->measurement_unit_id,
        'activity_date' => now()->toDateString(),
        'description' => 'A eliminar',
    ])->assertSessionHas('status', 'Registro creado con exito');

    $activity = Activity::where('activity_category_id', 2)->firstOrFail();
    $footprintId = $activity->carbonFootprintItem->carbon_footprint_id;

    $this->delete(route('dashboard.activities.energy.destroy', $activity))
        ->assertSessionHas('status', 'Registro eliminado con exito');

    $this->assertDatabaseMissing('activities', ['id' => $activity->id]);
    expect((float) CarbonFootprint::findOrFail($footprintId)->total_emissions)->toEqualWithDelta(0, 0.001);
});
