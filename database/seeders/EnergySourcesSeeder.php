<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnergySourcesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('energy_sources')->insert([
            ['name' => 'Electricidad', 'created_at'=> now()],
            ['name' => 'Gas natural', 'created_at'=> now()],
            ['name' => 'Gas licuado de petróleo', 'created_at'=> now()],
        ]);
    }
}
