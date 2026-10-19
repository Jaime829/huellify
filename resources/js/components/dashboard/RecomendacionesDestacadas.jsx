import { ArrowRight, Car, Lightbulb } from "lucide-react";
import Recomendacion from "./Recomendacion";

export default function RecomendacionesDestacadas() {
    return (
        <div className="p-4 bg-white shadow rounded-md flex flex-col gap-2">
            <header className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Lightbulb />
                    <p className="font-bold text-[12px]">
                        Recomendaciones destacadas
                    </p>
                </div>
                <a
                    className="flex items-center text-[10px] text-gray-500 transition-colors ease-in-out delay-100 hover:text-gray-700"
                    href="#"
                >
                    <ArrowRight size={20} />
                </a>
            </header>
            <div>
                <Recomendacion
                    icon={Car}
                    bgIcon={"bg-emerald-600/10"}
                    colorIcon={"text-emerald-900"}
                    recomendacion={"Usa transporte público"}
                    descripcion={"Puedes ahorrar hasta 25 Kg CO2e al mes."}
                    prioridad={"Alta"}
                />
            </div>
        </div>
    );
}
