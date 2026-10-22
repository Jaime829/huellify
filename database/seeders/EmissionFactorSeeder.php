<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmissionFactorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            $categoryId = DB::table('activity_categories')
                ->where('slug', 'energy')
                ->value('id');

            $unitId = DB::table('measurement_units')
                ->where('symbol', 'kWh')
                ->value('id');

            $energySourceId = DB::table('energy_sources')
                ->where('name', 'Electricidad')
                ->value('id');

            if (!$categoryId || !$unitId || !$energySourceId) {
                throw new \RuntimeException(
                    'Falta la categoría de energía, la unidad kWh '
                        . 'o la fuente Electricidad. Ejecuta primero '
                        . 'sus seeders.'
                );
            }

            $factorId = DB::table('emission_factors')
                ->where('name', 'Electricidad - SIN Colombia 2024')
                ->value('id');

            $factorData = [
                'category_id' => $categoryId,
                'name' => 'Electricidad - SIN Colombia 2024',
                'measurement_unit_id' => $unitId,
                'value' => 0.220000,
                'source' => 'UPME - Resolución 0085 de 2026',
                'valid_from' => '2024-01-01',
                'valid_until' => null,
                'active' => true,
                'updated_at' => now(),
            ];

            if ($factorId) {
                DB::table('emission_factors')
                    ->where('id', $factorId)
                    ->update($factorData);
            } else {
                $factorId = DB::table('emission_factors')
                    ->insertGetId([
                        ...$factorData,
                        'created_at' => now(),
                    ]);
            }

            DB::table('energy_emission_factors')
                ->updateOrInsert(
                    ['emission_factor_id' => $factorId],
                    [
                        'energy_source_id' => $energySourceId,
                        'updated_at' => now(),
                        'created_at' => now(),
                    ]
                );
        });
    }
}
