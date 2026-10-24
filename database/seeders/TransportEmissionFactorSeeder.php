<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransportEmissionFactorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('emission_factors')->insert([
            [
                'name' => 'Vehículo liviano nuevo promedio - Colombia 2019 (ciclo NEDC)',
                'category_id' => 1,
                'measurement_unit_id' => 1,
                'value' => 0.16481,
                'source' => 'Ministerio de Minas y Energía (2022), línea base de consumo de combustible de vehículos livianos nuevos (GFEI), año 2019: 7.06 lge/100 km, 164.81 gCO2/km, evaluado en ciclo NEDC. https://www.minenergia.gov.co/documents/9957/05102022_AIN_Normativa_de_EE_veh%C3%ADculos_livianos_OARE_V5.pdf',
                'valid_from' => '2019-01-01',
                'created_at' => now()
            ],
            [
                'name' => 'Motocicleta <200 cc promedio - muestra colombiana',
                'category_id' => 1,
                'measurement_unit_id' => 1,
                'value' => 0.0474,
                'source' => 'UPME y Universidad de Antioquia, FECOC+ Fase 3 (2023), Cap. 2, Tabla 2.3. CO2 promedio de 40 motocicletas (<200 cc) medidas en banco de rodillos a 1500 msnm: 47.4 g/km. Solo CO2 tanque-a-rueda. https://docs.upme.gov.co/DemandayEficiencia/Doc_Hemeroteca/FECOC+2-3.pdf',
                'valid_from' => '2023-01-01',
                'created_at' => now()
            ],

        ]);

        DB::table('transport_emission_factors')->insert([
            [
                'emission_factor_id' => 1,
                'transport_type_id' => 1,
                'fuel_type_id' => 1,
                'created_at' => now()

            ],
            [
                'emission_factor_id' => 2,
                'transport_type_id' => 2,
                'fuel_type_id' => 6,
                'created_at' => now()

            ],
        ]);

    }
}
