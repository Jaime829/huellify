@extends('layouts.auth')

@section('auth-content')
    <x-eco-message />
    <div
        class="bg-white shadow-md flex flex-col px-8 py-5 mb-2 sm:mb-0 sm:py-6 sm:w-[80%] sm:max-w-[85%] w-[90%] rounded-xl gap-3">
        <div>
            <h1 class="text-emerald-900 font-medium text-2xl">¡Bienvenido a Huellify!</h1>
            <p class="text-sm text-gray-500">Registra tu cuenta, para empezar a cambiar el mundo.</p>
        </div>


        <form class="flex flex-col gap-4" action="{{ route('auth.register.store') }}" method="post">
            @csrf

            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="text-emerald-900 text-sm font-medium" for="name">Nombre</label>
                    <div class="flex border border-gray-300 p-2 rounded-lg gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="#004e3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-user">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                        <input class="text-gray-500 flex-1 focus:outline-none" type="text" name="name" id="name"
                            value="{{ old('name') }}" placeholder="Nombre">
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-emerald-900 text-sm font-medium" for="email">Correo electrónico</label>
                    <div class="flex border border-gray-300 p-2 rounded-lg gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                            fill="none" stroke="#004e3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-mail">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                            <path d="M3 7l9 6l9 -6" />
                        </svg>
                        <input class="text-gray-500 flex-1 focus:outline-none" type="email" name="email" id="email"
                            value="{{ old('email') }}" placeholder="ejemplo@correo.com">
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label class="text-emerald-900 text-sm font-medium" for="password">Contraseña</label>
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
                            id="password" placeholder="********">
                        <button id="password-show" type="button" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-eye-closed preview-icon">
                                <path d="m15 18-.722-3.25" />
                                <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                                <path d="m20 15-1.726-2.05" />
                                <path d="m4 15 1.726-2.05" />
                                <path d="m9 18 .722-3.25" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label class="text-emerald-900 text-sm font-medium" for="password_confirmation">Confirmar
                        contraseña</label>
                    <div class="flex border border-gray-300 p-2 rounded-lg gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="#004e3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
                            <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                            <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                        </svg>
                        <input class="text-gray-500 flex-1 focus:outline-none" type="password"
                            name="password_confirmation" placeholder="********" id="password_confirmation">

                        <button id="password-show" type="button" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-eye-closed preview-icon">
                                <path d="m15 18-.722-3.25" />
                                <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                                <path d="m20 15-1.726-2.05" />
                                <path d="m4 15 1.726-2.05" />
                                <path d="m9 18 .722-3.25" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">

                    <input
                        class="accent-emerald-600 checked:bg-emerald-600 dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
                        type="checkbox" name="terms">

                    <span class="text-sm text-gray-500"><a href="#">Aceptar terminos y condiciones</a></span>
                </div>

            </div>
            <button
                class="rounded-xl cursor-pointer hover:bg-emerald-800 transition-colors duration-300 ease-in-out bg-emerald-700 text-white flex items-center justify-center py-3 gap-2"
                type="submit">Registrarme <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
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
                <span class="relative z-10 bg-white px-3">¿Ya tienes una cuenta?</span>
            </p>

            <a class="w-full border border-b-2 border-emerald-600 text-center py-2 rounded-xl text-emerald-600"
                href="{{ route('auth.login') }}">Iniciar sesión</a>
        </div>
    </div>
@endsection
