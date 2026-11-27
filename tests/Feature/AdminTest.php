<?php

use App\Models\EmissionFactor;
use App\Models\FuelType;
use App\Models\MeasurementUnit;
use App\Models\User;
use Illuminate\Support\Facades\DB;

beforeEach(function () {
    $this->seed();
    $this->admin = User::factory()->create(['rol' => 'admin']);
    $this->actingAs($this->admin);
});

it('redirige a los visitantes al login', function () {
    auth()->logout();
    $this->app['auth']->forgetGuards();

    $this->get(route('admin.index'))->assertRedirect(route('auth.login'));
});

it('impide el acceso a un usuario que no es administrador', function () {
    $user = User::factory()->create(['rol' => 'user']);

    $this->actingAs($user)
        ->get(route('admin.index'))
        ->assertRedirect(route('landing'))
        ->assertSessionHas('error', 'Acceso denegado.');
});

it('muestra el panel de administracion y sus listados', function () {
    $factor = EmissionFactor::firstOrFail();

    $this->get(route('admin.index'))->assertOk();
    $this->get(route('admin.recommendations.metrics'))->assertOk();
    $this->get(route('admin.emissions.index'))->assertOk();
    $this->get(route('admin.emissions.show', $factor))->assertOk();
});

it('valida la categoria al crear un factor de emision', function () {
    $this->post(route('admin.emissions.store'), ['category_id' => 99999])
        ->assertSessionHasErrors('category_id');
});

it('crea y actualiza un factor de emision de transporte', function () {
    $transportTypeId = DB::table('transport_types')->insertGetId([
        'name' => 'Transporte de prueba '.uniqid(),
        'created_at' => now(),
    ]);
    $fuelTypeId = FuelType::firstOrFail()->id;
    $measurementUnitId = MeasurementUnit::firstOrFail()->id;

    $this->post(route('admin.emissions.store'), [
        'category_id' => 1,
        'name' => 'Factor de prueba',
        'measurement_unit_id' => $measurementUnitId,
        'value' => '0.123456',
        'source' => 'Fuente de prueba',
        'valid_from' => '2024-01-01',
        'active' => true,
        'transport_type_id' => $transportTypeId,
        'fuel_type_id' => $fuelTypeId,
    ])->assertSessionHas('status', 'Factor de emision creado con exito.');

    $factor = EmissionFactor::where('name', 'Factor de prueba')->firstOrFail();
    $this->assertDatabaseHas('transport_emission_factors', [
        'emission_factor_id' => $factor->id,
        'transport_type_id' => $transportTypeId,
        'fuel_type_id' => $fuelTypeId,
    ]);

    $this->put(route('admin.emissions.update', $factor), [
        'category_id' => 1,
        'name' => 'Factor actualizado',
        'measurement_unit_id' => $measurementUnitId,
        'value' => '0.200000',
        'source' => 'Fuente actualizada',
        'valid_from' => '2024-01-01',
        'active' => true,
        'transport_type_id' => $transportTypeId,
        'fuel_type_id' => $fuelTypeId,
    ])->assertSessionHas('status', 'Factor de emision actualizado con exito.');

    expect((float) $factor->fresh()->value)->toEqualWithDelta(0.2, 0.000001);
});
