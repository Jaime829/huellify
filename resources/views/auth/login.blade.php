@extends('layouts.auth')

@section('auth-content')
    <x-eco-message />

    <div class="bg-white shadow-md flex flex-col p-8 sm:w-[80%] sm:max-w-[85%] w-[90%] rounded-xl gap-10">
        <div>
            <h1 class="text-emerald-900 font-medium text-2xl">¡Bienvenido a Huellify!</h1>
            <p class="text-sm text-gray-500">Inicia sesión en tu cuenta para continuar</p>
        </div>


        <form class="flex flex-col gap-6" action="{{ route('auth.login.store') }}" method="post">
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
                <div class="flex flex-col gap-1">
                    <label class="text-emerald-900 text-sm font-medium" for="">Contraseña</label>
                    <div class="flex border border-gray-300 p-2 rounded-lg gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="#004e3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
                            <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                            <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                        </svg>
                        <input class="text-gray-500 flex-1 focus:outline-none" type="password" name="password"
                            placeholder="********">
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">

                    <input
                        class="accent-emerald-600 checked:bg-emerald-600 dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
                        type="checkbox" name="remember">

                    <span class="text-sm text-gray-500">Recuérdame</span>
                </div>

                <a class="text-emerald-600 text-sm" href="{{ route('password.request') }}">¿Olvidaste tu contraseña?</a>

            </div>
            <button
                class="rounded-xl cursor-pointer hover:bg-emerald-800 transition-colors duration-300 ease-in-out bg-emerald-700 text-white flex items-center justify-center py-3 gap-2"
                type="submit">Iniciar sesión <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
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
                <span class="relative z-10 bg-white px-3">¿No tienes una cuenta?</span>
            </p>

            <a class="w-full border border-b-2 border-emerald-600 text-center py-2 rounded-xl text-emerald-600"
                href="{{ route('auth.register') }}">Crear cuenta</a>
        </div>
    </div>
@endsection
