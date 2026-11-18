<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquivalenceFactorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('equivalence_factors')->insert(
            [
                'name' => 'Absorción de árboles',
                'description' => 'Equivalencia aproximada entre las emisiones de CO₂e y la cantidad de árboles urbanos necesaria para absorber una cantidad equivalente de CO₂ durante un año.',
                'kg_co2e_per_unit' => 60.000000,
                'unit_label' => 'árbol-año',
                'source' => 'U.S. Environmental Protection Agency (EPA) - Greenhouse Gas Equivalencies Calculator',
                'methodology' => 'Factor de referencia de 60 kg de CO₂ por árbol-año. Corresponde al promedio anual estimado por la EPA para árboles urbanos de crecimiento medio durante sus primeros 10 años de crecimiento. Se basa en una distribución de especies coníferas y caducifolias de ciudades estadounidenses, considera factores de supervivencia y no representa condiciones específicas de Colombia. El factor original expresa CO₂, por lo que su aplicación a emisiones CO₂e debe interpretarse como una equivalencia aproximada.',
                'is_active' => true,
                'icon' => 'tree-icon.webp',
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );
    }
}
