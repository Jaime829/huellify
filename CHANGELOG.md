# Changelog

Todos los cambios notables del proyecto se documentan en este archivo.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Unreleased] — Mejoras de adaptación responsive

### Added
- Navegación hamburguesa con drawer para móvil en el panel de usuario (`MobileNav`) y en el panel administrativo (`AdminMobileNav`): mismos enlaces, mismos `<Link>` de Inertia y misma sesión que el sidebar de escritorio. Accesible con teclado (Escape cierra, foco atrapado y devuelto al botón, `aria-expanded`/`aria-controls`).
- `docs/responsive.md`: breakpoints, patrones (navegación, tablas, modales, formularios), guía para crear páginas responsive y limitaciones conocidas.
- `docs/responsive/auditoria.md`: auditoría priorizada de problemas encontrados (críticos → bajos) con archivo y componente afectado.

### Changed
- Todas las páginas ya no usan la barra inferior móvil (`MobileBar`); en móvil la navegación vive en el drawer hamburguesa. El botón ☰ aparece solo en pantallas < `md`; el sidebar de escritorio y el panel admin no cambian en ≥ `md`.
- Grids de KPIs y tarjetas reapilados en móvil: 1 columna (base) → 2 (sm) → 3–4 (md/lg). Escritorio sin cambios.
- Tablas: scroll horizontal interno asegurado con `min-width`; paginaciones con wrap y área táctil de 44 px en móvil.
- Modales: `DialogContent` con `max-h-[90dvh] overflow-y-auto` y botón de cierre de 44 px en móvil.
- Formularios: campos a una columna en móvil, inputs a 16 px (evita el zoom de iOS), `autocomplete`/`inputmode`/`for=` en auth.
- Toasts de notificación dentro del viewport en móvil.
- `h-screen` → `h-dvh` para evitar recortes en móviles con barra de navegador.
- Landing y layout de autenticación adaptables (apilado vertical en móvil).

### Fixed
- Barra móvil fija con enlaces muertos (`#`) sustituida por enlaces reales accesibles desde el drawer.
- Desborde horizontal en 320–768 px en dashboard, perfil, hábitos, historial, actividades, recomendaciones, panel admin, toasts y modales.
- `col-start`/`row-start` con posicionamiento fijo del grid del dashboard y del perfil que rompían el layout en móvil.

### Notes
- Sin cambios en lógica, backend, rutas, tema de Tailwind, dependencias ni pruebas existentes (verificado con `git diff`).
- Escritorio (≥1024 px) visualmente idéntico al original.
