<?php

use App\Listeners\ResetPassword;
use App\Models\User;
use App\Notifications\SendResetPasswordNotification;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Mockery\Generator\StringManipulation\Pass\Pass;

it('existe pagina forgot-password', function () {
    $response = $this->get(route('password.request'));

    $response->assertOk();
});

it('se envia enlace de recuperacion al usuario', function () {
    Notification::fake();

    $user = User::factory()->create([
        'email' => 'prueba@prueba.com'
    ]);

    $response = $this->from(route('password.request'))->post(route('password.email'), [
        'email' => 'prueba@prueba.com'
    ]);

    $response->assertRedirect(route('password.request'));
    Notification::assertSentTo(
        $user,
        SendResetPasswordNotification::class
    );
});

it('ingreso de correo no existente', function () {

    $response = $this->from(route('password.request'))->post(route('password.email'), [
        'email' => 'prueba@prueba.com'
    ]);

    $response->assertRedirect(route('password.request'));
    $response->assertSessionHasErrors([
        'email' => __('passwords.user')
    ]);
});

it('permite restablecer la contraseña con un token y correo válido', function () {
    $user = User::factory()->create([
        'email' => 'prueba@prueba.com'
    ]);

    $token = Password::broker()->createToken($user);

    $url = route('password.reset', [
        'token' => $token,
        'email' => $user->email
    ]);

    $response = $this->from($url)->post(route('password.update'), [
        'email' => $user->email,
        'token' => $token,
        'password' => "Jas123343@",
        'password_confirmation' => "Jas123343@"
    ]);

    $response->assertRedirect(route('auth.login'));
    $response->assertSessionHas([
        'status' => __('passwords.reset')
    ]);
});
it('no permite restablecer la contraseña con un token invalido', function () {
    $user = User::factory()->create([
        'email' => 'prueba@prueba.com'
    ]);

    $token = "asdadsd123423#";

    $url = route('password.reset', [
        'token' => $token,
        'email' => $user->email
    ]);

    $response = $this->from($url)->post(route('password.update'), [
        'email' => $user->email,
        'token' => $token,
        'password' => "Jas123343@",
        'password_confirmation' => "Jas123343@"
    ]);

    $response->assertRedirect(route('auth.login'));
    $response->assertSessionHasErrors([
        'email' => __('passwords.token')
    ]);
});
it('no permite restablecer la contraseña con un correo que no existe', function () {
    $user = User::factory()->create([
        'email' => 'prueba@prueba.com'
    ]);


    $token = "asdadad123143";

    $url = route('password.reset', [
        'token' => $token,
        'email' => "prueba@prueba.com"
    ]);

    $response = $this->from($url)->post(route('password.update'), [
        'email' => 'prueba2@prueba.com',
        'token' => $token,
        'password' => "Jas123343@",
        'password_confirmation' => "Jas123343@"
    ]);

    $response->assertRedirect(route('auth.login'));
    $response->assertSessionHasErrors([
        'email' => __('passwords.user')
    ]);
});
