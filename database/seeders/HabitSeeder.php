<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HabitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'energia' => DB::table('habit_categories')
                ->where('slug', 'energy')
                ->value('id'),

            'transporte' => DB::table('habit_categories')
                ->where('slug', 'transport')
                ->value('id'),

            'vida-cotidiana' => DB::table('habit_categories')
                ->where('slug', 'daily-life')
                ->value('id'),
        ];

        $habits = [
            [
                'habit_category_id' => $categories['energia'],
                'name' => 'Apagar luces innecesarias',
                'slug' => 'apagar-luces-innecesarias',
                'description' => 'Evita mantener encendidas luces que no necesitas.',
                'instructions' => 'Apaga las luces al salir de una habitación o cuando no sean necesarias.',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bulb"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" /><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" /><path d="M9.7 17l4.6 0" /></svg>',
                'tracking_type' => 'boolean',
                'recommended_weekly_target' => 5,
            ],
            [
                'habit_category_id' => $categories['energia'],
                'name' => 'Desconectar aparatos sin uso',
                'slug' => 'desconectar-aparatos-sin-uso',
                'description' => 'Desconecta cargadores y dispositivos electrónicos cuando no los uses.',
                'instructions' => 'Desconecta los cargadores y aparatos electrónicos que no necesiten permanecer conectados.',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plug"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9.785 6l8.215 8.215l-2.054 2.054a5.81 5.81 0 1 1 -8.215 -8.215l2.054 -2.054" /><path d="M4 20l3.5 -3.5" /><path d="M15 4l-3.5 3.5" /><path d="M20 9l-3.5 3.5" /></svg>',
                'tracking_type' => 'boolean',
                'recommended_weekly_target' => 3,
            ],
            [
                'habit_category_id' => $categories['transporte'],
                'name' => 'Utilizar bicicleta',
                'slug' => 'utilizar-bicicleta',
                'description' => 'Prefiere la bicicleta para trayectos cortos.',
                'instructions' => 'Realiza algunos de tus desplazamientos cortos utilizando la bicicleta.',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-motorbike"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M2 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" /><path d="M13 6h2l1.5 3l2 4" /></svg>',
                'tracking_type' => 'boolean',
                'recommended_weekly_target' => 3,
            ],
            [
                'habit_category_id' => $categories['vida-cotidiana'],
                'name' => 'Reducir el tiempo de ducha',
                'slug' => 'reducir-tiempo-ducha',
                'description' => 'Dúchate en menos tiempo posible.',
                'instructions' => 'Procura reducir la duración de tus duchas y cierra el grifo cuando no necesites agua.',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bath"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1" /><path d="M6 12v-7a2 2 0 0 1 2 -2h3v2.25" /><path d="M4 21l1 -1.5" /><path d="M20 21l-1 -1.5" /></svg>',
                'tracking_type' => 'boolean',
                'recommended_weekly_target' => 5,
            ],
            [
                'habit_category_id' => $categories['energia'],
                'name' => 'Optimizar el uso de dispositivos',
                'slug' => 'optimizar-uso-dispositivos',
                'description' => 'Apaga tu computador y dispositivos cuando termines de usarlos.',
                'instructions' => 'Apaga completamente tus dispositivos electrónicos al finalizar su uso.',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-device-laptop"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19l18 0" /><path d="M5 7a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -8" /></svg>',
                'tracking_type' => 'boolean',
                'recommended_weekly_target' => 7,
            ],
            [
                'habit_category_id' => $categories['energia'],
                'name' => 'Regular el aire acondicionado',
                'slug' => 'regular-aire-acondicionado',
                'description' => 'Úsalo solo cuando sea necesario y a una temperatura moderada.',
                'instructions' => 'Evita temperaturas demasiado bajas y apaga el aire acondicionado cuando no sea necesario.',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-temperature"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><path d="M10 9l4 0" /></svg>',
                'tracking_type' => 'boolean',
                'recommended_weekly_target' => 5,
            ],
            [
                'habit_category_id' => $categories['transporte'],
                'name' => 'Compartir vehículo',
                'slug' => 'compartir-vehiculo',
                'description' => 'Comparte tu auto o usa transporte público.',
                'instructions' => 'Coordina tus desplazamientos con otras personas para compartir el vehículo cuando sea posible.',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-car"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /></svg>',
                'tracking_type' => 'boolean',
                'recommended_weekly_target' => 2,
            ],
            [
                'habit_category_id' => $categories['vida-cotidiana'],
                'name' => 'Reducir el uso de plásticos',
                'slug' => 'reducir-uso-plasticos',
                'description' => 'Evita plásticos de un solo uso y prefiere opciones reutilizables.',
                'instructions' => 'Utiliza bolsas, botellas y recipientes reutilizables en lugar de productos desechables.',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-seedling"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 3a7 7 0 0 1 6.95 6.155a6.97 6.97 0 0 1 5.05 -2.155h3a1 1 0 0 1 1 1v1a7 7 0 0 1 -7 7h-2v4a1 1 0 0 1 -2 0v-7h-2a7 7 0 0 1 -7 -7v-2a1 1 0 0 1 1 -1z" /></svg>',
                'tracking_type' => 'boolean',
                'recommended_weekly_target' => 3,
            ],
        ];

        foreach ($habits as $habit) {
            DB::table('habits')->updateOrInsert(
                ['slug' => $habit['slug']],
                array_merge($habit, [
                    'measurement_unit_id' => null,
                    'is_active' => true,
                    'updated_at' => now(),
                    'created_at' => now(),
                ])
            );
        }
    }
}
