import { Car, Pizza, Zap } from "lucide-react";
import BienvenidaCard from "./BienvenidaCard";
import CardInfo from "./CardInfo";
import PeriodoCard from "./PeriodoCard";
import CardTorta from "./CardTorta";
import GraficoEmisiones from "./GraficoEmisiones";
import CategoriaMasImpacto from "./CategoriaMasImpacto";
import UltimosPeriodos from "./UltimosPeriodos";
import RecomendacionesDestacadas from "./RecomendacionesDestacadas";
import ResumenHuella from "./ResumenHuella";
import { authUser } from "@/stores/user-store";

export default function DashboardContent() {
    const footPrint = authUser().last_footprint?.total_emissions ?? 0;
    const emissions_per_categories = authUser().emissions_per_categories;

    console.log(emissions_per_categories);
    return (
        <div className="grid grid-cols-3 max-h-full md:grid-cols-4 items-start gap-6 p-4">
            <BienvenidaCard />
            <PeriodoCard />
            <ResumenHuella />
            <CardInfo
                sectionName={"Transporte"}
                icon={Car}
                colorIcon={"text-green-900"}
                bgIcon={"bg-green-800/10"}
                colorBar={"bg-green-800"}
                value={emissions_per_categories["transport"]}
                percentage={
                    (emissions_per_categories["transport"] / footPrint) * 100
                }
            />
            <CardInfo
                sectionName={"Energía"}
                icon={Zap}
                colorIcon={"text-blue-600"}
                bgIcon={"bg-blue-600/10"}
                colorBar={"bg-blue-600"}
                value={emissions_per_categories["energy"]}
                percentage={
                    (emissions_per_categories["energy"] / footPrint) * 100
                }
            />
            <CardInfo
                sectionName={"Alimentación"}
                icon={Pizza}
                colorIcon={"text-purple-700"}
                bgIcon={"bg-purple-700/10"}
                colorBar={"bg-purple-700"}
                value={emissions_per_categories["food"]}
                percentage={
                    (emissions_per_categories["food"] / footPrint) * 100
                }
            />

            <CardTorta />
            <GraficoEmisiones />
            <CategoriaMasImpacto />
            <UltimosPeriodos />
            <RecomendacionesDestacadas />
        </div>
    );
}
