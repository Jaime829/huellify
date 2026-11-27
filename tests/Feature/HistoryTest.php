<?php

use App\Models\Period;
use App\Models\User;

it('redirige a los visitantes al login', function () {
    $this->get(route('dashboard.history'))->assertRedirect(route('auth.login'));
});

it('muestra el historial del usuario autenticado', function () {
    $user = User::factory()->create();
    $period = Period::create([
        'user_id' => $user->id,
        'name' => 'Periodo de prueba',
        'start_date' => now()->startOfMonth()->toDateString(),
        'end_date' => now()->endOfMonth()->toDateString(),
    ]);
    $period->carbonFootprint()->create([
        'total_emissions' => 12.5,
        'calculated_at' => now(),
    ]);

    $this->actingAs($user)
        ->get(route('dashboard.history'))
        ->assertOk()
        ->assertSee('Periodo de prueba');
});

it('permite al dueño consultar el detalle de un periodo', function () {
    $user = User::factory()->create();
    $period = Period::create([
        'user_id' => $user->id,
        'name' => 'Mi periodo',
        'start_date' => now()->startOfMonth()->toDateString(),
        'end_date' => now()->endOfMonth()->toDateString(),
    ]);
    $period->carbonFootprint()->create(['total_emissions' => 8, 'calculated_at' => now()]);

    $this->actingAs($user)->get(route('dashboard.history.show', $period))->assertOk();
});

it('impide consultar el periodo de otro usuario', function () {
    $user = User::factory()->create();
    $otro = User::factory()->create();
    $period = Period::create([
        'user_id' => $otro->id,
        'name' => 'Periodo ajeno',
        'start_date' => now()->startOfMonth()->toDateString(),
        'end_date' => now()->endOfMonth()->toDateString(),
    ]);
    $period->carbonFootprint()->create(['total_emissions' => 8, 'calculated_at' => now()]);

    $this->actingAs($user)
        ->get(route('dashboard.history.show', $period))
        ->assertForbidden();
});
