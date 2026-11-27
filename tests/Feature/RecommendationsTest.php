<?php

use App\Models\Recommendation;
use App\Models\User;

beforeEach(function () {
    $this->seed();
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

it('muestra el listado de recomendaciones', function () {
    $this->get(route('dashboard.recommendations'))->assertOk();
});

it('adopta una recomendacion y cambia su estado', function () {
    $recommendation = Recommendation::create([
        'title' => 'Recomendacion de prueba',
        'description' => 'Descripcion de prueba',
    ]);

    $route = route('dashboard.recommendations.updateStatus', $recommendation);

    $this->patch($route)->assertSessionHas('status', 'Recomendacion adoptada con exito.');
    $this->assertDatabaseHas('user_recommendations', [
        'user_id' => $this->user->id,
        'recommendation_id' => $recommendation->id,
        'status' => 'adopted',
    ]);

    $this->patch($route)->assertSessionHas('status', 'Recomendacion marcada como pendiente correctamente');
    $this->assertDatabaseHas('user_recommendations', [
        'user_id' => $this->user->id,
        'recommendation_id' => $recommendation->id,
        'status' => 'pending',
    ]);

    $this->patch($route)->assertSessionHas('status', 'Recomendacion readoptada correctamente');
    $this->assertDatabaseHas('user_recommendations', [
        'user_id' => $this->user->id,
        'recommendation_id' => $recommendation->id,
        'status' => 'adopted',
    ]);
});

it('no duplica la relacion usuario recomendacion', function () {
    $recommendation = Recommendation::create([
        'title' => 'Recomendacion unica',
        'description' => 'Descripcion',
    ]);

    $route = route('dashboard.recommendations.updateStatus', $recommendation);
    $this->patch($route);
    $this->patch($route);

    expect($this->user->recommendations()->where('recommendations.id', $recommendation->id)->count())->toBe(1);
});
