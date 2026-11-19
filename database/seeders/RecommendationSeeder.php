<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecommendationSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('recommendations')->insert([
            // Recomendaciones generales
            [
                'category_id' => null,
                'title' => 'Adopta hábitos de consumo responsable',
                'description' => 'Evalúa tus hábitos cotidianos e identifica oportunidades para reducir tu impacto ambiental.',
                'estimated_savings' => null,
                'priority' => 'medium',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-leaf"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 21c.5 -4.5 2.5 -8 7 -10" /><path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3l.014 0" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => null,
                'title' => 'Aprovecha la luz natural',
                'description' => 'Abre cortinas y persianas durante el día para reducir la necesidad de utilizar iluminación artificial.',
                'estimated_savings' => null,
                'priority' => 'medium',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-sun"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => null,
                'title' => 'Desconecta los dispositivos que no utilizas',
                'description' => 'Desconecta cargadores y dispositivos electrónicos cuando no los necesites para evitar consumos innecesarios de energía.',
                'estimated_savings' => null,
                'priority' => 'low',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plug-connected"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5" /><path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5" /><path d="M3 21l2.5 -2.5" /><path d="M18.5 5.5l2.5 -2.5" /><path d="M10 11l-2 2" /><path d="M13 14l-2 2" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Recomendaciones de Transporte
            [
                'category_id' => 1,
                'title' => 'Prioriza los desplazamientos en bicicleta',
                'description' => 'Utiliza la bicicleta en trayectos cortos cuando las condiciones de seguridad y distancia lo permitan.',
                'estimated_savings' => null,
                'priority' => 'high',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-motorbike"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M2 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" /><path d="M13 6h2l1.5 3l2 4" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 1,
                'title' => 'Utiliza el transporte público',
                'description' => 'Considera utilizar el transporte público en tus desplazamientos para reducir la dependencia del vehículo particular.',
                'estimated_savings' => null,
                'priority' => 'high',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M16 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" /><path d="M16 5l1.5 7l4.5 0" /><path d="M2 10l15 0" /><path d="M7 5l0 5" /><path d="M12 5l0 5" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 1,
                'title' => 'Comparte tus viajes en vehículo',
                'description' => 'Organiza desplazamientos compartidos con personas que tengan destinos o recorridos similares.',
                'estimated_savings' => null,
                'priority' => 'medium',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-car"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 1,
                'title' => 'Planifica tus desplazamientos',
                'description' => 'Agrupa tus diligencias y organiza tus recorridos para evitar viajes innecesarios.',
                'estimated_savings' => null,
                'priority' => 'medium',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-route"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4" /><path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Recomendaciones de Energía
            [
                'category_id' => 2,
                'title' => 'Apaga las luces innecesarias',
                'description' => 'Apaga las luces de las habitaciones cuando salgas de ellas o cuando no necesites iluminación artificial.',
                'estimated_savings' => null,
                'priority' => 'high',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bulb-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" /><path d="M11.089 7.083a5 5 0 0 1 5.826 5.84m-1.378 2.611a5.012 5.012 0 0 1 -.537 .466a3.5 3.5 0 0 0 -1 3a2 2 0 1 1 -4 0a3.5 3.5 0 0 0 -1 -3a5 5 0 0 1 -.528 -7.544" /><path d="M9.7 17h4.6" /><path d="M3 3l18 18" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'title' => 'Reduce el tiempo de uso de los electrodomésticos',
                'description' => 'Evita mantener encendidos los electrodomésticos cuando no los estés utilizando.',
                'estimated_savings' => null,
                'priority' => 'medium',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-wash-machine"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -14" /><path d="M8 14a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M8 6h.01" /><path d="M11 6h.01" /><path d="M14 6h2" /><path d="M8 14c1.333 -.667 2.667 -.667 4 0c1.333 .667 2.667 .667 4 0" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'title' => 'Utiliza bombillas LED',
                'description' => 'Reemplaza las bombillas tradicionales por iluminación LED, que generalmente requiere menos electricidad para proporcionar una iluminación equivalente.',
                'estimated_savings' => null,
                'priority' => 'high',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bulb"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" /><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" /><path d="M9.7 17l4.6 0" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'title' => 'Desconecta los cargadores',
                'description' => 'Desconecta los cargadores de teléfonos y otros dispositivos cuando terminen de cargar o no estén en uso.',
                'estimated_savings' => null,
                'priority' => 'low',
                'is_active' => true,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plug-connected-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 16l-4 4" /><path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5" /><path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5" /><path d="M3 21l2.5 -2.5" /><path d="M18.5 5.5l2.5 -2.5" /><path d="M10 11l-2 2" /><path d="M13 14l-2 2" /><path d="M16 16l4 4" /></svg>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
