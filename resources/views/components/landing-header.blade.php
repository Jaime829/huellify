<header class="w-full min-h-dvh h-auto md:h-160 md:min-h-0 relative px-4 sm:px-6 py-2 md:py-0" id="inicio">
    <img width="400" height="400" class="object-cover w-full h-full absolute -z-2 inset-0"
        src="{{ asset('images/bg-landing.webp') }}" alt="Header Background Image" loading="lazy">

    <div class="absolute inset-0 pointer-events-none -z-1">
        <div class="absolute inset-y-0 left-0 w-[60%] bg-linear-to-r from-white to-transparent"></div>

    </div>
    <nav class="flex flex-wrap justify-between items-center gap-y-2">
        <div class="w-full sm:w-auto lg:w-[50%] flex items-center gap-4 lg:gap-12">
            <div class="w-32 h-20 sm:w-40 sm:h-24 flex items-center">
                <img src="{{ asset('images/logo.png') }}" alt="">
            </div>
            <div class="flex flex-wrap gap-2 md:gap-4">
                <a class="text-[14px] text-gray-600 font-medium border-b-2 border-transparent pb-2 transition-all ease-in delay-75 hover:border-green-600 hover:scale-105"
                    href="#inicio">Inicio</a>
                <a class="text-[14px] text-gray-600 font-medium border-b-2 border-transparent pb-2 transition-all ease-in delay-75 hover:border-green-600 hover:scale-105"
                    href="">Características</a>
                <a class="text-[14px] text-gray-600 font-medium border-b-2 border-transparent pb-2 transition-all ease-in delay-75 hover:border-green-600 hover:scale-105"
                    href="">Cómo funciona</a>
                <a class="text-[14px] text-gray-600 font-medium border-b-2 border-transparent pb-2 transition-all ease-in delay-75 hover:border-green-600 hover:scale-105"
                    href="">Sobre nosotros</a>
            </div>

        </div>
        <div class="flex items-center gap-2 sm:gap-4 w-auto justify-end lg:w-[10%]">
            @auth
                <a class="text-[14px] px-3 sm:px-4 py-2 min-h-11 sm:min-h-0 inline-flex items-center text-white bg-emerald-600 rounded-md transition-colors ease-in-out hover:bg-emerald-700 whitespace-nowrap"
                    href="{{ route('dashboard.index') }}">Dashboard</a>
            @else
                <a class="text-[14px] px-3 sm:px-4 py-2 min-h-11 sm:min-h-0 inline-flex items-center border border-green-600 bg-white text-green-600 rounded-md whitespace-nowrap"
                    href="{{ route('auth.login') }}">Iniciar
                    sesión</a>
                <a class="text-[14px] px-3 sm:px-4 py-2 min-h-11 sm:min-h-0 inline-flex items-center bg-green-600 text-white rounded-md transition-colors ease-in-out hover:bg-green-700 whitespace-nowrap"
                    href="{{ route('auth.register') }}">Crear
                    cuenta</a>
            @endauth

        </div>


    </nav>
    <div class="flex pt-4 h-full">
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <p
                    class="flex items-center gap-1 font-medium max-w-[34ch] w-fit bg-emerald-50 text-green-700 p-2 rounded-2xl text-[12px]">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-leaf">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M3.055 14.328l-.018 -.168l-.004 -.043a11 11 0 0 1 -.047 -1.12c.018 -6.29 4.29 -9.997 13 -9.997h4.014a1 1 0 0 1 1 1l-.002 2.057c-.498 8.701 -4.74 12.943 -11.998 12.943h-2.631a16 16 0 0 0 -.375 2.11a1 1 0 1 1 -1.988 -.22q .174 -1.568 .58 -2.947l-.118 -.146l-.208 -.28l-.157 -.229l-.182 -.293l-.098 -.171l-.065 -.122a6 6 0 0 1 -.397 -.941l-.072 -.237l-.085 -.327l-.057 -.268l-.043 -.242zm8.539 -4.242c-2.845 1.265 -4.854 3.13 -6.108 5.583q .098 .2 .218 .4l.185 .281l.07 .097q .12 .164 .258 .329l.197 .224h.649c1.037 -2.271 2.777 -3.946 5.343 -5.086a1 1 0 0 0 -.812 -1.828" />
                        </svg>
                    </span> Un planeta más verde empieza contigo
                </p>

                <h1 class="text-4xl sm:text-5xl font-bold text-gray-800">Tu huella de carbono,<br /> en tus manos</h1>
                <p class="max-w-[45ch] text-gray-600">Huellify te ayuda a medir, entender y reducir tu impacto ambiental
                    con
                    un enfoque simple, educativo y
                    personalizado. Pequeñas acciones, grandes cambios.</p>
            </div>

            <div class="flex flex-col gap-8">
                <div class="flex">
                    @auth
                        <a class="flex gap-1 items-center text-[14px] text-white bg-emerald-600 rounded-xl py-2 px-4 min-h-11 sm:min-h-0"
                            href="{{ route('dashboard.index') }}">Comienza ahora
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12l14 0" />
                                    <path d="M15 16l4 -4" />
                                    <path d="M15 8l4 4" />
                                </svg>
                            </span>
                        </a>
                    @else
                        <a class="flex gap-1 items-center text-[14px] text-white bg-emerald-600 rounded-xl py-2 px-4 min-h-11 sm:min-h-0"
                            href="{{ route('auth.register') }}">Comienza ahora
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12l14 0" />
                                    <path d="M15 16l4 -4" />
                                    <path d="M15 8l4 4" />
                                </svg>
                            </span>
                        </a>
                    @endauth

                </div>
                <ul class="flex flex-wrap gap-2 text-[12px]">
                    <li class="text-gray-600  flex flex-col gap-1 px-2 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-leaf">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                            <path
                                d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3l.014 0" />
                        </svg>
                        <span>Calcula<br /> tu huella</span>

                    </li>
                    <li class="text-gray-600  flex flex-col gap-1 px-2 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-chart-bar-popular">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6" />
                            <path d="M9 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10" />
                            <path d="M15 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14" />
                            <path d="M4 20h14" />
                        </svg>
                        <span> Visualiza <br /> tu progreso
                        </span>
                    </li>
                    <li class="text-gray-600  flex flex-col gap-1 px-2 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bulb">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                            <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                            <path d="M9.7 17l4.6 0" />
                        </svg>
                        <span> Recibe <br />recomendaciones
                        </span>
                    </li>
                    <li class=" text-gray-600  flex flex-col gap-1 px-2 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-world">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                            <path d="M3.6 9h16.8" />
                            <path d="M3.6 15h16.8" />
                            <path d="M11.5 3a17 17 0 0 0 0 18" />
                            <path d="M12.5 3a17 17 0 0 1 0 18" />
                        </svg>
                        <span> Construye un<br /> futuro sostenible
                        </span>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</header>
