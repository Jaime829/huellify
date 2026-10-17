<?php

use App\Models\User;

it('existe la pagina register', function () {
    $response = $this->get(route('auth.register'));

    $response->assertOk();
});

it('usuario no puede usar un correo que ya este en uso para registrarse', function () {
    $user = User::factory()->create([
        'email' => 'prueba@gmail.com',
    ]);

    $response = $this->from(route('auth.register'))->post(route('auth.register.store'), [
        'name' => 'Prueba',
        'email' => 'prueba@gmail.com',
        'password' => 'Kasda123@a',
        'password_confirmation' => 'Kasda123@a'
    ]);

    $response->assertRedirect(route('auth.register'));
    $response->assertSessionHasErrors([
        'email' => 'Ya existe un usuario registrado con ese email'
    ]);
});

it('usuario no pasa las validaciones y por consecuente no se crea la cuenta', function () {

    $response = $this->from(route('auth.register'))->post(route('auth.register.store'), [
        'name' => 'Prueba',
        'email' => 'prueba@gmail.com',
        'password' => 'As123143@',
        'password_confirmation' => 'As123143@ew'
    ]);

    $response->assertSessionHasErrors([
        'password' => 'Las contraseñas no coinciden'
    ]);

    $this->assertDatabaseMissing('users', [
        'email' => 'prueba@gmail.com'
    ]);
});

it('se creo la cuenta y envio el correo de verificacion', function() {

    $response = $this->from(route('auth.register'))->post(route('auth.register.store'), [
        'name' => "Prueba",
        'email' => 'prueba@gmail.com',
        'password' => 'As1231233@',
        'password_confirmation' => 'As1231233@',
        'terms' => 'on'
    ]);

    $response->assertRedirect(route('verification.notice'));
    $this->assertAuthenticated();
    $this->assertDatabaseHas('users', [
        'email' => 'prueba@gmail.com'
    ]);
});
