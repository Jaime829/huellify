import { Car } from "lucide-react";
import IconItemsDashboard from "./IconItemsDashboard";
import { color } from "chart.js/helpers";

const defaultStylePrioridad = {
    high: {
        color: "bg-red-600/20 text-red-800",
        text: "Alta",
    },
    medium: {
        color: "bg-orange-600/20 text-orange-800",
        text: "Media",
    },
    low: {
        color: "bg-green-600/20 text-green-800",
        text: "Baja",
    },
};

export default function Recomendacion({
    icon: Icon,
    colorIcon,
    bgIcon,
    recomendacion,
    descripcion,
    prioridad,
}) {
    const stylesPrioridad = defaultStylePrioridad[prioridad].color;
    const textPrioridad = defaultStylePrioridad[prioridad].text;
    return (
        <div className="flex gap-2 items-center w-full">
            <div className="shrink-0">
                <IconItemsDashboard
                    icon={Icon}
                    bg={bgIcon}
                    colorIcon={colorIcon}
                />
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-medium text-[12px] truncate">
                    {recomendacion}
                </p>
                <p className="text-gray-500 text-[10px] truncate">
                    {descripcion}
                </p>
            </div>

            <p
                className={`rounded-xl px-2 text-[12px] shrink-0 whitespace-nowrap ${stylesPrioridad}`}
            >
                {textPrioridad}
            </p>
        </div>
    );
}
