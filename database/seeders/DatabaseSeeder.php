<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ActivityCategoriesSeeder::class,
            MeasurementUnitsSeeder::class,
            TransportTypesSeeder::class,
            FuelTypesSeeder::class,
            EnergySourcesSeeder::class,
            RecommendationsSeeder::class,
            TransportEmissionFactorSeeder::class,
            EnergyEmissionFactorSeeder::class,
            HabitCategorySeeder::class,
            HabitSeeder::class
        ]);
    }
}
