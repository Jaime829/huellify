<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FuelTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('fuel_types')->insert([
            ['name' => 'Gasolina', 'created_at' => now()],
            ['name' => 'Diésel', 'created_at' => now()],
            ['name' => 'Gas natural', 'created_at' => now()],
            ['name' => 'Gas licuado de petróleo', 'created_at' => now()],
            ['name' => 'Electricidad', 'created_at' => now()],
            ['name' => 'Mixta', 'created_at' => now()],
        ]);
    }
}
