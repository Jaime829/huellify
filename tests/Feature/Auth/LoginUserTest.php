<?php

use App\Models\User;

it('Existe la pagina login', function () {
    $response = $this->get(route('auth.login'));

    $response->assertStatus(200);
});

it('un usuario que no existe no puede iniciar sesion', function () {
    $response = $this->from(route('auth.login'))->post(route('auth.login.store'), [
        'email' => 'ejemplo@gmail.com',
        'password' => 'Jas123qsd@'
    ]);

    $response->assertRedirect(route('auth.login'));
    $response->assertSessionHasErrors([
        'email' => 'No encontramos una cuenta con ese email'
    ]);
    $this->assertGuest();
});


it('usuario intenta iniciar sesion con credenciales incorrectas', function () {
    $user = User::factory()->create([
        'email' => 'prueba@gmail.com',
        'password' => bcrypt('Jasd123334@')
    ]);

    $response = $this->from(route('auth.login'))->post(route('auth.login.store', [
        'email' => 'prueba@gmail.com',
        'password' => 'erJasd123334@'
    ]));

    $response->assertRedirect(route('auth.login'));
    $response->assertSessionHasErrors([
        'password' => 'Credenciales incorrectas'
    ]);

    $this->assertGuest();
});

it('evitar que el usuario no verificado acceda al dashboard', function () {
    $user = User::factory()->unverified()->create([
        'email' => 'prueba@gmail.com',
        'password' => bcrypt('Asdasd123@')
    ]);

    $response = $this->post(route('auth.login.store'), [
        'email' => 'prueba@gmail.com',
        'password' => 'Asdasd123@'
    ]);

    $response->assertRedirect(route('dashboard.index'));
    $this->assertAuthenticated();

    $dashboardResponse = $this->get(route('dashboard.index'));
    $dashboardResponse->assertRedirect(route('verification.notice'));
});

it('usuario verificado autenticado y verificado puede ingresar al dashboard', function () {
    $user = User::factory()->create([
        'email' => 'prueba@gmail.com',
        'password' => bcrypt('password1234'),
        'email_verified_at' => now()
    ]);

    $response = $this->actingAs($user)->get(route('dashboard.index'), [
        'email' => 'prueba@gmail.com',
        'password' => 'password1234'
    ]);
    $response->assertOk();
});
it('usuario autenticado y no verificado no pueda ingresar al dashboard', function () {
    $user = User::factory()->create([
        'email' => 'prueba@gmail.com',
        'password' => bcrypt('password1234'),
        'email_verified_at' => null
    ]);

    $response = $this->actingAs($user)->get(route('dashboard.index'), [
        'email' => 'prueba@gmail.com',
        'password' => 'password1234'
    ]);

    $response->assertRedirect(route('verification.notice'));
});

it('el usuario puede iniciar sesion correctamente', function () {
    $user = User::factory()->create([
        'email' => 'prueba@prueba.com',
        'password' => bcrypt('prueba123456'),
        'email_verified_at' => now()
    ]);

    $response = $this->post(route('auth.login.store'), [
        'email' => 'prueba@prueba.com',
        'password' => 'prueba123456'
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard.index'));
});
