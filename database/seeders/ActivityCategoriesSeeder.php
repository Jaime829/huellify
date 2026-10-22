<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActivityCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('activity_categories')->insert([
            ['name' => 'Transporte', 'slug' => 'transport', 'created_at' => now()],
            ['name' => 'Energía', 'slug' => 'energy', 'created_at' => now()],
            ['name' => 'Alimentación', 'slug' => 'food', 'created_at' => now()],
            ['name' => 'Residuos', 'slug' => 'waste', 'created_at' => now()]
        ]);
    }
}
