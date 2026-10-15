@extends('layouts.auth')

@section('auth-content')


    <div class="bg-white shadow-md flex flex-col p-8 sm:w-[80%] sm:max-w-[85%] w-[90%] rounded-xl gap-10">
        <div class="text-center">
            <h1 class="text-emerald-900 font-medium text-2xl">Recupera tu contraseña</h1>
            <p class="text-sm text-gray-500">Ingresa tu correo electrónico y te enviaremos un enlace para que puedas
                reestablecerla.</p>
        </div>


        <form class="flex flex-col gap-6" action="{{ route('password.email') }}" method="post">
            @csrf

            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-1">
                    <label class="text-emerald-900 text-sm font-medium" for="">Correo electrónico</label>
                    <div class="flex border border-gray-300 p-2 rounded-lg gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                            fill="none" stroke="#004e3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-mail">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                            <path d="M3 7l9 6l9 -6" />
                        </svg>
                        <input class="text-gray-500 flex-1 focus:outline-none" type="email" name="email"
                            value="{{ old('email') }}" placeholder="ejemplo@correo.com">
                    </div>
                </div>
                <button
                    class="rounded-xl cursor-pointer hover:bg-emerald-800 transition-colors duration-300 ease-in-out bg-emerald-700 text-white flex items-center justify-center py-3 gap-2"
                    type="submit">Enviar enlace <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l14 0" />
                        <path d="M15 16l4 -4" />
                        <path d="M15 8l4 4" />
                    </svg></button>

        </form>
        <div class="flex flex-col gap-2">
            <p
                class="relative text-center text-sm text-gray-500
          before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:border-t before:border-gray-300
          after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:border-t after:border-gray-300">
                <span class="relative z-10 bg-white px-3">O</span>
            </p>

            <a class="flex items-center gap-1 justify-center w-full text-center rounded-xl text-emerald-600"
                href="{{ route('auth.login') }}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l4 4" />
                    <path d="M5 12l4 -4" />
                </svg> Volver al inicio de sesión</a>
        </div>
    </div>
@endsection
