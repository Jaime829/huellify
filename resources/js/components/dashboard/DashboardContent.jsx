import { Car, Zap } from "lucide-react";
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
import { IconHeartFilled } from "@tabler/icons-react";

export default function DashboardContent() {
    const footPrint = authUser().last_footprint?.total_emissions ?? 0;
    const emissions_per_categories = authUser().emissions_per_categories;
    const userHabitsAdopted = authUser().userHabitsAdopted;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 max-h-full items-start gap-6 px-6 pt-6 pb-6">
            <BienvenidaCard />
            <PeriodoCard />
            <ResumenHuella />
            <CardInfo
                sectionName={"Transporte"}
                icon={Car}
                colorIcon={"text-green-900"}
                bgIcon={"bg-green-800/10"}
                colorBar={"bg-green-800"}
                value={
                    emissions_per_categories
                        ? emissions_per_categories["Transporte"]
                        : null
                }
                percentage={
                    emissions_per_categories
                        ? (emissions_per_categories["Transporte"] / footPrint) *
                          100
                        : null
                }
            />
            <CardInfo
                sectionName={"Energía"}
                icon={Zap}
                colorIcon={"text-blue-600"}
                bgIcon={"bg-blue-600/10"}
                colorBar={"bg-blue-600"}
                value={
                    emissions_per_categories
                        ? emissions_per_categories["Energía"]
                        : null
                }
                percentage={
                    emissions_per_categories
                        ? (emissions_per_categories["Energía"] / footPrint) *
                          100
                        : null
                }
            />
            <CardInfo
                sectionName={"Hábitos adoptados"}
                icon={IconHeartFilled}
                colorIcon={"text-purple-700"}
                bgIcon={"bg-purple-700/10"}
                colorBar={"bg-purple-700"}
                value={userHabitsAdopted ? userHabitsAdopted : null}
                isPrincipal={true}
            />

            <CardTorta />
            <GraficoEmisiones />
            <CategoriaMasImpacto />
            <UltimosPeriodos />
            <RecomendacionesDestacadas />
        </div>
    );
}
