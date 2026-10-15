import { ArrowLeftRight, ArrowRight, Car } from "lucide-react";
import IconItemsDashboard from "./IconItemsDashboard";

export default function CategoriaMasImpacto() {
    return (
        <section className="flex flex-col p-4 rounded-md shadow bg-white gap-2">
            <p className="font-bold text-[14px]">Categoria con mayor impacto</p>
            <div>
                <div className="flex gap-2">
                    <IconItemsDashboard
                        icon={Car}
                        colorIcon={"text-emerald-900"}
                        bg={"bg-emerald-800/10"}
                    />
                    <div className="py-3">
                        <p className="text-emerald-900 font-bold">Transporte</p>
                        <p className="text-gray-500 text-xs font-medium">
                            Representa el 61% de tus emisiones totales.
                        </p>
                    </div>
                </div>
            </div>
            <a
                href="#"
                className="flex gap-1 items-center justify-center text-[10px] bg-green-600/20 text-green-900 py-2 rounded-md transition-colors ease-in-out delay-100 hover:bg-green-600/40"
            >
                Ver recomendaciones <ArrowRight size={15} />
            </a>
        </section>
    );
}
