<?php

use App\Models\User;

it('cierra la sesion del usuario autenticado', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('auth.logout'))
        ->assertRedirect(route('auth.login'));

    $this->assertGuest();
});

it('un visitante no puede cerrar una sesion', function () {
    $this->post(route('auth.logout'))->assertRedirect(route('auth.login'));

    $this->assertGuest();
});
