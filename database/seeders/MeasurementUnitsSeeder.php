<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MeasurementUnitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('measurement_units')->insert([
            ['name' => 'Kilómetro', 'symbol' => 'km', 'measurement_type' => 'distance'],
            ['name' => 'Kilovatio-hora', 'symbol' => 'kWh', 'measurement_type' => 'energy'],
            ['name' => 'Litro', 'symbol' => 'L', 'measurement_type' => 'volume'],
            ['name' => 'Kilogramo', 'symbol' => 'kg', 'measurement_type' => 'mass'],
            ['name' => 'Gramo', 'symbol' => 'g', 'measurement_type' => 'mass'],
            ['name' => 'Metro cúbico', 'symbol' => 'm³', 'measurement_type' => 'volume'],
            ['name' => 'Unidad', 'symbol' => 'unit', 'measurement_type' => 'count']
        ]);
    }
}
