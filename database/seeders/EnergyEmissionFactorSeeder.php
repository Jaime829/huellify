<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnergyEmissionFactorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('emission_factors')->insert([
            [
                'category_id' => 2,
                'name' => 'Electricidad - SIN Colombia 2024',
                'measurement_unit_id' => 2,
                'value' => 0.220000,
                'source' => 'UPME - Resolución 0085 de 2026 (Diario Oficial 53.409, 24-feb-2026). Factor de emisión del SIN 2024 para inventarios de GEI / huella de carbono: 0.220 tCO2eq/MWh = 0.220 kg CO2e/kWh. https://gestornormativo.creg.gov.co/gestor/entorno/docs/resolucion_upme_0085_2026.htm',
                'valid_from' => '2024-01-01',
                'valid_until' => null,
                'active' => true,
            ],
            [
                'category_id' => 2,
                'name' => 'Gas natural - promedio nacional (combustión)',
                'measurement_unit_id' => 2,
                'value' => 0.20014,
                'source' => 'CO2e derivado. UPME, INCOMBUSTIÓN y Fundación Natura (2016), FECOC 2016, Informe final: CO2 55,539.11 kg/TJ (Tabla 5) + CH4 1 kg/TJ y N2O 0.1 kg/TJ por defecto, uso estacionario (Tabla 6), GWP CH4=25 y N2O=298 = 55,593.91 kg CO2e/TJ x 0.0000036 TJ/kWh (base PCI) = 0.20014 kg CO2e/kWh de energía térmica. https://app.upme.gov.co/Calculadora_Emisiones1/new/Informe_Final_FECOC_Correcciones_UPME_FunNatura.pdf',
                'valid_from' => '2016-01-01',
                'valid_until' => null,
                'active' => true,
            ],
            [
                'category_id' => 2,
                'name' => 'Gas licuado de petróleo (GLP) - promedio nacional (combustión)',
                'measurement_unit_id' => 2,
                'value' => 0.24206,
                'source' => 'CO2e derivado. UPME, INCOMBUSTIÓN y Fundación Natura (2016), FECOC 2016, Informe final: CO2 67,185.1 kg/TJ (Tabla 5) + CH4 1 kg/TJ y N2O 0.1 kg/TJ por defecto, uso estacionario (Tabla 6), GWP CH4=25 y N2O=298 = 67,239.9 kg CO2e/TJ x 0.0000036 TJ/kWh (base PCI) = 0.24206 kg CO2e/kWh de energía térmica. https://app.upme.gov.co/Calculadora_Emisiones1/new/Informe_Final_FECOC_Correcciones_UPME_FunNatura.pdf',
                'valid_from' => '2016-01-01',
                'valid_until' => null,
                'active' => true,
            ],

        ]);
        DB::table('energy_emission_factors')->insert([
            [
                'emission_factor_id' => 6,
                'energy_source_id' => 1,
                'created_at' => now()
            ],
            [
                'emission_factor_id' => 7,
                'energy_source_id' => 2,
                'created_at' => now()
            ],
            [
                'emission_factor_id' => 8,
                'energy_source_id' => 3,
                'created_at' => now()
            ],
        ]);
    }
}
