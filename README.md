# Huellify

Huellify es una plataforma web para comprender y reducir la huella de carbono personal. Permite registrar actividades de transporte y consumo de energía, obtener una **estimación** de emisiones en kg CO₂e, consultar el historial por periodos, ver equivalencias ambientales, recibir recomendaciones y hacer seguimiento de hábitos.

> Los resultados de la plataforma son estimaciones informativas: no son mediciones oficiales, auditorías ni certificaciones ambientales.

---

## Índice

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecución en desarrollo](#ejecución-en-desarrollo)
- [Pruebas y calidad](#pruebas-y-calidad)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas principales](#rutas-principales)
- [Modelo de datos](#modelo-de-datos)
- [Cómo se calcula la huella](#cómo-se-calcula-la-huella)
- [Autenticación y permisos](#autenticación-y-permisos)
- [Frontend y diseño](#frontend-y-diseño)
- [Páginas institucionales y aviso legal](#páginas-institucionales-y-aviso-legal)
- [Configuración](#configuración)
- [Despliegue](#despliegue)
- [Solución de problemas](#solución-de-problemas)
- [Licencia](#licencia)

---

## Características

- **Landing pública** con explicación del producto, pasos, funcionalidades y llamadas a la acción.
- **Autenticación de usuarios**: registro, inicio de sesión, recuperación de contraseña y verificación de correo.
- **Registro de actividades** de transporte (tipo de transporte y combustible) y energía (fuente de energía).
- **Cálculo estimado de huella** por periodo, con desglose por categoría y factor de emisión.
- **Historial** de periodos y detalle de resultados.
- **Equivalencias ambientales** y **recomendaciones sostenibles** con seguimiento de estado.
- **Seguimiento de hábitos**: adopción, meta semanal, registro diario y notas.
- **Panel de administración** para factores de emisión y métricas de recomendaciones.
- **Páginas institucionales**: Acerca de Huellify, Términos y condiciones y Política de privacidad (en borrador, ver [aviso legal](#páginas-institucionales-y-aviso-legal)).

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Backend | Laravel 13 (`laravel/framework ^13.17`), PHP 8.4+ |
| Frontend público | Blade + Tailwind CSS 4 |
| Frontend de aplicación | Inertia.js 3 (`inertiajs/inertia-laravel`, `@inertiajs/react`) + React 19 |
| Build | Vite 8, `@tailwindcss/vite`, `laravel-vite-plugin` |
| Gráficos / UI | Chart.js, Recharts, Radix UI, shadcn, Tabler Icons, Lucide |
| Pruebas | Pest 5 (`pestphp/pest`, plugin Laravel) |
| Calidad | Laravel Pint, Laravel Boost, Pail |
| Base de datos | PostgreSQL (`pgsql` es el valor por defecto en `config/database.php`) |
| Colas / caché / sesiones | `database` por defecto en `.env.example` |
| Correo | Driver `log` por defecto en desarrollo |

Las versiones exactas están en `composer.json` y `package.json`.

## Requisitos

- PHP 8.4 o superior (con extensiones habituales de Laravel: `pdo`, `mbstring`, `xml`, `curl`, `zip`).
- Composer.
- Node.js y npm.
- PostgreSQL en ejecución (el proyecto está configurado para `pgsql`).

## Instalación

```bash
git clone https://github.com/Jaime829/huellify.git
cd huellify
composer install
npm install
cp .env.example .env
php artisan key:generate
```

Configura PostgreSQL en `.env`. Crea una base de datos (por ejemplo `huellify`) y ajusta la conexión:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=huellify
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
```

> `config/database.php` define `pgsql` como conexión por defecto. `.env.example` conserva los valores genéricos de Laravel con `sqlite`; debes reemplazarlos por los anteriores al configurar el entorno.

Migra y, de forma opcional, carga los datos de catálogos (categorías, unidades, tipos de transporte, fuentes de energía, factores de emisión, hábitos, recomendaciones y equivalencias):

```bash
php artisan migrate
php artisan db:seed
```

Compila los assets para producción local:

```bash
npm run build
```

Alternativa única: `composer run setup` ejecuta instalación de dependencias, creación de `.env`, generación de clave, migraciones forzadas, `npm install --ignore-scripts` y `npm run build`.

> `DatabaseSeeder` no crea usuarios. Crea la primera cuenta desde `/auth/register`.

## Ejecución en desarrollo

La forma recomendada es:

```bash
composer run dev
```

Ejecuta `php artisan dev`, que coordina servidor, Vite y demás procesos de desarrollo. La aplicación queda en `http://localhost:8000`.

Si prefieres comandos separados, en dos terminales:

```bash
php artisan serve
npm run dev
```

## Pruebas y calidad

```bash
composer test                       # config:clear + php artisan test
php artisan test --compact          # suite completa, salida compacta
vendor/bin/pest --filter=NombreTest # una prueba específica
vendor/bin/pint --dirty --format agent  # formateo de PHP modificado
```

Las pruebas feature usan `RefreshDatabase` (definido en `tests/Pest.php`). Hay pruebas de registro, inicio de sesión y recuperación de contraseña en `tests/Feature/Auth/`.

## Estructura del proyecto

```text
app/
├── Http/Controllers/     # Controladores web, auth, dashboard, activities, admin…
├── Http/Middleware/      # HandleInertiaRequests, IsAdmin…
├── Models/               # User, Activity, CarbonFootprint, Habit, Recommendation…
└── Events/               # WelcomeUser
bootstrap/app.php         # Configuración de routing, middleware y excepciones
database/
├── migrations/           # Esquema de usuario, actividades, emisiones, hábitos…
├── seeders/              # Catálogos y factores de emisión
└── factories/            # Factories de modelos
docs/landing/reference/   # Mockup de referencia visual de la landing
public/images/            # Imágenes estáticas (logo, banner, capturas)
resources/
├── css/app.css           # Entrada de Tailwind
├── js/                   # Entrada Inertia + páginas React (Dashboard, Admin…)
└── views/
    ├── layouts/          # base.blade.php, auth.blade.php, app.blade.php
    ├── auth/             # login, register, verify-email, password
    └── pages/
        ├── landing/      # Landing pública
        ├── about/        # Acerca de Huellify
        └── legal/        # Términos y privacidad
routes/web.php            # Rutas públicas, auth, dashboard y admin
tests/                    # Pruebas Pest
```

## Rutas principales

Públicas:

| Método | Ruta | Nombre | Descripción |
|---|---|---|---|
| GET | `/` | `landing` | Landing |
| GET | `/about` | `about` | Acerca de Huellify |
| GET | `/terms` | `terms` | Términos y condiciones |
| GET | `/privacy` | `privacy` | Política de privacidad |

Autenticación (prefijo `/auth`, middleware `guest`): `/login`, `/register`, `/forgot-password`, `/reset-password/{token}`. Cierre de sesión: `POST /auth/logout`. Verificación de correo: `/auth/email/verify/{id}/{hash}`.

Autenticadas (`auth` + `verified`): `/dashboard` (`dashboard.index`), `/dashboard/profile`, `/dashboard/history`, `/dashboard/activities`, `/dashboard/habits/explore`, `/dashboard/my-habits`, `/dashboard/recommendations`.

Administración (`auth` + `admin`): `/admin`, `/admin/emission-factors`, `/admin/recommendations/metrics`.

La lista completa se obtiene con:

```bash
php artisan route:list
```

## Modelo de datos

| Dominio | Tablas principales |
|---|---|
| Cuenta | `users`, `sessions`, `password_reset_tokens`, `activity_logs` |
| Periodos y actividades | `periods`, `activities`, `transport_details`, `energy_details` |
| Factores | `emission_factors`, `transport_emission_factors`, `energy_emission_factors`, `equivalence_factors`, `transport_types`, `fuel_types`, `energy_sources`, `measurement_units`, `activity_categories` |
| Resultados | `carbon_footprints`, `carbon_footprint_items` |
| Hábitos | `habits`, `habit_categories`, `user_habits`, `habit_logs` |
| Recomendaciones | `recommendations`, `user_recommendations` |
| Infraestructura | `cache`, `jobs` |

Las eliminaciones en cascada están definidas en las migraciones. Los catálogos y factores se poblan con `php artisan db:seed`.

## Cómo se calcula la huella

1. El usuario registra una actividad indicando cantidad, unidad, fecha, categoría y detalles de transporte o energía.
2. La actividad se asocia a un **factor de emisión** vigente para su categoría y unidad.
3. `emisiones = cantidad × valor del factor`. El resultado se guarda en `carbon_footprint_items`.
4. Los items se agrupan en un `carbon_footprint` por periodo y se suman en `total_emissions`.
5. Las equivalencias usan `equivalence_factors` para mostrar referencias cotidianas.

Los factores y sus fuentes viven en la base de datos (tablas `emission_factors` y `equivalence_factors`, cargadas por seeders). El detalle documentado de la metodología y las fuentes específicas está pendiente de completar en la documentación legal.

## Autenticación y permisos

- Los visitantes son redirigidos a `route('auth.login')` mediante `redirectGuestsTo` en `bootstrap/app.php`.
- Las rutas del dashboard usan los middleware `auth` y `verified`.
- El panel admin usa el alias `admin`, resuelto por `App\Http\Middleware\IsAdmin`.
- Las contraseñas se almacenan con hash y el formulario de registro incluye el token CSRF `_token`.

## Frontend y diseño

- La landing y las páginas institucionales son Blade puro con Tailwind y variables CSS definidas en cada vista: verde de marca `#0F5132`, verde profundo `#0A3D29`, acento `#0E9F6E`, fondos mint, tinta `#14231B` y neutros.
- El dashboard y el panel admin usan Inertia + React (`resources/js/Pages`).
- La landing usa `public/images/bg-landing.webp` en el banner, con carga diferida y dimensiones reservadas.
- Se cargan Instrument Sans (Bunny Fonts, vía Vite) y Ranade (Fontshare) desde el layout base.
- Si una clase arbitraria de Tailwind no aparece tras crear una vista nueva, reinicia Vite; el compilador puede no haber escaneado el archivo aún.

## Páginas institucionales y aviso legal

Existen tres páginas públicas: `/about`, `/terms` y `/privacy`. Comparten navbar, footer y paleta con la landing; las legales incluyen índice, anclas, tabla de cookies, estilos de impresión y marcadores visibles `[POR COMPLETAR: …]`.

> **Advertencia:** el contenido de `/terms` y `/privacy` es un **borrador redactado de buena fe y no constituye asesoría legal**. Debe ser revisado por un abogado antes de publicarse. No se han inventado razón social, NIT, domicilio, correos, teléfonos, registros ni certificaciones; esos datos quedan como marcadores. La posible inscripción en el Registro Nacional de Bases de Datos (RNBD) debe evaluarse según la jurisdicción y la entidad responsable.

Fuentes legales consultadas: Ley 1581 de 2012, Decreto 1074 de 2015 y conceptos de la Superintendencia de Industria y Comercio de Colombia.

## Configuración

Variables principales de `.env`:

| Variable | Uso |
|---|---|
| `APP_NAME`, `APP_URL` | Nombre y URL base de la aplicación |
| `APP_ENV`, `APP_DEBUG`, `APP_LOCALE` | Entorno, depuración e idioma |
| `DB_CONNECTION`, `DB_*` | Conexión PostgreSQL (`pgsql`, host, puerto, base, usuario y contraseña) |
| `SESSION_DRIVER`, `SESSION_LIFETIME` | Sesiones (`database`, 120 min por defecto) |
| `CACHE_STORE`, `QUEUE_CONNECTION` | Caché y colas (`database`) |
| `MAIL_MAILER`, `MAIL_*` | Correo (`log` en desarrollo) |
| `VITE_APP_NAME` | Nombre expuesto al frontend |

Tras cambiar `.env` en producción: `php artisan config:clear` o `php artisan config:cache`.

## Despliegue

Secuencia mínima:

```bash
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Asegura que PostgreSQL esté disponible y sea accesible con las credenciales de `.env`, además de los permisos de escritura en `storage/` y `bootstrap/cache/`. Sirve el documento raíz desde `public/`.

## Solución de problemas

- **"Unable to locate file in Vite manifest"**: ejecuta `npm run build` (o deja `npm run dev` activo).
- **Error 500 en rutas `about`, `terms` o `privacy`**: verifica que `php artisan migrate` haya corrido y que las vistas existan en `resources/views/pages/`.
- **Cambios de Tailwind que no aparecen**: reinicia Vite para que vuelva a escanear las plantillas Blade/JSX.
- **Correo de verificación no visible**: con `MAIL_MAILER=log`, revisa `storage/logs/laravel.log`.

## Licencia

El proyecto declara licencia MIT en `composer.json`.
