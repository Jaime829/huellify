<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecommendationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('recommendations')->insert([
            ['category_id' => 1, 'title' => 'Usa el transporte público cuando sea posible', 'description' => 'Utiliza el autobús, el metro u otros medios de transporte público en lugar del automóvil particular para reducir las emisiones por persona en tus desplazamientos.', 'priority' => 'medium', 'created_at' => now()],
            ['category_id' => 1, 'title' => 'Comparte el automóvil para reducir emisiones por pasajero', 'description' => 'Comparte tus viajes con familiares, compañeros o amigos que tengan destinos similares. Así puedes reducir el número de vehículos en circulación y las emisiones asociadas a cada pasajero.', 'priority' => 'medium', 'created_at' => now()],
            ['category_id' => 1, 'title' => 'Camina o usa bicicleta en trayectos cortos', 'description' => 'Para desplazamientos cortos, considera caminar o utilizar la bicicleta en lugar de recurrir a vehículos motorizados. Además de reducir emisiones, puedes incorporar actividad física a tu rutina.', 'priority' => 'low', 'created_at' => now()],
            ['category_id' => 1, 'title' => 'Evita aceleraciones bruscas y mantén los neumáticos correctamente inflados', 'description' => 'Conduce de manera suave, evita frenadas y aceleraciones innecesarias y revisa periódicamente la presión de los neumáticos para mejorar la eficiencia del combustible.', 'priority' => 'low', 'created_at' => now()],
            ['category_id' => 2, 'title' => 'Apaga las luces cuando no sean necesarias', 'description' => 'Apaga las luces de las habitaciones vacías y aprovecha la iluminación natural durante el día para disminuir el consumo de electricidad.', 'priority' => 'low', 'created_at' => now()],
            ['category_id' => 2, 'title' => 'Desconecta los dispositivos que no estés utilizando', 'description' => 'Desconecta los equipos que consumen energía innecesariamente cuando permanecen en espera. También puedes utilizar regletas con interruptor para facilitar esta práctica.', 'priority' => 'low', 'created_at' => now()],
            ['category_id' => 2, 'title' => 'Reduce el uso de sistemas de climatización cuando sea posible', 'description' => 'Ajusta el uso de ventiladores, aire acondicionado y otros sistemas de climatización según tus necesidades. Aprovecha la ventilación natural cuando las condiciones lo permitan.', 'priority' => 'medium', 'created_at' => now()],
            ['category_id' => 2, 'title' => 'Revisa tu consumo eléctrico mensual e identifica los principales consumos', 'description' => 'Consulta tus facturas de electricidad y compara el consumo entre periodos para identificar cambios, detectar equipos de alto consumo y establecer objetivos de ahorro.', 'priority' => 'medium', 'created_at' => now()],
            ['category_id' => 3, 'title' => 'Incorpora más comidas basadas en vegetales', 'description' => 'Incluye más legumbres, verduras, frutas y cereales en tu alimentación. Sustituir algunas comidas con productos de origen animal por alternativas vegetales puede reducir las emisiones asociadas a tu dieta.', 'priority' => 'medium', 'created_at' => now()],
            ['category_id' => 3, 'title' => 'Planifica tus comidas para evitar desperdiciar alimentos', 'description' => 'Organiza tus comidas y prepara una lista de compras antes de ir al mercado. Compra únicamente las cantidades que necesitas y conserva adecuadamente los alimentos para evitar que se dañen.', 'priority' => 'medium', 'created_at' => now()],
            ['category_id' => 3, 'title' => 'Reduce el desperdicio de alimentos y aprovecha mejor las sobras', 'description' => 'Aprovecha los alimentos que ya tienes, reutiliza las sobras de forma segura y congela las porciones que no consumirás pronto. Así reduces los residuos y las emisiones asociadas a producir alimentos que terminan desechándose.', 'priority' => 'high', 'created_at' => now()],
            ['category_id' => 4, 'title' => 'Separa los residuos reciclables según las normas de tu municipio', 'description' => 'Clasifica los residuos aprovechables, como papel, cartón, vidrio, metales y determinados plásticos, siguiendo las indicaciones locales. Procura que estén limpios y secos cuando corresponda.', 'priority' => 'medium', 'created_at' => now()],
            ['category_id' => 4, 'title' => 'Reduce los productos de un solo uso', 'description' => 'Disminuye el uso de bolsas, vasos, cubiertos y envases desechables. Cuando sea viable, elige alternativas reutilizables para generar menos residuos.', 'priority' => 'medium', 'created_at' => now()],
            ['category_id' => 4, 'title' => 'Prioriza productos reutilizables en tus compras habituales', 'description' => 'Elige productos duraderos y reutilizables, como botellas, bolsas de tela y recipientes, para reducir la necesidad de comprar artículos desechables con frecuencia.', 'priority' => 'low', 'created_at' => now()],
        ]);
    }
}
