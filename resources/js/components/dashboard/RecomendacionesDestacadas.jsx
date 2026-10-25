import { ArrowRight, Car, Lightbulb } from "lucide-react";
import Recomendacion from "./Recomendacion";

export default function RecomendacionesDestacadas() {
    return (
        <div className="p-4 bg-white shadow rounded-md h-full flex flex-col gap-2 order-4 col-start-3 col-end-4 row-start-2 row-end-3 lg:col-start-auto lg:col-end-auto lg:row-start-auto lg:row-end-auto">
            <header className="flex justify-between items-center flex-wrap">
                <div className="flex gap-2 items-center flex-wrap">
                    <Lightbulb />
                    <p className="font-bold text-[10px]">
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
