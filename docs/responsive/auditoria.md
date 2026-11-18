# Auditoría responsive — Huellify (ANTES de los cambios)

> Estado: completo con evidencia de capturas `docs/responsive/antes/` y `overflow-report.json`.
>
> Anchos evaluados: 320, 360, 390, 768, 1024, 1280, 1440, 1920 px.
> Método: revisión de código (layouts, componentes compartidos, páginas Inertia y vistas Blade) + capturas full-page por página y ancho.

## Páginas con scroll horizontal antes (overflow-report.json)

| Índice | Resultado |
|---|---|
| Landing | **320, 360, 390, 768, 1024, 1280, 1440** (¡aun en escritorio!) |
| Dashboard | 320, 360, 390 |
| Activities | 320, 360, 390, 768, 1024 |
| Activities create | 320, 360, 390, 768 |
| My habits | 320, 360, 390 |
| Habits explore | 320, 360, 390, 768 |
| My habit show | 320, 360, 390, 768 |
| My habit logs | 320, 360, 390, 768 |
| History | 320, 360, 390 |
| History period | 320, 360, 390, 768 |
| Recommendations | 320, 360, 390, 768 |
| Profile | 320, 360, 390 |
| Admin | 320, 360, 390, 768, 1024 |
| Admin emission factors | 320, 360, 390, 768, 1024, 1280 |
| Admin emission factor show | 320, 360, 390 |
| Admin recommendations metrics | 320, 360, 390, 768, 1024 |

Total: **67 de 168 capturas** con scroll horizontal. Ninguna ≥1920 px.


## Resumen por criticidad

### Críticas (rompen la página en móvil)

| # | Página / componente | Problema | Archivo |
|---|---|---|---|
| C1 | Dashboard (`/dashboard`) | Grid de KPIs `grid-cols-3` en <md: tarjetas recortadas, texto ilegible y superposición con la barra inferior fija. `GraficoEmisiones col-span-3`, `BienvenidaCard col-span-3`, `CardTorta col-span-2`, `UltimosPeriodos col-span-3` colocados para rejilla de 4 columnas → desbordan en 1–3 columnas. `CategoriaMasImpacto` y `RecomendacionesDestacadas` tienen `col-start-3/row-start-*` fijos → desbordan horizontalmente en móvil. | `components/dashboard/DashboardContent.jsx`, `GraficoEmisiones.jsx`, `BienvenidaCard.jsx`, `CardTorta.jsx`, `UltimosPeriodos.jsx`, `CategoriaMasImpacto.jsx`, `RecomendacionesDestacadas.jsx` |
| C2 | Panel admin (todas las vistas de `/admin`) | `AdminAside` siempre visible con `max-w-72`: en móvil ocupa ~70% del ancho, el contenido queda aplastado e ilegible. Sin alternativa de navegación en <md. | `components/admin/AdminAside.jsx`, `Pages/Admin/*.jsx` |
| C3 | Navegación móvil global | `MobileBar` (barra inferior fija) con enlaces muertos (`url="#"` para Historial, Recomendaciones y Perfil). Los enlaces reales de Historia/Recomendaciones/Perfil no son accesibles desde la barra. | `components/MobileBar.jsx` |
| C4 | Toasts de notificación | Fijos `right-8` con `w-64` y sin margen izquierdo: en 320–360 px se salen/rozan el borde; botón cerrar sin área táctil mínima. | `components/ToastMessage.jsx`, `components/activities/create/ErrorsList.jsx` |
| C5 | Barra fija de encabezado + `h-screen`/`w-screen` | `h-screen` en móvil incluye la zona de la barra del navegador → contenido cortado; `w-screen` fuerza ancho mayor al viewport con barras de desplazamiento. (verificación fina en capturas) | `Pages/*.jsx` (min-h-screen), `layouts/auth.blade.php`, `AdminAside`, `AsideNav` |

### Altas

| # | Página / componente | Problema | Archivo |
|---|---|---|---|
| A1 | Perfil (`/dashboard/profile`) | `grid-cols-3` con `col-span-*` pensado para 5 columnas (`md:grid-cols-5`): en móvil las tarjetas quedan en 3 columnas apretadísimas; `QuickActions` con `col-start-3 row-start-2` fijo. | `components/profile/ProfileContent.jsx`, `QuickActions.jsx` |
| A2 | Mis hábitos (`/dashboard/my-habits`) | Tarjetas en `grid-cols-2` en todos los anchos <lg: en 320–390 px cada tarjeta queda de ~150 px con contenido interno desbordado (icono 64px + dropdown + nombre largo). | `components/habits/MyHabitsTable.jsx` |
| A3 | Explorar hábitos | Tarjetas `grid-cols-2` sin breakpoint; cabecera de filtros en una sola fila sin wrap (buscador + filtros desbordan). | `components/habits/explore/ExploreHabitsContent.jsx`, `ExploreHabitsHeader.jsx` |
| A4 | Formularios de actividad (create) | Filas de campos `w-1/2` + `w-1/3` fijas: en 320–390 px los campos quedan demasiado estrechos y el select de unidad se corta. | `components/activities/create/FormularioTransporte.jsx`, `FormularioEnergia.jsx` |
| A5 | ShowMyHabit (`/dashboard/my-habits/{id}`) | Fila de stats `flex` con dos grupos `pr-6 border-r` y barra `w-[70%]` fija → en 320 px la barra de progreso queda diminuta y el texto "¡Vas por buen camino!" se aprieta; iconos de 96 px sin wrap. | `components/habits/show/ShowMyHabitMain.jsx` |
| A6 | Historial (`/dashboard/history`) | Fila de tarjetas TortaPeriod + Link "Ver detalle" sin wrap; cards KPI en `flex` sin rejilla; estado vacío `w-2/3` demasiado estrecho. | `components/dashboard/history/HistoryContent.jsx`, `TortaPeriod.jsx` |
| A7 | ShowPeriod (`/dashboard/history/{period}`) | Cabecera `w-36` + `text-4xl` sin adaptación; equivalencias `flex` en fila sin wrap; bloque categoría `flex gap-6` en fila única. | `components/dashboard/history/showPeriod/ShowPeriodContent.jsx` |
| A8 | Admin: métricas de recomendaciones | 4 KPI en `flex` sin rejilla; filtros en fila única; cabeceras `flex justify-between` sin wrap. | `components/admin/recommendations/metrics/RecommendationsMetricsMain.jsx`, `AdminMain.jsx` |
| A9 | Admin: factores de emisión | Cabecera `flex justify-between` (título + botón) y fila de búsqueda `flex` sin wrap → desborde; paginación pegada a la derecha sin wrap. | `components/admin/emisionFactors/EmissionFactorsMain.jsx` |
| A10 | Tablas (LatestActivities, PersonalInformation, showFactor, showPeriod, metrics) | Sin `min-width` en el cuerpo: las celdas se comprimen hasta hacerse ilegibles en vez de hacer scroll horizontal interno; correos y nombres largos no se rompen (`break-*`). | `components/activities/LatestActivities.jsx`, `components/profile/PersonalInformationField.jsx` |

### Medias

| # | Problema | Archivo |
|---|---|---|
| M1 | `dialog.jsx`: `DialogContent` sin `max-height` → modales altos (registro de avance, editar hábito, factores) se cortan en horizontal 320 px y en orientación horizontal móvil. | `components/ui/dialog.jsx` |
| M2 | Inputs con tamaño de fuente <16 px → zoom automático de iOS al enfocar. | `ModalActionsActivities.jsx`, `EmissionFactorsMain.jsx`, `RecommendationsMetricsMain.jsx`, `ExploreHabitsContent.jsx` |
| M3 | Botones/chips/paginación con altura <44 px en móvil. | paginaciones varias, `ActivitiesMain.jsx`, `MyHabitsTable.jsx` |
| M4 | `auth.blade.php`: `h-screen`, `px-25` fijo, `w-screen` → logo y formulario apretados; errores de validación `right-8 max-w-46` fuera de viewport en 320 px; etiquetas `for=""` vacías y sin `autocomplete`. | `resources/views/layouts/auth.blade.php`, `auth/login.blade.php`, `auth/register.blade.php` |
| M5 | Landing (`landing-header.blade.php`): `h-160` fija, nav sin wrap, enlaces ocultos sin alternativa, `w-[50%]/w-[10%]` fijos, `text-5xl`, `w-[34ch]`, `id="#inicio"` inválido. | `resources/views/components/landing-header.blade.php` |
| M6 | `CardTorta`/`TortaPeriod`: leyenda `w-[50%]` fija y anillo `w-56` en fila → en 320 px la leyenda se comprime; `TortaPeriod` usa clases dinámicas `w-${size*2} h-${size}` (no generadas por Tailwind). | `components/dashboard/CardTorta.jsx`, `history/TortaPeriod.jsx` |
| M7 | Admin header: "Panel administrativo" + badge "Sesión administrativa" + avatar sin wrap → saturado en 320–360 px. | `components/admin/AdminHeader.jsx` |

### Bajas

| # | Problema | Archivo |
|---|---|---|
| B1 | `MobileBar` con `url="#"` en 3 de 5 destinos (dead links). Reemplazada por navegación hamburguesa con rutas reales. | `components/MobileBar.jsx` (ver docs/responsive.md) |
| B2 | `Logo` sin `max-width:100%` en carruseles/flex → riesgo teórico de deformación. | `components/Logo.jsx` |
| B3 | AdminMain / Banner "Gestionar factores" como `<Link>` sin `href` → enlace sin destino (no modificado por alcance; reportado). | `components/admin/AdminMain.jsx` |
| B4 | `CategoriaMasImpacto` y `RecomendacionesDestacadas`: `href="#"` (dead links, no modificados por alcance). | varios |
| B5 | `.gitignore` modificado por terceros (`+opencode.json`) — ajeno a esta tarea, se conserva. | `.gitignore` |
| B6 | `AsideNav` y `AdminAside`: `h-screen` → `h-dvh` (hecho). Sidebar de admin sin alternativa móvil antes del cambio. | layouts |
| B7 | `UserResumen` tabla perfil: emails largos sin `break-all` (corregido en `PersonalInformationField`). | profile |
| B8 | Tarjeta `HistoryInfoCard`: valor `text-[24px]` podía desbordar → `break-words`. | `history/HistoryInfoCard.jsx` |

## Resolución (implementado y verificado)

| ID | Resolución |
|---|---|
| C1 | Grid dashboard `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`; `col-span` por breakpoint; `min-w-0` en `<section>` para no inflar el ancho; `CategoriaMasImpacto` y `RecomendacionesDestacadas` sin `col-start/row-start` fijos en base. |
| C2 | `AdminAside` `hidden md:flex`; nuevo `AdminMobileNav` (hamburguesa + drawer teal a pantalla completa) en `AdminHeader`; mismo logo, mismos enlaces, mismo form de logout (`router.post(auth.logout)`). |
| C3 | Nuevo `MobileNav` (hamburguesa en el header, drawer blanco con `NavEnlace` a rutas reales de usuario: Dashboard, Actividades, Hábitos, Historial, Recomendaciones, Perfil). `MobileBar` deja de importarse en todas las páginas. |
| C4 | Toasts: `fixed left-2 right-2 sm:left-auto sm:right-8`, `w-full sm:w-64`, cierre con `p-2`. `ErrorsList` idem (`left-2 right-2`, `max-w-full sm:max-w-46`). |
| C5 | `min-h-screen`/`h-screen` → `min-h-dvh`/`h-dvh`; `w-screen` eliminado en auth layout; `px-25` → `px-6 sm:px-16 lg:px-25`; errores Blade a `left-2 right-2 sm:left-auto`. |
| A1 | Perfil: `grid-cols-1 md:grid-cols-5`; `QuickActions` sin `col-start`/`row-start` en base; `UserResumen` col-span responsive; paginaciones con wrap. |
| A2 | MyHabitsTable: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`; empty state `col-span-1 sm:col-span-2 lg:col-span-3`; filtros con área táctil 44 px. |
| A3 | ExploreHabitsContent: `grid-cols-1 sm:grid-cols-2`; filtros y buscador apilados `flex-col lg:flex-row`; buscador `w-full lg:w-auto`; header con `text-3xl sm:text-4xl` y `max-w-full`. |
| A4 | Formularios de actividad: filas `flex flex-col sm:flex-row`; `w-1/2`/`w-1/3` → `w-full sm:w-1/2`/`sm:w-1/3`. |
| A5 | ShowMyHabitMain: bloques `flex-wrap`/`flex-col sm:flex-row`; barra de progreso `w-full sm:w-[70%]`; `max-w-[70%]` → `max-w-full md:max-w-[70%]`. |
| A6 | HistoryContent: KPI `grid sm:grid-cols-3`; fila de período `flex-col sm:flex-row`; empty state `w-full max-w-md`; paginación con wrap. `TortaPeriod` leyenda `w-full sm:w-[50%]` y fila `flex-col sm:flex-row`. |
| A7 | ShowPeriodContent: cabecera `flex-col sm:flex-row`, imagen `w-28 sm:w-36`, `text-3xl sm:text-4xl`; equivalencias `flex-col md:flex-row`; categorías `flex-col lg:flex-row`. |
| A8 | Metrics y AdminMain: KPIs de admin vueltos a `flex` con `flex-1` en >=md (identico al original); cabeceras `flex-col sm:flex-row` con gap; filtros `flex-wrap`. |
| A9 | EmissionFactorsMain: cabecera y buscador `flex-col sm:flex-row`; buscador y select `w-full sm:w-auto`; tabla con `overflow-x-auto` (ui/table) + cabecera con wrap; paginación `flex-wrap` y áreas táctiles 44 px. |
| A10 | `LatestActivities` table `min-w-[36rem]`; `PersonalInformationField` valor `break-all`; `HistoryInfoCard` valor `break-words`; `RecommendationsMetricsMain` filtrado wrap. |
| M1 | `DialogContent`: `max-sm:max-h-[90dvh] max-sm:overflow-y-auto` (solo movil); cierre `min-h-11 min-w-11 sm:min-h-0 sm:min-w-0`. |
| M2 | Inputs/selects/textareas: `text-base sm:text-…` (16 px en móvil). |
| M3 | Chips de filtro y paginaciones: `min-h-11 min-w-11 sm:min-w-0 sm:min-h-0` (44 px en móvil). |
| M4 | Auth Blade: `min-h-dvh`, apilado en móvil, logo `w-56 h-28` en móvil, toasts errores dentro del viewport, `for=`, `autocomplete`, `inputmode`, `min-w-0` en inputs (causa raíz del botón ojito expulsado del recuadro). |
| M5 | Landing: `min-h-dvh h-auto md:h-160 md:min-h-0`; nav `flex flex-wrap` con los mismos enlaces; botones `px-3 sm:px-4 min-h-11 sm:min-h-0`; `text-4xl sm:text-5xl`; badge `max-w-[34ch] w-fit`; `id="#inicio"` -> `id="inicio"`. Antes de 1024-1440 la landing tambien tenia scroll horizontal; ahora no lo tiene (eliminó un defecto, no el diseno). |
| M6 | `CardTorta`: fila `flex-col sm:flex-row`, leyenda `w-full sm:w-[50%]`. `TortaPeriod`: idem; el ancho dinámico `w-${size*2}` queda documentado como limitación (no se toca por alcance/visual). |
| M7 | AdminHeader: hamburguesa + título `truncate`, badge de sesión solo-con-icono en <sm, truncado con `min-w-0`. |
| B1 | `MobileBar` (rutas `#` muertas) → reemplazada por drawer con rutas reales. Componente conservado en el repo, sin importar. |
| B2 | Logo: sin cambios (no forzar `max-width` sobre componente usado con tamaños explícitos; el drawer/header ya controlan su contenedor). |
| B3 | `AdminMain` "Gestionar factores" `<Link>` sin `href`: **reportado, no modificado** (fuera de alcance). |
| B4 | Dead links `href="#"` (CategoriaMasImpacto, RecomendacionesDestacadas, PeriodoCard): **reportados, no modificados** (fuera de alcance). |
| B5 | `.gitignore` `+opencode.json`: ajeno a la tarea (modificado antes/por terceros). Se conserva y se excluye de los commits. |
| B6 | Sidebars con `h-dvh` (hecho); admin ahora tiene alternativa móvil (C2). |
| B7 | `PersonalInformationField`: `break-all` en valores. |
| B8 | `HistoryInfoCard`: `break-words`. |

## Verificacion

- Capturas de 168 pantallas en `docs/responsive/despues/` (8 anchos x 21 paginas).
- Informe automatico de scroll horizontal (`overflow-report.json`): **0 de 168** con scroll horizontal (antes: 67).
- Escritorio: auditoria por capturas y por `git diff` del codigo; ver lista precisa abajo.

## Escritorio (>=1024 px) - diferencias aceptadas y por que

1. `h-dvh`/`min-h-dvh` por `h-screen`/`min-h-screen`: misma geometria visible.
2. `pb-6 md:pb-24 xl:pb-6` en contenedores con `pb-24` previo: mismo espacio en >=md.
3. `min-h-11`/`sm:min-h-0` en areas de toque: hit-area invisible, altura original desde sm.
4. KPIs de admin (AdminMain) y de metricas de recomendaciones: vueltos a `flex` con `flex-1` (identico al original en >=md).
5. Landing 1024-1440 px: antes tenia scroll horizontal; ahora no. Composicion visual conservada.
6. ActivitiesContent: a partir de lg (1024 px), principal 80% y lateral 20% (antes 100% hasta xl con overflow en 1024 px). A partir de 1280 px, identico al original.

## Notas

- Enlaces '#' (B1, B3, B4): defectos preexistentes, sin cambio de destino por alcance.
- '.gitignore' modificado por terceros (+opencode.json): ajeno a esta tarea; se conserva sin editar ni commitear.
- MobileBar.jsx queda en el repo sin importarse (dead code); eliminarlo requeriria aprobacion.
- Las capturas antes/despues no se commitean; se entregan en disco para revision.
