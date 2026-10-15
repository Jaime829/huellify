import { Car, Leaf, Zap } from "lucide-react";
import BienvenidaCard from "./BienvenidaCard";
import CardInfo from "./CardInfo";
import PeriodoCard from "./PeriodoCard";
import CardTorta from "./CardTorta";
import GraficoEmisiones from "./GraficoEmisiones";
import CategoriaMasImpacto from "./CategoriaMasImpacto";
import UltimosPeriodos from "./UltimosPeriodos";
import RecomendacionesDestacadas from "./RecomendacionesDestacadas";

export default function DashboardContent() {
    return (
        <div className="grid grid-cols-3 max-h-full md:grid-cols-4 items-start gap-6 p-4">
            <BienvenidaCard />
            <PeriodoCard />
            <CardInfo
                sectionName={"Huella de carbono total"}
                icon={Leaf}
                colorIcon={"text-emerald-900"}
                bgIcon={"bg-emerald-800/10"}
                colorBar={"bg-emerald-800"}
                value={29.2}
                isPrincipal={true}
            />
            <CardInfo
                sectionName={"Transporte"}
                icon={Car}
                colorIcon={"text-emerald-900"}
                bgIcon={"bg-emerald-800/10"}
                colorBar={"bg-emerald-800"}
                value={29.2}
            />
            <CardInfo
                sectionName={"Energía"}
                icon={Zap}
                colorIcon={"text-blue-600"}
                bgIcon={"bg-blue-600/10"}
                colorBar={"bg-blue-600"}
                value={29.2}
            />
            <CardInfo
                sectionName={"Hábitos"}
                icon={Leaf}
                colorIcon={"text-purple-700"}
                bgIcon={"bg-purple-700/10"}
                colorBar={"bg-purple-700"}
                value={29.2}
            />

            <CardTorta />
            <GraficoEmisiones />
            <CategoriaMasImpacto />
            <UltimosPeriodos />
            <RecomendacionesDestacadas />
        </div>
    );
}
