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
                'name' => 'Automóvil particular - Gasolina (Valle de Aburrá)',
                'category_id' => 1,
                'measurement_unit_id' => 1,
                'value' => 0.2700,
                'source' => 'CO2e estimado. Ríos Bedoya, Marquet y Miralles-Guasch (2016), Revista Transporte y Territorio 15, Cuadro 1: 263 g CO2/km por vehículo (ocupación 1.39 pasajeros) x 1.0266 (aporte de CH4 y N2O móviles de gasolina, FECOC 2016). https://www.redalyc.org/pdf/3330/333047931017.pdf',
                'valid_from' => '2016-01-01',
                'created_at' => now()
            ],
            [
                'name' => 'Motocicleta <200 cc promedio - muestra colombiana (Medellín, 1500 msnm)',
                'category_id' => 1,
                'measurement_unit_id' => 1,
                'value' => 0.0487,
                'source' => 'CO2e estimado. CO2 medido 47.4 g/km (UPME y U. de Antioquia, FECOC+ Fase 3, 2023, Tabla 2.3) x 1.0266 (aporte de CH4 y N2O móviles de la gasolina E10, FECOC 2016 Tablas 5 y 6, GWP 25 y 298). https://docs.upme.gov.co/DemandayEficiencia/Doc_Hemeroteca/FECOC+2-3.pdf',
                'valid_from' => '2023-01-01',
                'created_at' => now()
            ],
            [
                'name' => 'Bus urbano 18 pasajeros - Valle de Aburrá (por vehículo-km)',
                'category_id' => 1,
                'measurement_unit_id' => 1,
                'value' => 0.6410,
                'source' => 'CO2e estimado, por vehículo. Ríos Bedoya, Marquet y Miralles-Guasch (2016), Cuadro 1: bus 630.26 g CO2/km x 1.0170 (aporte de CH4 y N2O móviles del diésel, FECOC 2016). https://www.redalyc.org/pdf/3330/333047931017.pdf',
                'valid_from' => '2021-01-01',
                'created_at' => now()
            ],
            [
                'name' => 'Bicicleta - emisiones directas',
                'category_id' => 1,
                'measurement_unit_id' => 1,
                'value' => 0.0000,
                'source' => 'Ríos Bedoya, Marquet y Miralles-Guasch (2016), Cuadro 1: 0 g CO2/pasajero-km (se asume sin emisiones directas). https://www.redalyc.org/pdf/3330/333047931017.pdf',
                'valid_from' => '2016-01-01',
                'created_at' => now()
            ],
            [
                'name' => 'Caminata - emisiones directas',
                'category_id' => 1,
                'measurement_unit_id' => 1,
                'value' => 0.0000,
                'source' => 'Ríos Bedoya, Marquet y Miralles-Guasch (2016), Cuadro 1: 0 g CO2/pasajero-km (se asume sin emisiones directas). https://www.redalyc.org/pdf/3330/333047931017.pdf',
                'valid_from' => '2016-01-01',
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
            [
                'emission_factor_id' => 3,
                'transport_type_id' => 3,
                'fuel_type_id' => 2,
                'created_at' => now()

            ],
            [
                'emission_factor_id' => 4,
                'transport_type_id' => 5,
                'fuel_type_id' => 6,
                'created_at' => now()

            ],
            [
                'emission_factor_id' => 5,
                'transport_type_id' => 6,
                'fuel_type_id' => 6,
                'created_at' => now()

            ],
        ]);
    }
}
