@extends('layouts.base')

@section('content')
    <header class="flex items-center justify-between px-8 py-2">
        <div class="h-fit w-32">
            <img src="{{ asset('images/logo.png') }}" alt="">
        </div>
        <nav class="flex items-center gap-4">
            <a class="text-[14px] text-gray-800 pb-1 border-b-2 border-transparent transition-colors hover:border-emerald-800 hover:text-emerald-800"
                href="/">Inicio</a>
            <a class="text-[14px] text-gray-800 pb-1 border-b-2 border-transparent transition-colors hover:border-emerald-800 hover:text-emerald-800"
                href="#como-funciona">Cómo funciona</a>
            <a class="text-[14px] text-gray-800 pb-1 border-b-2 border-transparent transition-colors hover:border-emerald-800 hover:text-emerald-800"
                href="#beneficios">Beneficios</a>
            <a class="text-[14px] text-gray-800 pb-1 border-b-2 border-transparent transition-colors hover:border-emerald-800 hover:text-emerald-800"
                href="#about">Sobre Huellify</a>
        </nav>

        <div class="flex items-center gap-4">
            @auth
                <a class="bg-emerald-800 text-white text-[14px] h-fit w-fit p-2  rounded-full flex justify-center items-center gap-1 transition-colors hover:bg-emerald-900"
                    href="{{ route('auth.login') }}"><span>Ir al dashboard</span> <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l14 0" />
                        <path d="M15 16l4 -4" />
                        <path d="M15 8l4 4" />
                    </svg></a>
            @else
                <a class="text-emerald-700 text-[14px] font-medium hover:text-emerald-800"
                    href="{{ route('auth.login') }}">Iniciar sesión</a>
                <a class="bg-emerald-800 text-white h-fit w-fit text-[14px] p-2  rounded-full flex justify-center items-center gap-1 transition-colors hover:bg-emerald-900"
                    href="{{ route('auth.login') }}"><span>Comenzar gratis</span> <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l14 0" />
                        <path d="M15 16l4 -4" />
                        <path d="M15 8l4 4" />
                    </svg></a>
            @endauth

        </div>
    </header>
    <main class="flex flex-col gap-4">
        <section class="flex items-center bg-green-500/5 px-8 py-4 w-full h-fit lg:h-96">
            <div class="flex flex-col gap-4 max-w-[40%]">
                <span
                    class="font-medium flex items-center gap-1 w-fit h-fit px-2 py-1 wrap-break-word rounded-full uppercase text-[12px] bg-green-500/15 text-green-800"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-leaf">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M3.055 14.328l-.018 -.168l-.004 -.043a11 11 0 0 1 -.047 -1.12c.018 -6.29 4.29 -9.997 13 -9.997h4.014a1 1 0 0 1 1 1l-.002 2.057c-.498 8.701 -4.74 12.943 -11.998 12.943h-2.631a16 16 0 0 0 -.375 2.11a1 1 0 1 1 -1.988 -.22q .174 -1.568 .58 -2.947l-.118 -.146l-.208 -.28l-.157 -.229l-.182 -.293l-.098 -.171l-.065 -.122a6 6 0 0 1 -.397 -.941l-.072 -.237l-.085 -.327l-.057 -.268l-.043 -.242zm8.539 -4.242c-2.845 1.265 -4.854 3.13 -6.108 5.583q .098 .2 .218 .4l.185 .281l.07 .097q .12 .164 .258 .329l.197 .224h.649c1.037 -2.271 2.777 -3.946 5.343 -5.086a1 1 0 0 0 -.812 -1.828" />
                    </svg> Conoce tu
                    impacto.
                    transforma tus hábitos.</span>
                <div class="flex flex-col gap-4">
                    <h1 class="font-medium text-5xl">Comprende tu huella. <br />Empiza a cambiarla.</h1>
                    <p class="">Descubre cómo tus actividades diarias impactan el planeta.
                        Calcula tus emisiones de carbono, comprende tus resultados y encuentra oportunidades para adoptar
                        hábitos más sostenibles.
                    </p>
                </div>
                <div class="flex flex-col gap-2 md:flex-row items-center w-fit">
                    <a class="bg-emerald-800 text-white h-fit w-fit text-[14px] p-2  rounded-full flex justify-center items-center gap-1 transition-colors hover:bg-emerald-900"
                        href="{{ route('auth.login') }}"><span>Calcular mu huella</span> <svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M15 16l4 -4" />
                            <path d="M15 8l4 4" />
                        </svg></a>
                    <a class="bg-white text-emerald-900 h-fit w-fit text-[14px] p-2 border border-emerald-800  rounded-full flex justify-center items-center gap-1 transition-colors hover:bg-gray-100"
                        href="{{ route('auth.login') }}"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="currentColor"
                            class="icon icon-tabler icons-tabler-filled icon-tabler-circle-caret-right">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5.293 4.953a1 1 0 0 0 -1.707 .707v6c0 .217 .07 .433 .21 .613l.083 .094a1 1 0 0 0 1.414 0l3 -3a1 1 0 0 0 0 -1.414z" />
                        </svg> <span>Conocer Huellify</span></a>
                    <a href=""></a>
                </div>
            </div>
            <div>

            </div>
        </section>
        <section class="flex flex-col gap-4 px-8 pb-4">
            <div class="flex flex-col items-center">
                <h2 class="text-2xl font-semibold">Todo comienza por entender tu impacto</h2>
                <p class="text-gray-700">Cada decisión cotidiana genera un impacto. Conocerlo es el primer paso para tomar
                    decisiones más
                    conscientes.</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="flex gap-2  p-4 border bg-white rounded-xl shadow">
                    <div
                        class="bg-green-500/20 text-emerald-800 flex items-center justify-center rounded-full w-14 h-14 aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-leaf">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M3.055 14.328l-.018 -.168l-.004 -.043a11 11 0 0 1 -.047 -1.12c.018 -6.29 4.29 -9.997 13 -9.997h4.014a1 1 0 0 1 1 1l-.002 2.057c-.498 8.701 -4.74 12.943 -11.998 12.943h-2.631a16 16 0 0 0 -.375 2.11a1 1 0 1 1 -1.988 -.22q .174 -1.568 .58 -2.947l-.118 -.146l-.208 -.28l-.157 -.229l-.182 -.293l-.098 -.171l-.065 -.122a6 6 0 0 1 -.397 -.941l-.072 -.237l-.085 -.327l-.057 -.268l-.043 -.242zm8.539 -4.242c-2.845 1.265 -4.854 3.13 -6.108 5.583q .098 .2 .218 .4l.185 .281l.07 .097q .12 .164 .258 .329l.197 .224h.649c1.037 -2.271 2.777 -3.946 5.343 -5.086a1 1 0 0 0 -.812 -1.828" />
                        </svg>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="font-bold">Comprende tus emisiones</p>
                        <p class="text-gray-700">Identifica cuánto CO<sub>2</sub>e generan tus actividaes cotidianas y
                            descubre qué categorías
                            contribuyen más a tu huella.</p>
                    </div>
                </div>
                <div class="flex gap-2  p-4 border bg-white rounded-xl shadow">
                    <div
                        class="bg-green-500/20 text-emerald-800 flex items-center justify-center rounded-full w-14 h-14 aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-chart-area-line">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M15.22 9.375a1 1 0 0 1 1.393 -.165l.094 .083l4 4a1 1 0 0 1 .284 .576l.009 .131v5a1 1 0 0 1 -.883 .993l-.117 .007h-16.022l-.11 -.009l-.11 -.02l-.107 -.034l-.105 -.046l-.1 -.059l-.094 -.07l-.06 -.055l-.072 -.082l-.064 -.089l-.054 -.096l-.016 -.035l-.04 -.103l-.027 -.106l-.015 -.108l-.004 -.11l.009 -.11l.019 -.105c.01 -.04 .022 -.077 .035 -.112l.046 -.105l.059 -.1l4 -6a1 1 0 0 1 1.165 -.39l.114 .05l3.277 1.638l3.495 -4.369z" />
                            <path
                                d="M15.232 3.36a1 1 0 0 1 1.382 -.15l.093 .083l4 4a1 1 0 0 1 -1.32 1.497l-.094 -.083l-3.226 -3.225l-4.299 5.158a1 1 0 0 1 -1.1 .303l-.115 -.049l-3.254 -1.626l-2.499 3.332a1 1 0 0 1 -1.295 .269l-.105 -.069a1 1 0 0 1 -.269 -1.295l.069 -.105l3 -4a1 1 0 0 1 1.137 -.341l.11 .047l3.291 1.645l4.494 -5.391z" />
                        </svg>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="font-bold">Visualiza tu progreso</p>
                        <p class="text-gray-700">Consulta tus resultados históricos y compra cómo evoluciona tu huella de
                            carbono a lo largo del tiempo.</p>
                    </div>
                </div>
                <div class="flex gap-2  p-4 border bg-white rounded-xl shadow">
                    <div
                        class="bg-green-500/20 text-emerald-800 flex items-center justify-center rounded-full w-14 h-14 aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-bulb">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                            <path
                                d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                            <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                            <path
                                d="M4.893 4.893a1 1 0 0 1 1.32 -.083l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 0 -1.414z" />
                            <path
                                d="M17.693 4.893a1 1 0 0 1 1.497 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7z" />
                            <path d="M14 18a1 1 0 0 1 1 1a3 3 0 0 1 -6 0a1 1 0 0 1 .883 -.993l.117 -.007h4z" />
                            <path
                                d="M12 6a6 6 0 0 1 3.6 10.8a1 1 0 0 1 -.471 .192l-.129 .008h-6a1 1 0 0 1 -.6 -.2a6 6 0 0 1 3.6 -10.8z" />
                        </svg>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="font-bold">Descubre oportunidades de cambio</p>
                        <p class="text-gray-700">Encuentra recomendaciones de sostenibilidad y comienza a incorporar
                            hábitos más responsables.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="flex flex-col gap-4 px-8 pb-4">
            <div class="flex flex-col items-center">
                <h2 class="text-2xl font-semibold">Conocer tu impacto es más sencillo de lo que imaginas</h2>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="flex flex-col gap-1 p-4 border bg-white rounded-xl shadow">
                    <div
                        class="bg-green-500/20 text-emerald-800 flex items-center justify-center rounded-full w-8 h-8 aspect-square">
                        <span>1</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="font-bold">Registra tus actividades</p>
                        <p class="text-gray-700">Ingresa información sobre tus desplazamientos y consumo de energía.</p>
                    </div>
                </div>


                <div class="flex flex-col gap-1 p-4 border bg-white rounded-xl shadow">
                    <div
                        class="bg-green-500/20 text-emerald-800 flex items-center justify-center rounded-full w-8 h-8 aspect-square">
                        <span>2</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="font-bold">Calcula tu huella</p>
                        <p class="text-gray-700">Huellify estima tus emisiones de gases de efecto invernadero y presenta
                            tus resultados en kg CO<sub>2</sub>e.</p>
                    </div>
                </div>


                <div class="flex flex-col gap-1 p-4 border bg-white rounded-xl shadow">
                    <div
                        class="bg-green-500/20 text-emerald-800 flex items-center justify-center rounded-full w-8 h-8 aspect-square">
                        <span>3</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="font-bold">Comprende y mejora</p>
                        <p class="text-gray-700">Consulta tu historia, interpreta tus resultados mediante equivalencias
                            ambientales y descubre recomendaciones para reducir tu impacto.</p>
                    </div>
                </div>
            </div>

        </section>
        <section class="flex flex-col gap-4 px-8 pb-4">
            <h2 class="text-2xl font-semibold">Conoce las funcionalidades</h2>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
                <div class="flex flex-col col-span-2 row-span-2 gap-2 border rounded-xl bg-white p-4">
                    <div>
                        <p class="font-bold">Cálculo de huella de carbono</p>
                        <p class="text-gray-700">Obtén un análisis detallado de tus emisiones por categoria.</p>
                    </div>
                    <div>
                        <div class="p-2 border rounded-xl w-1/2">
                            <img src="{{ asset('images/assets/captura-torta-chart.webp') }}" alt="">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2 border rounded-xl bg-white p-4">
                    <div>
                        <p class="font-bold">Seguimiento histórico</p>
                        <p class="text-gray-700">Consulta la evolución de tu huella y compara periodos.</p>
                    </div>
                    <div>
                        <div class="p-2 border rounded-xl">
                            <img src="{{ asset('images/assets/captura-grafico-emisiones.webp') }}" alt="">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2 border rounded-xl bg-white p-4">
                    <div>
                        <p class="font-bold">Equivalencias ambientales</p>
                        <p class="text-gray-700">Descubre el impacto de tus emisiones en referencia del mundo real.</p>
                    </div>
                    <div class="flex items-end justify-center">
                        <div class="w-14 h-14 aspect-square">
                            <img src="{{ asset('images/equivalenceFactorsIcons/tree-icon.webp') }}" alt="">
                        </div>
                        <p class="font-bold">2 árbol-año</p>
                    </div>
                </div>
                <div class="flex flex-col gap-2 border rounded-xl bg-white p-4">
                    <div>
                        <p class="font-bold">Recomendaciones sostenibles</p>
                        <p class="text-gray-700">Recibe sugerencias personalizadas para reducir tu impacto.</p>
                    </div>
                </div>
                <div class="flex items-end gap-2 border rounded-xl bg-white p-4">
                    <div>
                        <p class="font-bold">Seguimiento de hábitos</p>
                        <p class="text-gray-700">Adopta hábitos sostenibles y lleva un registro de tu progreso.</p>
                    </div>
                    <div class="w-fit h-fit p-2 rounded-xl bg-green-500/10 text-emerald-700">
                        <p class="font-bold text-[20px]">5/7</p>
                    </div>
                </div>
            </div>
        </section>
        <section>

        </section>

    </main>
@endsection
