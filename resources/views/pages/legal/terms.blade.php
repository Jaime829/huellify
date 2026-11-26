@extends('layouts.base')

@section('content')
    <style>
        :root {
            --brand: #0F5132; --brand-deep: #0A3D29; --accent: #0E9F6E; --accent-ink: #0A7A55;
            --mint-50: #F4FAF6; --mint-100: #E7F4EB; --mint-200: #D3EBDC;
            --ink: #14231B; --muted: #4A5B50; --line: #DDE8E0; --white: #FFFFFF;
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
        #site-header.is-scrolled { border-bottom-color: var(--line); background-color: rgba(255,255,255,.96); box-shadow: 0 1px 14px -8px rgba(15,81,50,.24); }
        .btn { transition: transform 160ms var(--ease-out), background-color 160ms ease; }
        .btn:active { transform: scale(0.97); }
        @media (hover: hover) and (pointer: fine) { .btn:hover { transform: translateY(-1px); } }

        .toc-link { display: block; min-height: 44px; padding: 8px 12px; border-left: 2px solid transparent; color: var(--muted); font-size: 14px; line-height: 1.5; transition: color 150ms ease, background-color 150ms ease; }
        .toc-link:hover { color: var(--brand); background: var(--mint-50); }
        .toc-link.is-active { border-left-color: var(--brand); background: var(--mint-50); color: var(--brand); font-weight: 600; }
        .todo { padding: 2px 7px; border: 1px dashed #B45309; border-radius: 6px; background: #FFFBEB; color: #7C2D12; font-weight: 600; }
        .prose p { font-size: 17px; line-height: 1.9; color: var(--muted); }
        .prose p + p { margin-top: 1rem; }
        .prose h2 { font-size: clamp(1.35rem, 2.4vw, 1.65rem); font-weight: 600; letter-spacing: -0.02em; color: var(--ink); }
        .prose section + section { margin-top: 2.25rem; padding-top: 2.25rem; border-top: 1px solid var(--line); }
        .prose ol { margin-top: 1rem; padding-left: 1.25rem; list-style: decimal; }
        .prose li { font-size: 17px; line-height: 1.9; color: var(--muted); margin-top: .5rem; }

        main h1 { font-size: clamp(2rem, 4.6vw, 3rem); line-height: 1.1; letter-spacing: -0.03em; font-weight: 600; color: var(--ink); }
        main div[class*="max-w-[65ch]"] { max-width: 65ch; }
        main > div.grid { display: grid; gap: 2.5rem; }
        main > div.grid > article { min-width: 0; max-width: 75ch; }
        main > div.grid aside details { border: 1px solid var(--line); border-radius: 16px; background: var(--white); }
        main > div.grid aside details > nav { border-top: 1px solid var(--line); padding-bottom: 12px; }
        main > div.grid aside > nav { display: none; }
        @media (min-width: 1024px) {
            main > div.grid { grid-template-columns: 260px minmax(0, 1fr); gap: 3.5rem; }
            main > div.grid aside details { display: none; }
            main > div.grid aside > nav {
                display: block; position: sticky; top: 6rem; padding: 12px;
                border: 1px solid var(--line); border-radius: 16px; background: var(--white);
            }
        }

        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .btn { transition: none; } .btn:active { transform: none; } }
        @media print {
            .no-print { display: none !important; }
            body, main, section, div, article, aside { background: #fff !important; color: #000 !important; box-shadow: none !important; }
            main { padding-top: 0 !important; }
            main > div.grid { display: block !important; }
            main > div.grid > article { max-width: none !important; width: 100% !important; }
            .prose section + section { border-top-color: #ccc; }
            .prose p, .prose li { color: #000 !important; font-size: 11pt; }
            a { color: #000 !important; text-decoration: underline; }
            .todo { border: 1px solid #666 !important; background: #fff !important; color: #000 !important; }
            section { break-inside: avoid; }
        }
    </style>

    <a href="#contenido" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--brand-deep)] focus:px-5 focus:py-3 focus:text-[15px] focus:font-medium focus:text-[var(--white)]">Saltar al contenido</a>

    <header id="site-header" class="no-print fixed inset-x-0 top-0 z-50 border-b border-transparent bg-[var(--white)]/80 backdrop-blur-xl">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
            <a href="{{ route('landing') }}" class="flex min-h-11 items-center rounded-md" aria-label="Huellify, ir al inicio"><img src="{{ asset('images/logo.webp') }}" alt="Huellify" width="132" height="36" class="h-9 w-[132px] object-contain object-left" /></a>
            <nav aria-label="Navegación principal" class="hidden items-center gap-1 md:flex">
                <a href="{{ route('landing') }}" class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Inicio</a>
                <a href="{{ route('landing') }}#como-funciona" class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Cómo funciona</a>
                <a href="{{ route('landing') }}#beneficios" class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Beneficios</a>
                <a href="{{ route('about') }}" class="inline-flex min-h-11 items-center rounded-full px-3 text-[15px] text-[var(--muted)] transition-colors hover:bg-[var(--mint-100)] hover:text-[var(--brand)]">Sobre Huellify</a>
            </nav>
            <div class="hidden items-center gap-2 md:flex">
                @auth
                    <a href="{{ route('dashboard.index') }}" class="btn inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-deep)] px-5 text-[14px] font-medium text-[var(--white)] hover:bg-[var(--brand)]"><span>Ir al dashboard</span><svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg></a>
                @else
                    <a href="{{ route('auth.login') }}" class="inline-flex min-h-11 items-center rounded-full px-4 text-[14px] font-medium text-[var(--brand)] transition-colors hover:bg-[var(--mint-100)]">Iniciar sesión</a>
                    <a href="{{ route('auth.register') }}" class="btn inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-deep)] px-5 text-[14px] font-medium text-[var(--white)] hover:bg-[var(--brand)]"><span>Comenzar gratis</span><svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg></a>
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
                <a href="{{ route('about') }}" class="flex min-h-[44px] items-center text-[16px] text-[var(--muted)]">Sobre Huellify</a>
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
        <section class="border-b border-[var(--line)] bg-[var(--mint-50)] px-5 py-12 sm:px-8 lg:py-16">
            <div class="mx-auto max-w-7xl">
                <h1 class="text-[clamp(2rem,4.6vw,3rem)] font-semibold leading-tight tracking-[-0.03em] text-[var(--ink)]">Términos y condiciones</h1>
                <p class="mt-4 max-w-[65ch] text-[17px] leading-8 text-[var(--muted)]">Condiciones de uso de Huellify. Versión 1.0 (borrador) · Última actualización: <span class="todo">[POR COMPLETAR: fecha]</span></p>
                <div class="mt-6 rounded-2xl border border-[#FCD34D] bg-[#FFFBEB] p-5 text-[15px] leading-7 text-[#7C2D12]"><strong>Aviso legal.</strong> Este documento es un borrador redactado de buena fe y no constituye asesoría legal. Debe ser revisado por un abogado antes de publicarse.</div>
            </div>
        </section>

        <div class="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14 lg:py-16">
            <aside class="no-print">
                <details class="rounded-2xl border border-[var(--line)] bg-[var(--white)] lg:hidden">
                    <summary class="flex min-h-[44px] cursor-pointer items-center justify-between px-4 py-3 text-[15px] font-semibold text-[var(--ink)]">Índice de contenidos <span aria-hidden="true">⌄</span></summary>
                    <nav aria-label="Índice de contenidos móvil" class="border-t border-[var(--line)] pb-3">
                        <a class="toc-link" href="#s1">1. Aceptación y alcance</a><a class="toc-link" href="#s2">2. Definiciones</a><a class="toc-link" href="#s3">3. Descripción del servicio</a><a class="toc-link" href="#s4">4. Elegibilidad</a><a class="toc-link" href="#s5">5. Registro y seguridad</a><a class="toc-link" href="#s6">6. Uso aceptable</a><a class="toc-link" href="#s7">7. Naturaleza estimativa</a><a class="toc-link" href="#s8">8. Contenido del usuario</a><a class="toc-link" href="#s9">9. Propiedad intelectual</a><a class="toc-link" href="#s10">10. Disponibilidad y cambios</a><a class="toc-link" href="#s11">11. Servicios de terceros</a><a class="toc-link" href="#s12">12. Limitación de responsabilidad</a><a class="toc-link" href="#s13">13. Suspensión y terminación</a><a class="toc-link" href="#s14">14. Modificaciones</a><a class="toc-link" href="#s15">15. Ley y controversias</a><a class="toc-link" href="#s16">16. Contacto</a>
                    </nav>
                </details>
                <nav aria-label="Índice de contenidos" class="sticky top-24 hidden rounded-2xl border border-[var(--line)] bg-[var(--white)] p-3 lg:block">
                    <p class="px-3 py-2 text-[13px] font-semibold uppercase tracking-wide text-[var(--muted)]">Índice</p>
                    <a class="toc-link" href="#s1">1. Aceptación y alcance</a><a class="toc-link" href="#s2">2. Definiciones</a><a class="toc-link" href="#s3">3. Descripción del servicio</a><a class="toc-link" href="#s4">4. Elegibilidad</a><a class="toc-link" href="#s5">5. Registro y seguridad</a><a class="toc-link" href="#s6">6. Uso aceptable</a><a class="toc-link" href="#s7">7. Naturaleza estimativa</a><a class="toc-link" href="#s8">8. Contenido del usuario</a><a class="toc-link" href="#s9">9. Propiedad intelectual</a><a class="toc-link" href="#s10">10. Disponibilidad y cambios</a><a class="toc-link" href="#s11">11. Servicios de terceros</a><a class="toc-link" href="#s12">12. Limitación de responsabilidad</a><a class="toc-link" href="#s13">13. Suspensión y terminación</a><a class="toc-link" href="#s14">14. Modificaciones</a><a class="toc-link" href="#s15">15. Ley y controversias</a><a class="toc-link" href="#s16">16. Contacto</a>
                </nav>
            </aside>

            <article class="prose min-w-0 max-w-[75ch]">
                <section id="s1"><h2>1. Aceptación y alcance</h2><p>Al crear una cuenta o usar Huellify aceptas estos términos. Si no estás de acuerdo, no uses el servicio. Estos términos se aplican al sitio web y a las funciones disponibles en tu cuenta.</p></section>
                <section id="s2"><h2>2. Definiciones</h2><p><strong>Servicio:</strong> Huellify y sus funciones de registro, cálculo, historial, equivalencias, recomendaciones y seguimiento de hábitos. <strong>Usuario:</strong> persona que crea una cuenta. <strong>Contenido:</strong> los datos y textos que introduces. <strong>Estimación:</strong> resultado calculado a partir de factores de emisión, no una medición oficial.</p></section>
                <section id="s3"><h2>3. Descripción del servicio</h2><p>Huellify permite registrar actividades de transporte y energía, calcular una huella estimada en kg CO<sub>2</sub>e, consultar periodos e historial, ver equivalencias ambientales, recibir recomendaciones y llevar un registro de hábitos.</p></section>
                <section id="s4"><h2>4. Elegibilidad</h2><p>El servicio está dirigido a personas <span class="todo">[POR COMPLETAR: edad mínima, p. ej. mayores de 18 años]</span>. Al registrarte confirmas que cumples esa condición y que la información que das es tuya y correcta.</p></section>
                <section id="s5"><h2>5. Registro, cuenta y seguridad</h2><p>El registro solicita nombre, correo electrónico y contraseña. Eres responsable de mantener tu contraseña en secreto y de las acciones realizadas desde tu cuenta. Si detectas un uso no autorizado, avísanos por <span class="todo">[POR COMPLETAR: canal de contacto]</span>.</p></section>
                <section id="s6"><h2>6. Uso aceptable y conductas prohibidas</h2><p>Usa el servicio solo para fines personales legítimos. No intentes acceder a cuentas ajenas, introducir código malicioso, sobrecargar el sistema, copiar el servicio ni usar los datos de otros usuarios sin autorización.</p></section>
                <section id="s7"><h2>7. Naturaleza estimativa de los cálculos</h2><p>Los resultados, equivalencias y recomendaciones son <strong>informativos</strong>. No constituyen certificación ambiental, auditoría, reporte oficial ni asesoría profesional, y no sustituyen mediciones oficiales. Su precisión depende de los datos que ingreses y de los factores disponibles. <span class="todo">[POR COMPLETAR: metodología y fuentes de factores de emisión]</span></p></section>
                <section id="s8"><h2>8. Contenido y datos que ingresas</h2><p>Conservas tus derechos sobre el contenido que introduces. Nos otorgas una licencia limitada y no exclusiva para almacenarlo y procesarlo únicamente con el fin de operar el servicio y mostrarte tus resultados. No usamos ese contenido para otros fines sin tu autorización, salvo lo previsto en la política de privacidad.</p></section>
                <section id="s9"><h2>9. Propiedad intelectual de Huellify</h2><p>El diseño, los textos, los gráficos y el código del servicio son propiedad de Huellify o de sus licenciantes. No puedes copiarlos, modificarlos ni distribuirlos sin permiso.</p></section>
                <section id="s10"><h2>10. Disponibilidad, cambios y mantenimiento</h2><p>Podemos realizar mantenimientos o cambios en las funciones. No garantizamos disponibilidad ininterrumpida. Los cambios que afecten de forma importante el uso del servicio se comunicarán por <span class="todo">[POR COMPLETAR: canal de aviso]</span>.</p></section>
                <section id="s11"><h2>11. Enlaces y servicios de terceros</h2><p>El sitio puede cargar recursos de terceros (por ejemplo, tipografías). No controlamos sus prácticas. <span class="todo">[POR COMPLETAR: proveedores y servicios de terceros]</span></p></section>
                <section id="s12"><h2>12. Limitación de responsabilidad</h2><p>Huellify ofrece el servicio "tal cual", dentro de lo permitido por la ley. No somos responsables de daños derivados del uso de estimaciones para decisiones oficiales o contractuales. Nada en estos términos excluye la responsabilidad que la ley no permite excluir.</p></section>
                <section id="s13"><h2>13. Suspensión, terminación y eliminación de datos</h2><p>Puedes dejar de usar el servicio cuando quieras. Podemos suspender cuentas que incumplan estos términos. Para solicitar la eliminación de tu cuenta y datos: <span class="todo">[POR COMPLETAR: canal y condiciones de eliminación]</span>.</p></section>
                <section id="s14"><h2>14. Modificaciones de los términos</h2><p>Podemos actualizar estos términos. La versión vigente se publicará en esta página con su fecha de actualización; los cambios importantes se avisarán por <span class="todo">[POR COMPLETAR: canal de notificación]</span>.</p></section>
                <section id="s15"><h2>15. Ley aplicable y controversias</h2><p>Estos términos se rigen por <span class="todo">[POR COMPLETAR: país/jurisdicción]</span>. Las controversias se atenderán por <span class="todo">[POR COMPLETAR: mecanismo y fuero]</span>.</p></section>
                <section id="s16"><h2>16. Contacto</h2><p><span class="todo">[POR COMPLETAR: razón social, NIT, domicilio, correo y teléfono]</span></p></section>

                <div class="no-print mt-12 flex flex-col gap-3 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <a href="#contenido" class="inline-flex min-h-11 items-center text-[15px] font-medium text-[var(--brand)]">Volver arriba ↑</a>
                    <div class="flex flex-wrap gap-3">
                        <a href="{{ route('about') }}" class="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 text-[15px] font-medium text-[var(--brand)] hover:bg-[var(--mint-100)]">Acerca de Huellify</a>
                        <a href="{{ route('privacy') }}" class="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 text-[15px] font-medium text-[var(--brand)] hover:bg-[var(--mint-100)]">Política de privacidad</a>
                    </div>
                </div>
            </article>
        </div>
    </main>

    <footer class="no-print border-t border-[var(--line)] bg-[var(--white)]">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
            <div class="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8">
                <div><a href="{{ route('landing') }}" class="inline-flex min-h-11 items-center rounded-md" aria-label="Huellify, ir al inicio"><img src="{{ asset('images/logo.webp') }}" alt="Huellify" width="132" height="36" class="h-9 w-[132px] object-contain object-left" /></a><p class="mt-3 max-w-[28ch] text-[16px] leading-7 text-[var(--muted)]">Comprende tu impacto. Transforma tus hábitos.</p></div>
                <div><h2 class="text-[15px] font-semibold text-[var(--ink)]">Plataforma</h2><ul class="mt-4 space-y-3"><li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] hover:text-[var(--brand)]" href="{{ route('landing') }}#como-funciona">Cómo funciona</a></li><li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] hover:text-[var(--brand)]" href="{{ route('landing') }}#about">Funcionalidades</a></li><li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] hover:text-[var(--brand)]" href="{{ auth()->check() ? route('dashboard.index') : route('auth.login') }}">{{ auth()->check() ? 'Ir al dashboard' : 'Iniciar sesión' }}</a></li><li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] hover:text-[var(--brand)]" href="{{ auth()->check() ? route('dashboard.profile') : route('auth.register') }}">{{ auth()->check() ? 'Mi perfil' : 'Crear cuenta' }}</a></li></ul></div>
                <div><h2 class="text-[15px] font-semibold text-[var(--ink)]">Información</h2><ul class="mt-4 space-y-3"><li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] hover:text-[var(--brand)]" href="{{ route('about') }}">Sobre Huellify</a></li><li><a class="inline-flex min-h-11 items-center text-[16px] font-medium text-[var(--brand)]" href="{{ route('terms') }}" aria-current="page">Términos y condiciones</a></li><li><a class="inline-flex min-h-11 items-center text-[16px] text-[var(--muted)] hover:text-[var(--brand)]" href="{{ route('privacy') }}">Política de privacidad</a></li></ul></div>
                <div><h2 class="text-[15px] font-semibold text-[var(--ink)]">Síguenos</h2><ul class="mt-4 flex items-center gap-2"><li><a href="#" rel="noopener noreferrer" aria-label="YouTube" class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand)]"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" /></svg></a></li><li><a href="#" rel="noopener noreferrer" aria-label="X" class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand)]"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg></a></li><li><a href="#" rel="noopener noreferrer" aria-label="Instagram" class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand)]"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg></a></li><li><a href="#" rel="noopener noreferrer" aria-label="LinkedIn" class="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand)]"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10.5V17M8 7.5v.2M12 17v-4a2 2 0 0 1 4 0v4" /></svg></a></li></ul></div>
            </div>
            <div class="flex items-center justify-between gap-4 border-t border-[var(--line)] py-6"><p class="text-[14px] text-[var(--muted)]">© {{ date('Y') }} Huellify. Todos los derechos reservados.</p><svg viewBox="0 0 24 24" class="h-5 w-5 shrink-0 text-[var(--brand)]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 4c-8.5 0-14 3.5-14 9.5A5.5 5.5 0 0 0 11.5 19C18 19 20 12 20 4Z" /></svg></div>
        </div>
    </footer>

    <script>
        (function () {
            var header = document.getElementById('site-header');
            var toggle = document.getElementById('menu-toggle');
            var menu = document.getElementById('mobile-menu');
            var mobileQuery = window.matchMedia('(max-width: 767px)');
            function updateHeader() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
            updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });
            function openMenu() { if (!menu || !toggle) return; menu.hidden = false; toggle.setAttribute('aria-expanded','true'); toggle.setAttribute('aria-label','Cerrar menú'); var f=menu.querySelector('a'); if(f) f.focus(); }
            function closeMenu(r) { if (!menu || !toggle) return; menu.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Abrir menú'); if(r) toggle.focus(); }
            if (toggle && menu) {
                toggle.addEventListener('click', function(){ menu.hidden ? openMenu() : closeMenu(false); });
                menu.addEventListener('click', function(e){ if(e.target.closest('a')) closeMenu(false); });
                document.addEventListener('keydown', function(e){ if(e.key==='Escape' && !menu.hidden) closeMenu(true); });
                document.addEventListener('click', function(e){ if(!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu(false); });
                window.addEventListener('resize', function(){ if(!mobileQuery.matches && !menu.hidden) closeMenu(false); });
            }
            var links = document.querySelectorAll('.toc-link');
            var sections = [].slice.call(document.querySelectorAll('article.prose section[id]'));
            if ('IntersectionObserver' in window) {
                var io = new IntersectionObserver(function(entries){
                    entries.forEach(function(en){
                        if (!en.isIntersecting) return;
                        links.forEach(function(a){ a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
                    });
                }, { rootMargin: '-100px 0px -70% 0px', threshold: 0 });
                sections.forEach(function(s){ io.observe(s); });
            }
        })();
    </script>
@endsection
