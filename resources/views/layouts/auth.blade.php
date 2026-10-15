@extends('layouts.base')

@section('content')
    <main class="flex flex-col w-screen h-screen sm:flex-row relative">
        <section class="h-[50%] w-screen sm:w-[50%] relative sm:h-full">
            <img class="size-full absolute z-1 object-cover object-center" src="{{ asset('images/bg-auth.jpg') }}"
                alt="Fondo autenticacion">


            <div
                class="flex flex-col z-10 border-amber-600 relative h-full px-25 py-6 sm:gap-5 gap-2 items-center sm:items-start">
                <div class="sm:w-50 sm:h-20 w-60 h-30">
                    <img class="w-full h-full" src="{{ asset('images/logo.png') }}" alt="Logo Huellify">
                </div>
                <div class="flex flex-col gap-6">

                    <h2 class="hidden sm:block sm:text-emerald-900 sm:font-medium sm:text-2xl sm:m-0">Tu huella de carbono,
                        <br> en
                        tus manos
                    </h2>
                    <p class="hidden sm:block sm:text-gray-500 sm:text-2xs">Conoce el impacto de tus hábitos, descubre<br>
                        cómo
                        reducirlo y
                        construye un futuro más<br> sostenible.</p>

                    <ul class="hidden sm:flex sm:flex-col sm:gap-2">
                        <li class="flex gap-2">
                            <div
                                class="w-10 h-10 rounded-full bg-bg-icons flex justify-center items-center text-emerald-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-calculator">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M4 5a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -14" />
                                    <path
                                        d="M8 8a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1l0 -1" />
                                    <path d="M8 14l0 .01" />
                                    <path d="M12 14l0 .01" />
                                    <path d="M16 14l0 .01" />
                                    <path d="M8 17l0 .01" />
                                    <path d="M12 17l0 .01" />
                                    <path d="M16 17l0 .01" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-emerald-900 text-3xs font-medium">Calcula</p>
                                <p class="text-gray-700 text-xs">Conoce tus emisiones por categoria.</p>
                            </div>
                        </li>
                        <li class="flex gap-2">
                            <div
                                class="w-10 h-10 rounded-full bg-bg-icons flex justify-center items-center text-emerald-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-chart-bar">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6" />
                                    <path
                                        d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10" />
                                    <path
                                        d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14" />
                                    <path d="M4 20h14" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-emerald-900 text-3xs font-medium">Comprende</p>
                                <p class="text-gray-700 text-xs">Visualiza tu impacto con gráficos claros.</p>
                            </div>
                        </li>
                        <li class="flex gap-2">
                            <div
                                class="w-10 h-10 rounded-full bg-bg-icons flex justify-center items-center text-emerald-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-seedling">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
                                    <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
                                    <path d="M12 20l0 -10" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-emerald-900 text-3xs font-medium">Reduce</p>
                                <p class="text-gray-700 text-xs">Recibe recomendaciones personalizadas <br> para un cambio
                                    real.</p>
                            </div>
                        </li>
                    </ul>


                </div>

            </div>
            <div class="hidden sm:absolute sm:bottom-14 sm:left-8 sm:z-5 sm:font-comico">
                <p class="text-white -rotate-10">Un pequeño cambio,<br> hace una gran diferencia</p>
                <img class="mt-1 w-45 -rotate-6" src="{{ asset('images/assets/asset_1.svg') }}" alt="Asset 1">
            </div>

        </section>

        @if ($errors->any())
            <div class="fixed top-20 right-8 z-1000">
                <ul class="flex flex-col gap-2">
                    @foreach ($errors->all() as $error)
                        <li
                            class="flex items-center animate-wobble text-white gap-1 h-auto text-xs max-w-46 bg-red-500/70 p-2 rounded-xl">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                    <path d="M12 8v4" />
                                    <path d="M12 16h.01" />
                                </svg>
                            </span>
                            {{ $error }}
                        </li>
                    @endforeach
                </ul>
            </div>
        @endif
        @if (session('status'))
            <div class="fixed top-20 right-8 z-1000">
                <ul class="flex flex-col gap-2">
                    <li
                        class="flex items-center animate-wobble text-white gap-1 h-auto text-xs max-w-46 bg-green-500/70 p-2 rounded-xl">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                <path d="M12 8v4" />
                                <path d="M12 16h.01" />
                            </svg>
                        </span>
                        {{ session('status') }}
                    </li>
                </ul>
            </div>
        @endif
        <section
            class="bg-gray-100 w-screen h-[50%] sm:w-[50%] sm:h-full flex sm:flex-col flex-col-reverse items-center sm:justify-center  sm:pt-2 z-100">
            @yield('auth-content')
        </section>
    </main>
@endsection
