<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransportTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transport_types')->insert([
            ['name' => 'Automóvil', 'created_at'=> now()],
            ['name' => 'Motocicleta', 'created_at'=> now()],
            ['name' => 'Autobús', 'created_at'=> now()],
            ['name' => 'Metro', 'created_at'=> now()],
            ['name' => 'Bicicleta', 'created_at'=> now()],
            ['name' => 'Caminata', 'created_at'=> now()],
        ]);
    }
}
