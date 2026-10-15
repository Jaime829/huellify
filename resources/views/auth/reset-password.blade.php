@extends('layouts.auth')

@section('auth-content')
    <div class="bg-white shadow-md flex flex-col p-8 sm:w-[80%] sm:max-w-[85%] w-[90%] rounded-xl gap-10">
        <div>
            <h1 class="text-emerald-900 font-medium text-2xl">Restablecer contraseña</h1>
            <p class="text-sm text-gray-500">Restablece tu contraseña olvidada, para seguir a cambiar el mundo.</p>
        </div>




            <form class="flex flex-col gap-6" action="{{ route('password.update') }}" method="post">
                @csrf
                <input type="hidden" name="token" value="{{ $token }}">

                <input type="hidden" name="email" value="{{ request()->email }}">

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
                        <input class="text-gray-500 flex-1 focus:outline-none" type="password" name="password_confirmation"
                            placeholder="********" id="password_confirmation">
                    </div>
                </div>

                <button type="submit"
                    class="py-2 cursor-pointer text-white font-bold rounded-md bg-emerald-700">Restablecer
                    contraseña</button>

            </form>

        <div class="flex flex-col gap-2">
            <p
                class="relative text-center text-sm text-gray-500
          before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:border-t before:border-gray-300
          after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:border-t after:border-gray-300">
                <span class="relative z-10 bg-white px-3">Regresar a iniciar sesion</span>
            </p>

            <a class="w-full border border-b-2 border-emerald-600 text-center py-2 rounded-xl text-emerald-600"
                href="{{ route('auth.login') }}">Iniciar sesión</a>
        </div>
    </div>
@endsection
