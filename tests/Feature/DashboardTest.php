<?php

use App\Models\User;

it('redirige a los visitantes al login', function () {
    $this->get(route('dashboard.index'))->assertRedirect(route('auth.login'));
});

it('un usuario verificado puede ver el dashboard y su perfil', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get(route('dashboard.index'))->assertOk();
    $this->actingAs($user)->get(route('dashboard.profile'))->assertOk();
});

it('un usuario no verificado no puede ver el dashboard', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->get(route('dashboard.index'))
        ->assertRedirect(route('verification.notice'));
});

it('actualiza el perfil propio', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->put(route('user.update', $user), [
        'name' => 'Nombre actualizado',
        'description' => 'Mi descripcion',
    ])->assertSessionHas('status', 'Perfil actualizado con exito');

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Nombre actualizado',
        'description' => 'Mi descripcion',
    ]);
});

it('valida los datos al actualizar el perfil', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->put(route('user.update', $user), ['name' => str_repeat('a', 81)])
        ->assertSessionHasErrors('name');
});

it('un usuario no puede actualizar el perfil de otro', function () {
    $user = User::factory()->create();
    $otro = User::factory()->create();

    $this->actingAs($user)
        ->put(route('user.update', $otro), ['name' => 'Intruso'])
        ->assertForbidden();
});

it('rechaza una contraseña incorrecta al eliminar la cuenta', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->delete(route('user.destroy', $user), ['password' => 'contraseña-incorrecta'])
        ->assertSessionHasErrors('password');

    $this->assertDatabaseHas('users', ['id' => $user->id]);
});

it('el usuario puede eliminar su cuenta con su contraseña', function () {
    $user = User::factory()->create(['password' => bcrypt('password1234')]);

    $this->actingAs($user)
        ->delete(route('user.destroy', $user), ['password' => 'password1234']);

    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});
