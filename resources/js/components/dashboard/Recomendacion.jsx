import { Car } from "lucide-react";
import IconItemsDashboard from "./IconItemsDashboard";

const defaultStylePrioridad = {
    alta: "bg-red-600/20 text-red-800",
    media: "bg-orange-600/20 text-orange-800",
    baja: "bg-green-600/20 text-green-800",
};

export default function Recomendacion({
    icon: Icon,
    colorIcon,
    bgIcon,
    recomendacion,
    descripcion,
    prioridad,
}) {
    const stylesPrioridad = defaultStylePrioridad[prioridad.toLowerCase()];
    return (
        <div className="flex gap-1 items-center">
            <IconItemsDashboard icon={Icon} bg={bgIcon} colorIcon={colorIcon} />
            <div>
                <p className="font-medium text-[12px]">{recomendacion}</p>
                <p className="text-gray-500 text-[10px]">{descripcion}</p>
            </div>
            <div className={`rounded-xl px-2 ${stylesPrioridad}`}>
                <p>{prioridad}</p>
            </div>
        </div>
    );
}
