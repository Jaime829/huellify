@extends('layouts.auth')

@section('auth-content')
    <h1 class="text-emerald-600">Cuenta creada con exito. Te enviamos un correo de confirmacion</h1>
    <p>Si no recibiste el email, puedes reenvirlo presionando el siguiente boton</p>


    <form class="pt-4" action="{{ route('verification.send') }}" method="post">
        <button class="bg-emerald-600 text-white cursor-pointer p-2 rounded-md" type="submit">Reenviar correo</button>
    </form>
@endsection
