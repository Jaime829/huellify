@extends('layouts.base')

@section('content')
    <style>
        :root {
            --brand: #0F5132;
            --brand-deep: #0A3D29;
            --accent: #0E9F6E;
            --accent-ink: #0A7A55;
            --mint-50: #F4FAF6;
            --mint-100: #E7F4EB;
            --mint-200: #D3EBDC;
            --ink: #14231B;
            --muted: #4A5B50;
            --line: #DDE8E0;
            --white: #FFFFFF;
            --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
            --shadow: 0 1px 2px -1px rgba(15, 81, 50, 0.08), 0 14px 30px -18px rgba(15, 81, 50, 0.24);
        }

        html {
            scroll-behavior: smooth;
            overflow-x: clip;
            -webkit-text-size-adjust: 100%;
        }

        body {
            overflow-x: clip;
            -webkit-font-smoothing: antialiased;
        }

        ::selection {
            background: var(--mint-200);
            color: var(--brand-deep);
        }

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: var(--mint-50);
        }

        ::-webkit-scrollbar-thumb {
            background: var(--mint-200);
            border: 2px solid var(--mint-50);
            border-radius: 999px;
        }

        :focus-visible {
            outline: 2px solid var(--brand);
            outline-offset: 3px;
            border-radius: 4px;
        }

        .on-dark :focus-visible {
            outline-color: var(--white);
        }

        section[id] {
            scroll-margin-top: 88px;
        }

        #site-header {
            transition: background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }

        #site-header.is-scrolled {
            border-bottom-color: var(--line);
            background-color: rgba(255, 255, 255, 0.96);
            box-shadow: 0 1px 14px -8px rgba(15, 81, 50, 0.24);
        }

        .btn {
            transition: transform 160ms var(--ease-out), background-color 160ms ease, color 160ms ease;
        }

        .btn:active {
            transform: scale(0.97);
        }

        .lift {
            transition: transform 180ms var(--ease-out), box-shadow 180ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
            .btn:hover {
                transform: translateY(-1px);
            }

            .lift:hover {
                transform: translateY(-3px);
                box-shadow: var(--shadow);
            }
        }

        .reveal {
            opacity: 0;
            transform: translateY(12px);
            transition: opacity 500ms var(--ease-out), transform 500ms var(--ease-out);
        }

        .reveal.is-visible {
            opacity: 1;
            transform: none;
        }

        .reveal--1 {
            transition-delay: 70ms;
        }

        .reveal--2 {
            transition-delay: 140ms;
        }

        .ring-hero {
            stroke-dasharray: 301.6;
            stroke-dashoffset: 301.6;
            animation: ring-hero-fill 1100ms var(--ease-out) 250ms forwards;
        }

        .ring-bento {
            stroke-dasharray: 276.5;
            stroke-dashoffset: 276.5;
        }

        .ring-bento.is-complete {
            stroke-dashoffset: 58;
            transition: stroke-dashoffset 900ms var(--ease-out) 200ms;
        }

        @keyframes ring-hero-fill {
            to {
                stroke-dashoffset: 62;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            html {
                scroll-behavior: auto;
            }

            .btn,
            .lift {
                transition: none;
            }

            .btn:active {
                transform: none;
            }

            .reveal {
                opacity: 1;
                transform: none;
                transition: none;
            }

            .ring-hero {
                stroke-dashoffset: 62;
                animation: none;
            }

            .ring-bento,
            .ring-bento.is-complete {
                stroke-dashoffset: 58;
                transition: none;
            }
        }
    </style>
    <noscript>
        <style>
            .reveal { opacity: 1; transform: none; }
            .ring-hero { stroke-dashoffset: 62; animation: none; }
            .ring-bento { stroke-dashoffset: 58; }
        </style>
    </noscript>

    <a href="#contenido"
        class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--brand-deep)] focus:px-5 focus:py-3 focus:text-[15px] focus:font-medium focus:text-[var(--white)]">Saltar al contenido</a>

    <header id="site-header"
        class="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-[var(--white)]/80 backdrop-blur-xl">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
            <a href="#inicio" class="flex min-h-11 items-center rounded-md" aria-label="Huellify, ir al inicio">
                <img src="{{ asset('images/logo.webp') }}" alt="Huellify" width="132" height="36"
                    class="h-9 w-[132px] object-contain object-left" />
            </a>

            <nav aria-label="Navegación principal" class="hidden items-center gap-1 md:flex">
                <a href="#inicio" aria-current="page"
                    class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Inicio</a>
                <a href="#como-funciona"
                    class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Cómo funciona</a>
                <a href="#beneficios"
                    class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Beneficios</a>
                <a href="#about"
                    class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Sobre Huellify</a>
            </nav>

            <div class="hidden items-center gap-2 md:flex">
                @auth
                    <a href="{{ route('dashboard.index') }}"
                        class="btn inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-deep)] px-5 text-[14px] font-medium text-[var(--white)] hover:bg-[var(--brand)]">
                        <span>Ir al dashboard</span>
                        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </a>
                @else
                    <a href="{{ route('auth.login') }}"
                        class="inline-flex min-h-11 items-center rounded-full px-4 text-[14px] font-medium text-[var(--brand)] transition-colors hover:bg-[var(--mint-100)]">Iniciar sesión</a>
                    <a href="{{ route('auth.register') }}"
                        class="btn inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-deep)] px-5 text-[14px] font-medium text-[var(--white)] hover:bg-[var(--brand)]">
                        <span>Comenzar gratis</span>
                        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </a>
                @endauth
            </div>

            <button id="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu"
                aria-label="Abrir menú"
                class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--brand)] md:hidden">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" aria-hidden="true">
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                </svg>
            </button>
        </div>

        <div id="mobile-menu" hidden
            class="absolute inset-x-0 top-full border-b border-[var(--line)] bg-[var(--white)] px-5 pb-5 pt-2 shadow-[var(--shadow)] md:hidden">
            <nav aria-label="Navegación móvil" class="flex flex-col">
                <a href="#inicio"
                    class="flex min-h-[44px] items-center border-b border-[var(--line)] text-[16px] font-medium text-[var(--ink)]">Inicio</a>
                <a href="#como-funciona"
                    class="flex min-h-[44px] items-center border-b border-[var(--line)] text-[16px] text-[var(--muted)]">Cómo funciona</a>
                <a href="#beneficios"
                    class="flex min-h-[44px] items-center border-b border-[var(--line)] text-[16px] text-[var(--muted)]">Beneficios</a>
                <a href="#about"
                    class="flex min-h-[44px] items-center text-[16px] text-[var(--muted)]">Sobre Huellify</a>
            </nav>
            <div class="mt-4 flex flex-col gap-2">
                @auth
                    <a href="{{ route('dashboard.index') }}"
                        class="btn flex min-h-[44px] items-center justify-center rounded-full bg-[var(--brand-deep)] text-[16px] font-medium text-[var(--white)]">Ir al dashboard</a>
                @else
                    <a href="{{ route('auth.register') }}"
                        class="btn flex min-h-[44px] items-center justify-center rounded-full bg-[var(--brand-deep)] text-[16px] font-medium text-[var(--white)]">Comenzar gratis</a>
                    <a href="{{ route('auth.login') }}"
                        class="flex min-h-[44px] items-center justify-center rounded-full border border-[var(--line)] text-[16px] font-medium text-[var(--brand)]">Iniciar sesión</a>
                @endauth
            </div>
        </div>
    </header>

    <main id="contenido" class="flex flex-col">
        <section id="inicio" class="relative overflow-hidden bg-[var(--mint-50)] pt-28 pb-16 sm:pt-32 lg:pb-24">
            <div aria-hidden="true" class="pointer-events-none absolute inset-0">
                <svg viewBox="0 0 280 280" class="absolute -left-32 top-24 h-72 w-72 text-[var(--mint-200)] opacity-70">
                    <path fill="currentColor"
                        d="M254 22C126 22 42 88 42 182c0 47 34 78 80 78 95 0 132-120 132-238Z" />
                </svg>
                <svg viewBox="0 0 320 320" class="absolute -right-28 -top-16 h-80 w-80 text-[var(--mint-100)]">
                    <circle cx="160" cy="160" r="150" fill="currentColor" />
                </svg>
            </div>

            <div class="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
                <div class="min-w-0">
                    <p class="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--white)]/80 px-3 py-2 text-[13px] font-medium text-[var(--brand)]">
                        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M20 4c-8.5 0-14 3.5-14 9.5A5.5 5.5 0 0 0 11.5 19C18 19 20 12 20 4Z" />
                            <path d="M4 20c2-4 5-7 10-10" />
                        </svg>
                        Conoce tu impacto. Transforma tus hábitos.
                    </p>

                    <h1 class="mt-6 max-w-[16ch] text-[clamp(2.25rem,5.2vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--ink)] [text-wrap:balance]">
                        Comprende tu huella. Empieza a cambiarla.
                    </h1>

                    <p class="mt-6 max-w-[54ch] text-[16px] leading-7 text-[var(--muted)]">
                        Descubre cómo tus actividades diarias impactan el planeta. Calcula tus emisiones de carbono,
                        comprende tus resultados y encuentra oportunidades para adoptar hábitos más sostenibles.
                    </p>

                    <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a href="{{ auth()->check() ? route('dashboard.index') : route('auth.login') }}"
                            class="btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-deep)] px-6 text-[16px] font-medium text-[var(--white)] hover:bg-[var(--brand)]">
                            {{ auth()->check() ? 'Ir al dashboard' : 'Calcular mi huella' }}
                            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </a>
                        <a href="#about"
                            class="btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--brand)] bg-[var(--white)] px-6 text-[16px] font-medium text-[var(--brand)] hover:bg-[var(--mint-100)]">
                            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                                <path d="M9 7.5v9l7-4.5-7-4.5Z" />
                            </svg>
                            Conocer Huellify
                        </a>
                    </div>
                </div>

                <div class="relative mx-auto w-full max-w-[540px]">
                    <svg viewBox="0 0 120 120" aria-hidden="true"
                        class="pointer-events-none absolute -left-8 -top-8 h-28 w-28 -rotate-12 text-[var(--accent)] opacity-30">
                        <path fill="currentColor" d="M104 12C54 12 18 40 18 84c0 22 16 37 38 37 44 0 48-54 48-109Z" />
                    </svg>

                    <div class="relative rounded-[24px] border border-[var(--line)] bg-[var(--white)] p-4 shadow-[var(--shadow)] sm:p-5">
                        <div class="flex items-center justify-between border-b border-[var(--line)] pb-4">
                            <div class="flex items-center gap-2">
                                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-[var(--white)]">
                                    <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor"
                                        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M20 4c-8.5 0-14 3.5-14 9.5A5.5 5.5 0 0 0 11.5 19C18 19 20 12 20 4Z" />
                                    </svg>
                                </span>
                                <span class="text-[15px] font-semibold text-[var(--ink)]">Huellify</span>
                            </div>
                            <div class="flex items-center gap-2 text-[var(--muted)]" aria-hidden="true">
                                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6">
                                    <rect x="5" y="10" width="14" height="10" rx="2" />
                                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                </svg>
                                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--mint-100)] text-[11px] font-semibold text-[var(--brand)]">H</span>
                            </div>
                        </div>

                        <div class="mt-5 flex gap-4">
                            <div class="hidden w-9 shrink-0 flex-col items-center gap-3 border-r border-[var(--line)] pr-3 sm:flex"
                                aria-hidden="true">
                                <span class="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--mint-100)] text-[var(--brand)]">
                                    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8">
                                        <rect x="4" y="4" width="7" height="7" rx="1" />
                                        <rect x="13" y="4" width="7" height="7" rx="1" />
                                        <rect x="4" y="13" width="7" height="7" rx="1" />
                                        <rect x="13" y="13" width="7" height="7" rx="1" />
                                    </svg>
                                </span>
                                <span class="flex h-7 w-7 items-center justify-center rounded-md text-[var(--muted)]">
                                    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8">
                                        <path d="M5 19V5m0 14h14" />
                                        <path d="m8 15 3-3 3 2 4-6" />
                                    </svg>
                                </span>
                                <span class="flex h-7 w-7 items-center justify-center rounded-md text-[var(--muted)]">
                                    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8">
                                        <path d="M4 7h16M4 12h16M4 17h10" />
                                    </svg>
                                </span>
                                <span class="flex h-7 w-7 items-center justify-center rounded-md text-[var(--muted)]">
                                    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8">
                                        <circle cx="12" cy="12" r="8" />
                                        <path d="M12 8v4l3 2" />
                                    </svg>
                                </span>
                            </div>

                            <div class="min-w-0 flex-1">
                                <p class="text-[17px] font-semibold text-[var(--ink)]">Mi huella de carbono</p>
                                <p class="mt-1 text-[13px] text-[var(--muted)]">Resumen de tu impacto ambiental</p>

                                <div class="mt-5 grid gap-5 sm:grid-cols-[124px_1fr] sm:items-center">
                                    <div class="relative mx-auto">
                                        <svg viewBox="0 0 120 120" class="h-[124px] w-[124px]" role="img"
                                            aria-label="Ejemplo ilustrativo: 2,70 kilogramos de CO₂e en total">
                                            <circle cx="60" cy="60" r="48" fill="none" stroke="var(--mint-200)"
                                                stroke-width="10" />
                                            <circle class="ring-hero" cx="60" cy="60" r="48" fill="none"
                                                stroke="var(--brand)" stroke-width="10" stroke-linecap="round"
                                                transform="rotate(-90 60 60)" />
                                        </svg>
                                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                                            <svg viewBox="0 0 24 24" class="h-4 w-4 text-[var(--accent-ink)]" fill="none"
                                                stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                                stroke-linejoin="round" aria-hidden="true">
                                                <path d="M20 4c-8.5 0-14 3.5-14 9.5A5.5 5.5 0 0 0 11.5 19C18 19 20 12 20 4Z" />
                                            </svg>
                                            <span class="mt-0.5 text-[22px] font-semibold leading-none text-[var(--ink)] [font-variant-numeric:tabular-nums]">2.70</span>
                                            <span class="mt-1 text-[11px] text-[var(--muted)]">kg CO₂e</span>
                                        </div>
                                    </div>

                                    <div class="space-y-3">
                                        <div class="flex items-center justify-between gap-3">
                                            <span class="flex items-center gap-2 text-[14px] text-[var(--muted)]">
                                                <span class="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"></span> Transporte
                                            </span>
                                            <span class="text-[14px] font-semibold text-[var(--ink)] [font-variant-numeric:tabular-nums]">1.40 kg</span>
                                        </div>
                                        <div class="flex items-center justify-between gap-3">
                                            <span class="flex items-center gap-2 text-[14px] text-[var(--muted)]">
                                                <span class="h-2.5 w-2.5 rounded-full bg-[var(--brand)]"></span> Energía
                                            </span>
                                            <span class="text-[14px] font-semibold text-[var(--ink)] [font-variant-numeric:tabular-nums]">1.30 kg</span>
                                        </div>

                                        <div class="rounded-xl bg-[var(--mint-50)] p-3">
                                            <p class="flex items-start gap-2 text-[13px] font-medium leading-5 text-[var(--accent-ink)]">
                                                <svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 shrink-0" fill="none"
                                                    stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                                    stroke-linejoin="round" aria-hidden="true">
                                                    <path d="M20 4c-8.5 0-14 3.5-14 9.5A5.5 5.5 0 0 0 11.5 19C18 19 20 12 20 4Z" />
                                                </svg>
                                                Huella un 12 % menor que el mes anterior
                                            </p>
                                            <div class="mt-3 flex h-8 items-end gap-1.5" aria-hidden="true">
                                                <span class="h-3 flex-1 rounded-sm bg-[var(--mint-200)]"></span>
                                                <span class="h-5 flex-1 rounded-sm bg-[var(--mint-200)]"></span>
                                                <span class="h-4 flex-1 rounded-sm bg-[var(--mint-200)]"></span>
                                                <span class="h-6 flex-1 rounded-sm bg-[var(--accent)]"></span>
                                                <span class="h-7 flex-1 rounded-sm bg-[var(--accent)]"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p class="mt-3 text-center text-[12px] text-[var(--muted)]">Ejemplo ilustrativo · datos de muestra</p>
                </div>
            </div>
        </section>

        <section id="como-funciona" class="bg-[var(--white)] px-5 py-16 sm:px-8 lg:py-24">
            <div class="mx-auto max-w-7xl">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em] text-[var(--ink)] [text-wrap:balance]">
                        Todo comienza por entender tu impacto
                    </h2>
                    <p class="mt-4 text-[16px] leading-7 text-[var(--muted)]">
                        Cada decisión cotidiana genera un impacto. Conocerlo es el primer paso para tomar decisiones más
                        conscientes.
                    </p>
                </div>

                <div class="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14">
                    <article class="lift reveal rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mint-100)] text-[var(--brand)]">
                            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M20 4c-8.5 0-14 3.5-14 9.5A5.5 5.5 0 0 0 11.5 19C18 19 20 12 20 4Z" />
                                <path d="M4 20c2-4 5-7 10-10" />
                            </svg>
                        </span>
                        <h3 class="mt-5 text-[18px] font-semibold text-[var(--ink)]">Comprende tus emisiones</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Identifica cuánto CO<sub>2</sub>e generan tus actividades cotidianas y descubre qué categorías
                            contribuyen más a tu huella.
                        </p>
                    </article>

                    <article class="lift reveal reveal--1 rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mint-100)] text-[var(--brand)]">
                            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M4 19h16" />
                                <path d="m5 15 4-4 3 2 6-7" />
                                <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
                            </svg>
                        </span>
                        <h3 class="mt-5 text-[18px] font-semibold text-[var(--ink)]">Visualiza tu progreso</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Consulta tus resultados históricos y comprueba cómo evoluciona tu huella de carbono a lo
                            largo del tiempo.
                        </p>
                    </article>

                    <article class="lift reveal reveal--2 rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mint-100)] text-[var(--brand)]">
                            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M9 18h6" />
                                <path d="M10 21h4" />
                                <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6h5.4c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
                            </svg>
                        </span>
                        <h3 class="mt-5 text-[18px] font-semibold text-[var(--ink)]">Descubre oportunidades de cambio</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Encuentra recomendaciones de sostenibilidad y comienza a incorporar hábitos más
                            responsables.
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <section id="beneficios" class="bg-[var(--mint-50)] px-5 py-16 sm:px-8 lg:py-24">
            <div class="mx-auto max-w-7xl">
                <div class="mx-auto max-w-3xl text-center">
                    <h2 class="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em] text-[var(--ink)] [text-wrap:balance]">
                        Conocer tu impacto es más sencillo de lo que imaginas
                    </h2>
                </div>

                <div class="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-10">
                    <article class="lift reveal relative rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <span aria-hidden="true"
                            class="absolute -bottom-7 left-1/2 h-7 w-px -translate-x-1/2 bg-[var(--mint-200)] lg:bottom-auto lg:left-auto lg:right-[-28px] lg:top-1/2 lg:h-px lg:w-7 lg:translate-x-0 lg:-translate-y-1/2"></span>
                        <span class="inline-flex items-center rounded-full border border-[var(--line)] px-2.5 py-1 text-[13px] font-semibold text-[var(--brand)]">01</span>
                        <svg viewBox="0 0 96 64" class="mt-5 h-16 w-24 text-[var(--brand)]" fill="none"
                            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                            aria-hidden="true">
                            <path fill="var(--mint-100)" d="M18 38h60v11H18z" />
                            <path fill="var(--mint-100)" d="m27 38 8-14h26l8 14" />
                            <circle cx="31" cy="49" r="5" fill="var(--white)" />
                            <circle cx="65" cy="49" r="5" fill="var(--white)" />
                            <path d="M40 32h16" />
                        </svg>
                        <h3 class="mt-5 text-[18px] font-semibold text-[var(--ink)]">Registra tus actividades</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Ingresa información sobre tus desplazamientos y consumo de energía.
                        </p>
                    </article>

                    <article class="lift reveal reveal--1 relative rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <span aria-hidden="true"
                            class="absolute -bottom-7 left-1/2 h-7 w-px -translate-x-1/2 bg-[var(--mint-200)] lg:bottom-auto lg:left-auto lg:right-[-28px] lg:top-1/2 lg:h-px lg:w-7 lg:translate-x-0 lg:-translate-y-1/2"></span>
                        <span class="inline-flex items-center rounded-full border border-[var(--line)] px-2.5 py-1 text-[13px] font-semibold text-[var(--brand)]">02</span>
                        <svg viewBox="0 0 96 64" class="mt-5 h-16 w-24 text-[var(--brand)]" fill="none"
                            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                            aria-hidden="true">
                            <rect x="20" y="10" width="56" height="36" rx="4" fill="var(--mint-100)" />
                            <path d="M12 52h72l-4-4H16z" fill="var(--mint-200)" />
                            <path d="M42 30c-7 0-11 4-11 9a5 5 0 0 0 5 5c7 0 10-7 10-14Z" />
                            <path d="M34 43c2-3 4-5 8-7" />
                        </svg>
                        <h3 class="mt-5 text-[18px] font-semibold text-[var(--ink)]">Calcula tu huella</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Huellify estima tus emisiones de gases de efecto invernadero y presenta tus resultados en
                            kg CO<sub>2</sub>e.
                        </p>
                    </article>

                    <article class="lift reveal reveal--2 relative rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <span class="inline-flex items-center rounded-full border border-[var(--line)] px-2.5 py-1 text-[13px] font-semibold text-[var(--brand)]">03</span>
                        <svg viewBox="0 0 96 64" class="mt-5 h-16 w-24 text-[var(--brand)]" fill="none"
                            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                            aria-hidden="true">
                            <path fill="var(--mint-100)" d="M56 8C34 8 20 23 20 43c0 8 6 13 14 13 19 0 22-24 22-48Z" />
                            <path fill="var(--mint-200)" d="M78 20C60 20 48 32 48 48c0 5 4 8 9 8 15 0 21-17 21-36Z" />
                            <path d="M27 53c4-9 10-16 20-22" />
                        </svg>
                        <h3 class="mt-5 text-[18px] font-semibold text-[var(--ink)]">Comprende y mejora</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Consulta tu historial, interpreta tus resultados mediante equivalencias ambientales y
                            descubre recomendaciones para reducir tu impacto.
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <section id="about" class="bg-[var(--white)] px-5 py-16 sm:px-8 lg:py-24">
            <div class="mx-auto max-w-7xl">
                <h2 class="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em] text-[var(--ink)]">
                    Conoce las funcionalidades
                </h2>
                <p class="mt-3 text-[16px] leading-7 text-[var(--muted)]">
                    Herramientas para pasar de los datos a las decisiones.
                </p>

                <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
                    <article class="reveal flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6 lg:col-span-5 lg:row-span-2">
                        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mint-100)] text-[var(--brand)]">
                            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M4 19h16" />
                                <path d="M6 16V9m4 7V5m4 11v-5m4 5V8" />
                            </svg>
                        </span>
                        <h3 class="mt-4 text-[18px] font-semibold text-[var(--ink)]">Cálculo de huella de carbono</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Obtén un análisis detallado de tus emisiones por categoría.
                        </p>

                        <div class="mt-auto flex flex-col items-center gap-5 rounded-xl border border-[var(--line)] p-4 pt-6 sm:flex-row sm:justify-between">
                            <div class="relative shrink-0">
                                <svg viewBox="0 0 120 120" class="h-28 w-28" role="img"
                                    aria-label="Ejemplo ilustrativo: 2,70 kg de CO₂e; 1,40 kg de transporte y 1,30 kg de energía">
                                    <circle cx="60" cy="60" r="44" fill="none" stroke="var(--mint-200)" stroke-width="10" />
                                    <circle class="ring-bento" cx="60" cy="60" r="44" fill="none"
                                        stroke="var(--brand)" stroke-width="10" stroke-linecap="round"
                                        transform="rotate(-90 60 60)" />
                                </svg>
                                <div class="absolute inset-0 flex flex-col items-center justify-center">
                                    <span class="text-[20px] font-semibold leading-none text-[var(--ink)] [font-variant-numeric:tabular-nums]">2.70</span>
                                    <span class="mt-1 text-[11px] text-[var(--muted)]">kg CO₂e</span>
                                </div>
                            </div>

                            <div class="w-full max-w-[210px] space-y-3">
                                <div class="flex items-center justify-between text-[14px]">
                                    <span class="flex items-center gap-2 text-[var(--muted)]">
                                        <span class="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"></span> Transporte
                                    </span>
                                    <span class="font-semibold text-[var(--ink)] [font-variant-numeric:tabular-nums]">1.40 kg</span>
                                </div>
                                <div class="flex items-center justify-between text-[14px]">
                                    <span class="flex items-center gap-2 text-[var(--muted)]">
                                        <span class="h-2.5 w-2.5 rounded-full bg-[var(--brand)]"></span> Energía
                                    </span>
                                    <span class="font-semibold text-[var(--ink)] [font-variant-numeric:tabular-nums]">1.30 kg</span>
                                </div>
                                <svg viewBox="0 0 160 60" class="h-14 w-full" role="img"
                                    aria-label="Ejemplo ilustrativo: barras mensuales de emisiones">
                                    <path d="M0 58h160" stroke="var(--line)" stroke-width="1" />
                                    <rect x="6" y="38" width="20" height="18" rx="3" fill="var(--mint-200)" />
                                    <rect x="38" y="30" width="20" height="26" rx="3" fill="var(--mint-200)" />
                                    <rect x="70" y="34" width="20" height="22" rx="3" fill="var(--mint-200)" />
                                    <rect x="102" y="22" width="20" height="34" rx="3" fill="var(--accent)" />
                                    <rect x="134" y="12" width="20" height="44" rx="3" fill="var(--brand)" />
                                </svg>
                            </div>
                        </div>
                    </article>

                    <article class="reveal rounded-2xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6 lg:col-span-4">
                        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mint-100)] text-[var(--brand)]">
                            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M4 19V5m0 14h16" />
                                <path d="m7 15 4-4 3 2 6-7" />
                            </svg>
                        </span>
                        <h3 class="mt-4 text-[18px] font-semibold text-[var(--ink)]">Seguimiento histórico</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Consulta la evolución de tu huella y compara periodos.
                        </p>
                        <svg viewBox="0 0 240 90" class="mt-5 w-full" role="img"
                            aria-label="Ejemplo ilustrativo: la huella desciende de forma sostenida en los últimos meses">
                            <path d="M0 22h240M0 45h240M0 68h240" stroke="var(--line)" stroke-width="1" />
                            <path d="M6 76c28-2 44-4 66-12s36-16 58-18 46-22 104-34" fill="none"
                                stroke="var(--brand)" stroke-width="2.5" stroke-linecap="round" />
                            <circle cx="72" cy="64" r="3.5" fill="var(--brand)" />
                            <circle cx="130" cy="46" r="3.5" fill="var(--brand)" />
                            <circle cx="188" cy="30" r="3.5" fill="var(--brand)" />
                        </svg>
                    </article>

                    <article class="reveal rounded-2xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6 lg:col-span-3">
                        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mint-100)] text-[var(--brand)]">
                            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M20 4c-8.5 0-14 3.5-14 9.5A5.5 5.5 0 0 0 11.5 19C18 19 20 12 20 4Z" />
                            </svg>
                        </span>
                        <h3 class="mt-4 text-[18px] font-semibold text-[var(--ink)]">Equivalencias ambientales</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Descubre el impacto de tus emisiones en referencias del mundo real.
                        </p>
                        <div class="mt-5 flex items-center justify-center gap-3 rounded-xl bg-[var(--mint-50)] p-4">
                            <svg viewBox="0 0 64 64" class="h-14 w-14" fill="none" stroke="var(--brand)"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img"
                                aria-label="Ejemplo ilustrativo: dos árboles">
                                <path d="M32 60V38" />
                                <path fill="var(--mint-200)" d="M32 6 14 34h36L32 6Z" />
                                <path fill="var(--mint-100)" d="M32 22 19 44h26L32 22Z" />
                            </svg>
                            <div>
                                <p class="text-[20px] font-semibold text-[var(--ink)]">2 árboles</p>
                                <p class="text-[13px] text-[var(--muted)]">Ejemplo ilustrativo</p>
                            </div>
                        </div>
                    </article>

                    <article class="reveal rounded-2xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6 lg:col-span-4">
                        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mint-100)] text-[var(--brand)]">
                            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </span>
                        <h3 class="mt-4 text-[18px] font-semibold text-[var(--ink)]">Recomendaciones sostenibles</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Recibe sugerencias personalizadas para reducir tu impacto.
                        </p>
                        <ul class="mt-5 space-y-3">
                            <li class="flex items-start gap-3 text-[15px] text-[var(--muted)]">
                                <svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-ink)]"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" aria-hidden="true">
                                    <path d="m5 12 4 4L19 6" />
                                </svg>
                                Revisa el transporte en tus desplazamientos
                            </li>
                            <li class="flex items-start gap-3 text-[15px] text-[var(--muted)]">
                                <svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-ink)]"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" aria-hidden="true">
                                    <path d="m5 12 4 4L19 6" />
                                </svg>
                                Ajusta el consumo de energía en casa
                            </li>
                        </ul>
                    </article>

                    <article class="reveal rounded-2xl border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6 lg:col-span-3">
                        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mint-100)] text-[var(--brand)]">
                            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <rect x="4" y="5" width="16" height="16" rx="2" />
                                <path d="M8 3v4M16 3v4M4 10h16" />
                            </svg>
                        </span>
                        <h3 class="mt-4 text-[18px] font-semibold text-[var(--ink)]">Seguimiento de hábitos</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">
                            Adopta hábitos sostenibles y lleva un registro de tu progreso.
                        </p>
                        <div class="mt-5 flex items-center justify-between gap-4 rounded-xl bg-[var(--mint-50)] p-4">
                            <div class="flex items-center gap-1.5" aria-hidden="true">
                                <span class="h-4 w-4 rounded-full bg-[var(--brand)]"></span>
                                <span class="h-4 w-4 rounded-full bg-[var(--brand)]"></span>
                                <span class="h-4 w-4 rounded-full bg-[var(--brand)]"></span>
                                <span class="h-4 w-4 rounded-full bg-[var(--brand)]"></span>
                                <span class="h-4 w-4 rounded-full bg-[var(--brand)]"></span>
                                <span class="h-4 w-4 rounded-full border border-[var(--mint-200)] bg-[var(--white)]"></span>
                                <span class="h-4 w-4 rounded-full border border-[var(--mint-200)] bg-[var(--white)]"></span>
                            </div>
                            <p class="text-[20px] font-semibold text-[var(--brand)] [font-variant-numeric:tabular-nums]">5/7</p>
                        </div>
                    </article>
                </div>

                <p class="mt-5 text-[14px] text-[var(--muted)]">
                    Los valores y gráficas de esta sección son ejemplos ilustrativos.
                </p>
            </div>
        </section>

        <section class="px-5 sm:px-8" aria-labelledby="banner-title">
            <div class="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[var(--mint-100)]">
                <div class="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
                    <div class="relative aspect-[16/10] min-h-[220px] bg-[var(--mint-200)] sm:min-h-[280px] lg:aspect-auto lg:min-h-[380px]">
                        <img src="{{ asset('images/bg-landing.webp') }}" alt="Vista de una ciudad entre montañas y vegetación"
                            width="1200" height="800" loading="lazy" decoding="async"
                            class="absolute inset-0 h-full w-full object-cover object-[50%_55%]" />
                        <div aria-hidden="true"
                            class="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,transparent_40%,var(--mint-100)_100%)] lg:block"></div>
                    </div>
                    <div class="relative flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                        <h2 id="banner-title"
                            class="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-[-0.025em] text-[var(--ink)] [text-wrap:balance]">
                            Pequeños cambios comienzan con grandes preguntas
                        </h2>
                        <p class="mt-4 max-w-[52ch] text-[16px] leading-7 text-[var(--muted)]">
                            No se trata de cambiar todo de un día para otro. Se trata de comprender tus decisiones,
                            reconocer tu impacto y avanzar progresivamente hacia una forma de vida más sostenible.
                        </p>
                        <a href="#beneficios"
                            class="btn mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-[var(--brand)] px-6 text-[16px] font-medium text-[var(--brand)] hover:bg-[var(--white)]">
                            Ver cómo funciona
                            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="on-dark px-5 pb-16 pt-6 sm:px-8 lg:pb-24" aria-labelledby="cta-title">
            <div class="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[var(--brand-deep)] px-6 py-12 text-center sm:px-12 lg:py-14">
                <svg viewBox="0 0 260 200" aria-hidden="true"
                    class="pointer-events-none absolute -left-10 -top-8 h-56 w-72 text-[var(--white)] opacity-[0.07]">
                    <path fill="currentColor" d="M240 12C116 12 34 76 34 166c0 27 19 44 46 44 107 0 150-112 160-198Z" />
                </svg>
                <svg viewBox="0 0 260 200" aria-hidden="true"
                    class="pointer-events-none absolute -bottom-16 -right-10 h-56 w-72 rotate-[160deg] text-[var(--white)] opacity-[0.06]">
                    <path fill="currentColor" d="M240 12C116 12 34 76 34 166c0 27 19 44 46 44 107 0 150-112 160-198Z" />
                </svg>

                <div class="relative">
                    <h2 id="cta-title"
                        class="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.025em] text-[var(--white)] [text-wrap:balance]">
                        Tu impacto merece ser comprendido
                    </h2>
                    <p class="mx-auto mt-4 max-w-[60ch] text-[16px] leading-7 text-[var(--white)]/80">
                        Empieza a conocer tu huella de carbono y descubre cómo puedes construir un futuro más
                        sostenible desde tus decisiones cotidianas.
                    </p>
                    <a href="{{ auth()->check() ? route('dashboard.index') : route('auth.register') }}"
                        class="btn mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--white)] px-6 text-[16px] font-semibold text-[var(--brand-deep)] hover:bg-[var(--mint-50)]">
                        {{ auth()->check() ? 'Ir al dashboard' : 'Comenzar gratis' }}
                        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    </main>

    <footer class="border-t border-[var(--line)] bg-[var(--white)]">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
            <div class="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8">
                <div>
                    <a href="#inicio" class="inline-flex min-h-11 items-center rounded-md" aria-label="Huellify, ir al inicio">
                        <img src="{{ asset('images/logo.webp') }}" alt="Huellify" width="132" height="36"
                            class="h-9 w-[132px] object-contain object-left" />
                    </a>
                    <p class="mt-3 max-w-[28ch] text-[16px] leading-7 text-[var(--muted)]">
                        Comprende tu impacto. Transforma tus hábitos.
                    </p>
                </div>

                <div>
                    <h2 class="text-[15px] font-semibold text-[var(--ink)]">Plataforma</h2>
                    <ul class="mt-4 space-y-3">
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="#como-funciona">Cómo funciona</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="#about">Funcionalidades</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ auth()->check() ? route('dashboard.index') : route('auth.login') }}">{{ auth()->check() ? 'Ir al dashboard' : 'Iniciar sesión' }}</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ auth()->check() ? route('dashboard.profile') : route('auth.register') }}">{{ auth()->check() ? 'Mi perfil' : 'Crear cuenta' }}</a></li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-[15px] font-semibold text-[var(--ink)]">Información</h2>
                    <ul class="mt-4 space-y-3">
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ route('about') }}">Sobre Huellify</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ route('terms') }}">Términos y condiciones</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ route('privacy') }}">Política de privacidad</a></li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-[15px] font-semibold text-[var(--ink)]">Síguenos</h2>
                    <ul class="mt-4 flex items-center gap-2">
                        <li>
                            <a href="#" rel="noopener noreferrer" aria-label="YouTube"
                                class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]">
                                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                                    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                                    <path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" rel="noopener noreferrer" aria-label="X"
                                class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]">
                                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
                                    <path d="M5 5 19 19M19 5 5 19" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" rel="noopener noreferrer" aria-label="Instagram"
                                class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]">
                                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" rel="noopener noreferrer" aria-label="LinkedIn"
                                class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]">
                                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
                                    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                                    <path d="M8 10.5V17M8 7.5v.2M12 17v-4a2 2 0 0 1 4 0v4" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="flex items-center justify-between gap-4 border-t border-[var(--line)] py-6">
                <p class="text-[14px] text-[var(--muted)]">
                    © {{ date('Y') }} Huellify. Todos los derechos reservados.
                </p>
                <svg viewBox="0 0 24 24" class="h-5 w-5 shrink-0 text-[var(--brand)]" fill="none" stroke="currentColor"
                    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 4c-8.5 0-14 3.5-14 9.5A5.5 5.5 0 0 0 11.5 19C18 19 20 12 20 4Z" />
                </svg>
            </div>
        </div>
    </footer>

    <script>
        (function () {
            var header = document.getElementById('site-header');
            var toggle = document.getElementById('menu-toggle');
            var menu = document.getElementById('mobile-menu');
            var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            var mobileQuery = window.matchMedia('(max-width: 767px)');

            function updateHeader() {
                if (header) {
                    header.classList.toggle('is-scrolled', window.scrollY > 8);
                }
            }

            updateHeader();
            window.addEventListener('scroll', updateHeader, { passive: true });

            function openMenu() {
                if (!menu || !toggle) {
                    return;
                }
                menu.hidden = false;
                toggle.setAttribute('aria-expanded', 'true');
                toggle.setAttribute('aria-label', 'Cerrar menú');
                var firstLink = menu.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            }

            function closeMenu(returnFocus) {
                if (!menu || !toggle) {
                    return;
                }
                menu.hidden = true;
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Abrir menú');
                if (returnFocus) {
                    toggle.focus();
                }
            }

            if (toggle && menu) {
                toggle.addEventListener('click', function () {
                    if (menu.hidden) {
                        openMenu();
                    } else {
                        closeMenu(false);
                    }
                });

                menu.addEventListener('click', function (event) {
                    if (event.target.closest('a')) {
                        closeMenu(false);
                    }
                });

                document.addEventListener('keydown', function (event) {
                    if (event.key === 'Escape' && !menu.hidden) {
                        closeMenu(true);
                    }
                });

                document.addEventListener('click', function (event) {
                    if (!menu.hidden && !menu.contains(event.target) && !toggle.contains(event.target)) {
                        closeMenu(false);
                    }
                });

                window.addEventListener('resize', function () {
                    if (!mobileQuery.matches && !menu.hidden) {
                        closeMenu(false);
                    }
                });
            }

            var revealItems = document.querySelectorAll('.reveal');

            function revealAll() {
                revealItems.forEach(function (item) {
                    item.classList.add('is-visible');
                    var ring = item.querySelector('.ring-bento');
                    if (ring) {
                        ring.classList.add('is-complete');
                    }
                });
            }

            if (!('IntersectionObserver' in window) || reduceMotion.matches) {
                revealAll();
            } else {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) {
                            return;
                        }
                        entry.target.classList.add('is-visible');
                        var ring = entry.target.querySelector('.ring-bento');
                        if (ring) {
                            ring.classList.add('is-complete');
                        }
                        observer.unobserve(entry.target);
                    });
                }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

                revealItems.forEach(function (item) {
                    observer.observe(item);
                });
            }
        })();
    </script>
@endsection
