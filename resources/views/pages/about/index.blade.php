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

        html { scroll-behavior: smooth; overflow-x: clip; -webkit-text-size-adjust: 100%; }
        body { overflow-x: clip; -webkit-font-smoothing: antialiased; }
        ::selection { background: var(--mint-200); color: var(--brand-deep); }
        :focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; border-radius: 4px; }
        .on-dark :focus-visible { outline-color: var(--white); }
        section[id] { scroll-margin-top: 96px; }

        #site-header { transition: background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease; }
        #site-header.is-scrolled {
            border-bottom-color: var(--line);
            background-color: rgba(255, 255, 255, 0.96);
            box-shadow: 0 1px 14px -8px rgba(15, 81, 50, 0.24);
        }

        .btn { transition: transform 160ms var(--ease-out), background-color 160ms ease; }
        .btn:active { transform: scale(0.97); }
        .lift { transition: transform 180ms var(--ease-out), box-shadow 180ms ease; }
        @media (hover: hover) and (pointer: fine) {
            .btn:hover { transform: translateY(-1px); }
            .lift:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
        }

        .reveal {
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 500ms var(--ease-out), transform 500ms var(--ease-out);
        }
        .reveal.is-visible { opacity: 1; transform: none; }
        .reveal--1 { transition-delay: 70ms; }
        .reveal--2 { transition-delay: 140ms; }

        .todo {
            display: inline;
            padding: 2px 7px;
            border: 1px dashed #B45309;
            border-radius: 6px;
            background: #FFFBEB;
            color: #7C2D12;
            font-weight: 600;
        }

        main h1 { font-size: clamp(2.25rem, 5vw, 3.5rem); line-height: 1.1; letter-spacing: -0.03em; font-weight: 600; color: var(--ink); }
        main h2 { font-size: clamp(1.5rem, 2.6vw, 2rem); line-height: 1.2; letter-spacing: -0.025em; font-weight: 600; color: var(--ink); }
        main div[class*="max-w-[70ch]"] { max-width: 70ch; margin-inline: auto; }

        @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .btn, .lift, .reveal { transition: none; }
            .btn:active { transform: none; }
            .reveal { opacity: 1; transform: none; }
        }

        @media print {
            .no-print { display: none !important; }
            body, main, section, div, article { background: #fff !important; color: #000 !important; box-shadow: none !important; }
            main { padding-top: 0 !important; }
            section { break-inside: avoid; }
            a { color: #000 !important; text-decoration: underline; }
            .todo { border: 1px solid #666 !important; background: #fff !important; color: #000 !important; }
        }
    </style>
    <noscript><style>.reveal { opacity: 1; transform: none; }</style></noscript>

    <a href="#contenido"
        class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--brand-deep)] focus:px-5 focus:py-3 focus:text-[15px] focus:font-medium focus:text-[var(--white)]">Saltar al contenido</a>

    <header id="site-header" class="no-print fixed inset-x-0 top-0 z-50 border-b border-transparent bg-[var(--white)]/80 backdrop-blur-xl">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
            <a href="{{ route('landing') }}" class="flex min-h-11 items-center rounded-md" aria-label="Huellify, ir al inicio">
                <img src="{{ asset('images/logo.webp') }}" alt="Huellify" width="132" height="36" class="h-9 w-[132px] object-contain object-left" />
            </a>
            <nav aria-label="Navegación principal" class="hidden items-center gap-1 md:flex">
                <a href="{{ route('landing') }}" class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Inicio</a>
                <a href="{{ route('landing') }}#como-funciona" class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Cómo funciona</a>
                <a href="{{ route('landing') }}#beneficios" class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Beneficios</a>
                <a href="{{ route('about') }}" aria-current="page" class="inline-flex min-h-11 items-center rounded-full bg-[var(--mint-100)] px-3 text-[15px] font-medium text-[var(--brand)]">Sobre Huellify</a>
            </nav>
            <div class="hidden items-center gap-2 md:flex">
                @auth
                    <a href="{{ route('dashboard.index') }}" class="btn inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-deep)] px-5 text-[14px] font-medium text-[var(--white)] hover:bg-[var(--brand)]">
                        <span>Ir al dashboard</span>
                        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
                    </a>
                @else
                    <a href="{{ route('auth.login') }}" class="inline-flex min-h-11 items-center rounded-full px-4 text-[14px] font-medium text-[var(--brand)] transition-colors hover:bg-[var(--mint-100)]">Iniciar sesión</a>
                    <a href="{{ route('auth.register') }}" class="btn inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-deep)] px-5 text-[14px] font-medium text-[var(--white)] hover:bg-[var(--brand)]">
                        <span>Comenzar gratis</span>
                        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
                    </a>
                @endauth
            </div>
            <button id="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menú" class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--brand)] md:hidden">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>
            </button>
        </div>
        <div id="mobile-menu" hidden class="absolute inset-x-0 top-full border-b border-[var(--line)] bg-[var(--white)] px-5 pb-5 pt-2 shadow-[var(--shadow)] md:hidden">
            <nav aria-label="Navegación móvil" class="flex flex-col">
                <a href="{{ route('landing') }}" class="flex min-h-[44px] items-center border-b border-[var(--line)] text-[16px] font-medium text-[var(--ink)]">Inicio</a>
                <a href="{{ route('landing') }}#como-funciona" class="flex min-h-[44px] items-center border-b border-[var(--line)] text-[16px] text-[var(--muted)]">Cómo funciona</a>
                <a href="{{ route('landing') }}#beneficios" class="flex min-h-[44px] items-center border-b border-[var(--line)] text-[16px] text-[var(--muted)]">Beneficios</a>
                <a href="{{ route('about') }}" class="flex min-h-[44px] items-center text-[16px] text-[var(--brand)]" aria-current="page">Sobre Huellify</a>
            </nav>
            <div class="mt-4 flex flex-col gap-2">
                @auth
                    <a href="{{ route('dashboard.index') }}" class="btn flex min-h-[44px] items-center justify-center rounded-full bg-[var(--brand-deep)] text-[16px] font-medium text-[var(--white)]">Ir al dashboard</a>
                @else
                    <a href="{{ route('auth.register') }}" class="btn flex min-h-[44px] items-center justify-center rounded-full bg-[var(--brand-deep)] text-[16px] font-medium text-[var(--white)]">Comenzar gratis</a>
                    <a href="{{ route('auth.login') }}" class="flex min-h-[44px] items-center justify-center rounded-full border border-[var(--line)] text-[16px] font-medium text-[var(--brand)]">Iniciar sesión</a>
                @endauth
            </div>
        </div>
    </header>

    <main id="contenido" class="pt-28 sm:pt-32">
        <section class="relative overflow-hidden bg-[var(--mint-50)] px-5 pb-16 pt-14 sm:px-8 lg:pb-20">
            <svg viewBox="0 0 280 280" aria-hidden="true" class="pointer-events-none absolute -right-24 -top-20 h-72 w-72 text-[var(--mint-200)] opacity-70"><path fill="currentColor" d="M254 22C126 22 42 88 42 182c0 47 34 78 80 78 95 0 132-120 132-238Z" /></svg>
            <div class="relative mx-auto max-w-4xl">
                <h1 class="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--ink)] [text-wrap:balance]">Acerca de Huellify</h1>
                <p class="mt-5 max-w-[58ch] text-[18px] leading-8 text-[var(--muted)]">Comprender tu huella es el primer paso para cambiarla.</p>
                <p class="mt-6 text-[15px] text-[var(--muted)]">Última actualización: <span class="todo">[POR COMPLETAR: fecha de última actualización]</span> · Versión 1.0 (borrador)</p>
            </div>
        </section>

        <section class="px-5 py-12 sm:px-8 lg:py-16">
            <div class="mx-auto max-w-[70ch]">
                <div class="rounded-2xl border border-[#FCD34D] bg-[#FFFBEB] p-5 text-[15px] leading-7 text-[#7C2D12]">
                    <strong>Aviso legal.</strong> Este documento es un borrador redactado de buena fe y no constituye asesoría legal. Debe ser revisado por un abogado antes de publicarse.
                </div>
                <h2 class="mt-12 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] text-[var(--ink)]">Propósito y visión</h2>
                <p class="mt-4 text-[17px] leading-8 text-[var(--muted)]">Huellify existe para que entiendas cómo tus actividades cotidianas se relacionan con tus emisiones de gases de efecto invernadero y puedas decidir, con información clara, qué cambiar. No buscamos perfectos: buscamos decisiones más conscientes y hábitos que se puedan mantener.</p>

                <h2 class="mt-12 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] text-[var(--ink)]">Qué hace y para quién</h2>
                <p class="mt-4 text-[17px] leading-8 text-[var(--muted)]">Es una plataforma web para cualquier persona que quiera registrar sus desplazamientos y su consumo de energía, ver una estimación de su huella en kg CO<sub>2</sub>e, consultar su historial y recibir equivalencias y recomendaciones. No necesitas conocimientos técnicos: solo datos sencillos sobre tus actividades.</p>
            </div>
        </section>

        <section class="bg-[var(--mint-50)] px-5 py-14 sm:px-8 lg:py-20">
            <div class="mx-auto max-w-7xl">
                <h2 class="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] text-[var(--ink)]">Cómo funciona en tres pasos</h2>
                <div class="mt-10 grid gap-6 md:grid-cols-3">
                    <article class="lift reveal rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <span class="inline-flex items-center rounded-full border border-[var(--line)] px-2.5 py-1 text-[13px] font-semibold text-[var(--brand)]">01</span>
                        <svg viewBox="0 0 96 64" class="mt-5 h-16 w-24 text-[var(--brand)]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path fill="var(--mint-100)" d="M18 38h60v11H18z" /><path fill="var(--mint-100)" d="m27 38 8-14h26l8 14" /><circle cx="31" cy="49" r="5" fill="var(--white)" /><circle cx="65" cy="49" r="5" fill="var(--white)" /><path d="M40 32h16" /></svg>
                        <h3 class="mt-5 text-[18px] font-semibold text-[var(--ink)]">Registra tus actividades</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">Ingresa información sobre tus desplazamientos y tu consumo de energía en un periodo determinado.</p>
                    </article>
                    <article class="lift reveal reveal--1 rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <span class="inline-flex items-center rounded-full border border-[var(--line)] px-2.5 py-1 text-[13px] font-semibold text-[var(--brand)]">02</span>
                        <svg viewBox="0 0 96 64" class="mt-5 h-16 w-24 text-[var(--brand)]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="20" y="10" width="56" height="36" rx="4" fill="var(--mint-100)" /><path d="M12 52h72l-4-4H16z" fill="var(--mint-200)" /><path d="M42 30c-7 0-11 4-11 9a5 5 0 0 0 5 5c7 0 10-7 10-14Z" /><path d="M34 43c2-3 4-5 8-7" /></svg>
                        <h3 class="mt-5 text-[18px] font-semibold text-[var(--ink)]">Calcula tu huella</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">Huellify estima tus emisiones de gases de efecto invernadero y presenta los resultados en kg CO<sub>2</sub>e.</p>
                    </article>
                    <article class="lift reveal reveal--2 rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <span class="inline-flex items-center rounded-full border border-[var(--line)] px-2.5 py-1 text-[13px] font-semibold text-[var(--brand)]">03</span>
                        <svg viewBox="0 0 96 64" class="mt-5 h-16 w-24 text-[var(--brand)]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path fill="var(--mint-100)" d="M56 8C34 8 20 23 20 43c0 8 6 13 14 13 19 0 22-24 22-48Z" /><path fill="var(--mint-200)" d="M78 20C60 20 48 32 48 48c0 5 4 8 9 8 15 0 21-17 21-36Z" /><path d="M27 53c4-9 10-16 20-22" /></svg>
                        <h3 class="mt-5 text-[18px] font-semibold text-[var(--ink)]">Comprende y mejora</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">Consulta tu historial, interpreta los resultados mediante equivalencias ambientales y descubre recomendaciones para reducir tu impacto.</p>
                    </article>
                </div>
            </div>
        </section>

        <section class="px-5 py-14 sm:px-8 lg:py-20">
            <div class="mx-auto max-w-7xl">
                <h2 class="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] text-[var(--ink)]">Cómo calculamos</h2>
                <p class="mt-4 max-w-[70ch] text-[17px] leading-8 text-[var(--muted)]">Para cada actividad, Huellify multiplica la cantidad que indicas por un factor de emisión asociado a su categoría, tipo de combustible o fuente de energía y unidad de medida. Después suma esos resultados por periodo y muestra el total en kilogramos de equivalente de CO<sub>2</sub> (kg CO<sub>2</sub>e). Las equivalencias ambientales convierten ese total a referencias cotidianas mediante factores de equivalencia.</p>
                <div class="mt-8 grid gap-5 md:grid-cols-3">
                    <article class="lift reveal rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <h3 class="text-[18px] font-semibold text-[var(--ink)]">Cantidad × factor</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">Cada actividad usa un factor de emisión según su categoría, unidad y tipo de energía o combustible.</p>
                    </article>
                    <article class="lift reveal reveal--1 rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <h3 class="text-[18px] font-semibold text-[var(--ink)]">Suma por periodo</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">Los resultados se agrupan en el periodo que elijas y se muestran en kg CO<sub>2</sub>e.</p>
                    </article>
                    <article class="lift reveal reveal--2 rounded-2xl border border-[var(--line)] bg-[var(--white)] p-6">
                        <h3 class="text-[18px] font-semibold text-[var(--ink)]">Equivalencias</h3>
                        <p class="mt-2 text-[16px] leading-7 text-[var(--muted)]">Los factores de equivalencia transforman el total en referencias del mundo real, como ejemplos ilustrativos.</p>
                    </article>
                </div>
                <p class="mt-6 max-w-[70ch] text-[17px] leading-8 text-[var(--muted)]"><strong>Los resultados son estimaciones:</strong> dependen de los datos que ingreses y de los factores disponibles, y no sustituyen una medición oficial, una auditoría ni la medición de una organización. <span class="todo">[POR COMPLETAR: metodología y fuentes de factores de emisión]</span></p>
            </div>
        </section>

        <section class="bg-[var(--mint-50)] px-5 py-14 sm:px-8 lg:py-20">
            <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
                <div>
                    <h2 class="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] text-[var(--ink)]">Nuestros valores</h2>
                    <ul class="mt-6 space-y-5">
                        <li class="text-[17px] leading-8 text-[var(--muted)]"><strong class="text-[var(--ink)]">Transparencia.</strong> Explicamos qué datos pides y cómo se usa la información.</li>
                        <li class="text-[17px] leading-8 text-[var(--muted)]"><strong class="text-[var(--ink)]">Privacidad.</strong> Tus actividades son tuyas; tratamos la información con cuidado.</li>
                        <li class="text-[17px] leading-8 text-[var(--muted)]"><strong class="text-[var(--ink)]">Progreso sin culpa.</strong> La meta es entender y mejorar, no juzgar.</li>
                        <li class="text-[17px] leading-8 text-[var(--muted)]"><strong class="text-[var(--ink)]">Rigor.</strong> Preferimos decir "estimación" antes que presentar un dato como exacto.</li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] text-[var(--ink)]">Qué no prometemos</h2>
                    <p class="mt-6 text-[17px] leading-8 text-[var(--muted)]">No prometemos una reducción porcentual concreta, no emitimos certificaciones ambientales, no realizamos auditorías y no sustituimos la asesoría profesional. Las cifras que ves en la plataforma son orientativas y los ejemplos son ilustrativos.</p>
                </div>
            </div>
        </section>

        <section class="px-5 py-14 sm:px-8 lg:py-20">
            <div class="mx-auto max-w-[70ch]">
                <h2 class="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] text-[var(--ink)]">Equipo e historia</h2>
                <p class="mt-4 text-[17px] leading-8 text-[var(--muted)]"><span class="todo">[POR COMPLETAR: quiénes somos y breve historia de Huellify]</span> <span class="todo">[POR COMPLETAR: enlace o datos de contacto del equipo]</span></p>
                <h2 class="mt-12 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] text-[var(--ink)]">Contacto</h2>
                <p class="mt-4 text-[17px] leading-8 text-[var(--muted)]">Para preguntas sobre el servicio: <span class="todo">[POR COMPLETAR: correo de contacto]</span></p>
            </div>
        </section>

        <section class="on-dark px-5 pb-14 sm:px-8" aria-labelledby="cta-title">
            <div class="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[var(--brand-deep)] px-6 py-12 text-center sm:px-12">
                <svg viewBox="0 0 260 200" aria-hidden="true" class="pointer-events-none absolute -left-10 -top-8 h-56 w-72 text-[var(--white)] opacity-[0.07]"><path fill="currentColor" d="M240 12C116 12 34 76 34 166c0 27 19 44 46 44 107 0 150-112 160-198Z" /></svg>
                <div class="relative">
                    <h2 id="cta-title" class="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-[var(--white)]">Tu impacto merece ser comprendido</h2>
                    <p class="mx-auto mt-4 max-w-[60ch] text-[16px] leading-7 text-[var(--white)]/80">Empieza a conocer tu huella de carbono y descubre cómo puedes construir un futuro más sostenible desde tus decisiones cotidianas.</p>
                    <a href="{{ auth()->check() ? route('dashboard.index') : route('auth.register') }}" class="btn mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--white)] px-6 text-[16px] font-semibold text-[var(--brand-deep)] hover:bg-[var(--mint-50)]">{{ auth()->check() ? 'Ir al dashboard' : 'Comenzar gratis' }} <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg></a>
                </div>
            </div>
        </section>

        <nav aria-label="Navegación entre páginas institucionales" class="px-5 pb-16 sm:px-8">
            <div class="mx-auto flex max-w-7xl flex-col gap-3 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-[15px] text-[var(--muted)]">Más información sobre Huellify</p>
                <div class="flex flex-wrap gap-3">
                    <a href="{{ route('terms') }}" class="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 text-[15px] font-medium text-[var(--brand)] hover:bg-[var(--mint-100)]">Términos y condiciones</a>
                    <a href="{{ route('privacy') }}" class="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 text-[15px] font-medium text-[var(--brand)] hover:bg-[var(--mint-100)]">Política de privacidad</a>
                </div>
            </div>
        </nav>
    </main>

    <footer class="no-print border-t border-[var(--line)] bg-[var(--white)]">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
            <div class="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8">
                <div>
                    <a href="{{ route('landing') }}" class="inline-flex min-h-11 items-center rounded-md" aria-label="Huellify, ir al inicio"><img src="{{ asset('images/logo.webp') }}" alt="Huellify" width="132" height="36" class="h-9 w-[132px] object-contain object-left" /></a>
                    <p class="mt-3 max-w-[28ch] text-[16px] leading-7 text-[var(--muted)]">Comprende tu impacto. Transforma tus hábitos.</p>
                </div>
                <div>
                    <h2 class="text-[15px] font-semibold text-[var(--ink)]">Plataforma</h2>
                    <ul class="mt-4 space-y-3">
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ route('landing') }}#como-funciona">Cómo funciona</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ route('landing') }}#about">Funcionalidades</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ auth()->check() ? route('dashboard.index') : route('auth.login') }}">{{ auth()->check() ? 'Ir al dashboard' : 'Iniciar sesión' }}</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ auth()->check() ? route('dashboard.profile') : route('auth.register') }}">{{ auth()->check() ? 'Mi perfil' : 'Crear cuenta' }}</a></li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-[15px] font-semibold text-[var(--ink)]">Información</h2>
                    <ul class="mt-4 space-y-3">
                        <li><a class="inline-flex min-h-11 items-center text-[16px] font-medium text-[var(--brand)]" href="{{ route('about') }}" aria-current="page">Sobre Huellify</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ route('terms') }}">Términos y condiciones</a></li>
                        <li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] transition-colors hover:text-[var(--brand)]" href="{{ route('privacy') }}">Política de privacidad</a></li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-[15px] font-semibold text-[var(--ink)]">Síguenos</h2>
                    <ul class="mt-4 flex items-center gap-2">
                        <li><a href="#" rel="noopener noreferrer" aria-label="YouTube" class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" /></svg></a></li>
                        <li><a href="#" rel="noopener noreferrer" aria-label="X" class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg></a></li>
                        <li><a href="#" rel="noopener noreferrer" aria-label="Instagram" class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg></a></li>
                        <li><a href="#" rel="noopener noreferrer" aria-label="LinkedIn" class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10.5V17M8 7.5v.2M12 17v-4a2 2 0 0 1 4 0v4" /></svg></a></li>
                    </ul>
                </div>
            </div>
            <div class="flex items-center justify-between gap-4 border-t border-[var(--line)] py-6">
                <p class="text-[14px] text-[var(--muted)]">© {{ date('Y') }} Huellify. Todos los derechos reservados.</p>
                <svg viewBox="0 0 24 24" class="h-5 w-5 shrink-0 text-[var(--brand)]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 4c-8.5 0-14 3.5-14 9.5A5.5 5.5 0 0 0 11.5 19C18 19 20 12 20 4Z" /></svg>
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

            function updateHeader() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
            updateHeader();
            window.addEventListener('scroll', updateHeader, { passive: true });

            function openMenu() {
                if (!menu || !toggle) return;
                menu.hidden = false;
                toggle.setAttribute('aria-expanded', 'true');
                toggle.setAttribute('aria-label', 'Cerrar menú');
                var first = menu.querySelector('a');
                if (first) first.focus();
            }
            function closeMenu(returnFocus) {
                if (!menu || !toggle) return;
                menu.hidden = true;
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Abrir menú');
                if (returnFocus) toggle.focus();
            }
            if (toggle && menu) {
                toggle.addEventListener('click', function () { menu.hidden ? openMenu() : closeMenu(false); });
                menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(false); });
                document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) closeMenu(true); });
                document.addEventListener('click', function (e) { if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu(false); });
                window.addEventListener('resize', function () { if (!mobileQuery.matches && !menu.hidden) closeMenu(false); });
            }

            var items = document.querySelectorAll('.reveal');
            function showAll() { items.forEach(function (el) { el.classList.add('is-visible'); }); }
            if (!('IntersectionObserver' in window) || reduceMotion.matches) {
                showAll();
            } else {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
                    });
                }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
                items.forEach(function (el) { observer.observe(el); });
            }
        })();
    </script>
@endsection
