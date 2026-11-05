<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HabitCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Energía',
                'slug' => 'energy',
                'description' => 'Hábitos para promover el uso responsable de la energía.',
            ],
            [
                'name' => 'Transporte',
                'slug' => 'transport',
                'description' => 'Hábitos para fomentar alternativas de movilidad sostenible.',
            ],
            [
                'name' => 'Vida cotidiana',
                'slug' => 'daily-life',
                'description' => 'Hábitos sostenibles para reducir el impacto ambiental en las actividades diarias.',
            ],
        ];

        foreach ($categories as $category) {
            DB::table('habit_categories')->updateOrInsert(
                ['slug' => $category['slug']],
                [
                    'name' => $category['name'],
                    'description' => $category['description'],
                    'is_active' => true,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }
}
