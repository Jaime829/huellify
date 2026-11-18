# Responsive — Huellify

Adaptación de Huellify (Laravel + Inertia + React + Tailwind v4) a móvil, tablet y escritorio.
Objetivo: ninguna página con scroll horizontal entre 320 y 1920 px, y escritorio (≥ lg, 1024 px) idéntico al diseño original.

## Breakpoints (Tailwind estándar, no se añadió ninguno nuevo)

| Token | Ancho | Uso previsto |
|---|---|---|
| (base) | 0–639 px | Móvil vertical. Aqui viven las clases sin prefijo: **cuidado**, afectan a todos los anchos |
| sm | ≥ 640 px | Móvil grande / phablet |
| md | ≥ 768 px | Tablet vertical. Punto desde el que aparece el sidebar desktop (`md:flex`) |
| lg | ≥ 1024 px | Tablet horizontal / escritorio pequeño |
| xl | ≥ 1280 px | Escritorio (por defecto sin cambios) |
| 2xl | ≥ 1536 px | Escritorio grande |

Regla seguida: el valor original sin prefijo se conserva bajo su breakpoint de escritorio (p.ej. `flex-col sm:flex-row`), de modo que desde `md`/`lg` hacia arriba nada cambia.

## Patrones usados

### Navegación global
- **Sidebar → drawer.** `AsideNav` (escritorio) se oculta bajo `md`; en su lugar, `MobileNav` renderiza un botón hamburguesa (`md:hidden`) en el encabezado y un drawer lateral a pantalla completa (`h-dvh`, `max-w-[85vw]`, `safe-area-inset`). Mismos enlaces, mismos `<Link>` de Inertia, mismos iconos y misma lógica de sesión que en escritorio.
  - `aria-expanded`, `aria-controls="mobile-nav-drawer"`, `role="dialog"`, `aria-modal="true"`, `aria-label`.
  - Cierra con: botón ✕, clic en el overlay, tecla **Escape** y automáticamente al navegar (`router.on('navigate', ...)`).
  - Foco atrapado dentro del drawer (Tab / Shift+Tab ciclan), foco devuelto al botón al cerrar, `body overflow: hidden` mientras está abierto.
- **Admin:** `AdminMobileNav` hace lo mismo para `/admin` (logo, enlaces de admin, "Volver a la plataforma" y el mismo `<form>` de logout con `router.post(route('auth.logout'))`).
- **Barra inferior móvil (`MobileBar`):** se deja de usar en las páginas (reemplazada por la hamburguesa) porque 3 de sus 5 enlaces eran destinos muertos (`"#"`). El componente se conserva en el repo sin importarse.
- Encabezado autenticado: `HeaderDashboard` — hamburguesa + logo (solo <md), buscador (solo ≥sm), acciones. Sticky top con `pt-[max(0.5rem,env(safe-area-inset-top))]`.
- `NotificationBtn` sin función se conserva; se añadió área táctil mínima en móvil (`min-h-11` al abrir el drawer y en el cierre de toasts).

### Tablas y listados
- `components/ui/table.jsx` ya trae `overflow-x-auto` en la raíz: las tablas anchas hacen scroll horizontal interno.
- Filas de segmentos propios de tabla (p.ej. `LatestActivities`): se fuerza `min-w-[36rem]` para que el scroll sea útil y legible en 320 px.
- Paginaciones de Inertia (`links.map`): siempre `flex flex-wrap` y botones con `min-h-11 min-w-11 sm:min-w-0` (44 px de área táctil en móvil, 40 px en desktop).
- Celdas con texto potencialmente larguísimo (correos, nombres): `break-all`/`break-words`.

### Modales
- `DialogContent` (radix/shadcn) ahora con `max-h-[90dvh] overflow-y-auto` → los modales nunca exceden el viewport; en móvil son casi a pantalla completa (`max-w-[calc(100%-2rem)]` ya existía).
- Botón de cierre con área táctil `min-h-11 min-w-11` en <sm.
- Grids internos de modales: `grid-cols-1 sm:grid-cols-2`; contenedores `w-fit` → `w-full sm:w-fit`.

### Formularios (useForm de Inertia)
- Filas de campos `w-1/2`/`w-1/3` → `flex-col sm:flex-row` + `w-full sm:w-1/2`.
- Inputs/select/textarea con texto <16 px → `text-base sm:text-…` (16 px en móvil para evitar el zoom de iOS; desktop sin cambio).
- `autocomplete`/`inputmode` en los formularios Blade de auth (`email`, `current-password`, `new-password`, `name`), labels con `for=` correctos — sin tocar validaciones ni `old()`.
- Vistas Blade de auth (`layouts/auth.blade.php`): `min-h-dvh`, columnas que se apilan en móvil (`flex-col`), `px-6 sm:px-16 lg:px-25`, toasts de error con `left-2 right-2`, `max-w-full sm:max-w-46`. Imagen lateral `h-56` en móvil.

### Grillas y tarjetas
- KPIs dashboard: `grid-cols-1 sm:grid-cols-2 md:grid-cols-4` (antes `grid-cols-3 md:grid-cols-4`); `col-span` ajustados por breakpoint (`col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2`, etc.).
- Perfil: `grid-cols-1 md:grid-cols-5` (antes `grid-cols-3 md:grid-cols-5`); `QuickActions` sin `col-start` fijo en base.
- Historial / mostrar período: equivalencias `flex-col md:flex-row`, cabecera `flex-col sm:flex-row`, bloque categorías `flex-col lg:flex-row`.
- Admin (KPIs, factores, métricas): `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3|xl:grid-cols-4`, cabeceras `flex-col sm:flex-row ... gap-3`, filtros `flex-wrap`.

### Gráficos
- `recharts` `ResponsiveContainer width="100%"` ya escala; se ajustan los `col-span` del grid para que el contenedor no exceda el ancho.
- `chart.js` doughnut: contenedor `flex-col sm:flex-row` y leyenda `w-full sm:w-[50%]`.

### Otros
- Toasts (`ToastMessage`, `ErrorsList` es el de auth-create): `fixed left-2 right-2 sm:left-auto sm:right-8`, `w-full sm:w-64`, cierre con `p-2` (área táctil).
- `h-screen`/`min-h-screen` → `h-dvh`/`min-h-dvh` (100dvh; desktop equivalente).
- `pb-24` (reservado a la barra inferior eliminada) → `pb-6`.
- Área táctil mínima 44×44 px en móvil para chips de filtro y paginaciones (`min-h-11`, `inline-flex items-center`).
- `100dvh` + `env(safe-area-inset-*)` en headers y drawers (sin `viewport-fit=cover` aún en meta; ver limitaciones).

## Cómo hacer una página nueva responsive

1. Envuelve el contenido: `flex flex-col` en móvil; `md:flex-row`/grid si el diseño de escritorio lo exige.
2. Si es grid: define base 1 columna (`grid-cols-1`), luego `sm:`/`md:`/`lg:` para densificar. Nunca coloques `col-start` fijo en la base.
3. Textos largos (nombres, correos, URLs): `break-words` o `break-all`.
4. Tablas: `overflow-x-auto` en el contenedor o `min-w-[36rem]` dentro de un `overflow-x-auto`.
5. Landmarks interactivos ≥44×44 px en móvil (`min-h-11 min-w-11`), revertir con `sm:min-h-0` en desktop.
6. Modales: usa `DialogContent` (ya tiene `max-h-[90dvh] overflow-y-auto`); no le des anchos fijos > viewport.
7. Verifica ningún `overflow-x` en la página: `document.documentElement.scrollWidth > innerWidth` en 320, 360, 390, 768 px.
8. Revisa con teclado: Tab visible, Escape cierra drawers/modales.

## Verificación

- Capturas antes/después en 8 anchos (320…1920) por página, en `docs/responsive/antes|despues/`.
- `npm run build` y `php artisan test --compact` deben seguir verdes.
- Escritorio (≥1024 px) debe verse idéntico: comparar capturas `antes/…-1024|1280|1440|1920.png` con `despues/`. La única desviación aceptada es la landing en 1024–1440 px: antes tenía scroll horizontal (defecto) y ahora no — la composición visual se mantiene.

## Limitaciones conocidas

- Enlaces muertos preexistentes (`href="#"`): `MobileBar` (eliminada de las páginas), `CategoriaMasImpacto`, `RecomendacionesDestacadas`, `PeriodoCard`. No se cambiaron destinos por alcance (no tocar lógica de navegación).
- `AdminMain`: "Gestionar factores" es un `<Link>` sin `href`.
- `TortaPeriod` usa clases dinámicas (`w-${size*2}`) que Tailwind no genera → la torta no tiene ancho fijo garantizado; queda a resolución natural (no modificado por alcance/visual).
- `viewport-fit=cover` no está en `<meta name="viewport">`: `env(safe-area-inset-*)` solo hace efecto con él y/o en PWAs. Sin la meta, los insets son 0 (comportamiento seguro actual).
- `Console.log` de depuración en `RecommendationsMetricsMain.jsx` (no son nuestros; dejamos el código como está).
- Sin pruebas frontend en el repo: solo `php artisan test` (Pest).
- Verificación en emulación de Playwright (Chromium), no en dispositivo físico; Safari iOS real puede mostrar comportamientos menores distintos (zoom de inputs, dvh).
- `break-ui` completo (datos extremos) solo parcialmente aplicado por alcance de datos; se documentan casos en auditoria.md.
