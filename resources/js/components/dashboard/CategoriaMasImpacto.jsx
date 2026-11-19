import { ArrowRight } from "lucide-react";
import IconItemsDashboard from "./IconItemsDashboard";
import { authUser } from "@/stores/user-store";

import activityIcon from "../util/ActivityIcon";

export default function CategoriaMasImpacto() {
    const mostFrequentActivity = authUser().mostFrequentActivity;
    const totalEmissions = Number(
        authUser().last_footprint?.total_emissions ?? 0,
    );
    const nombreActividad =
        mostFrequentActivity?.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") ?? "";

    return (
        <div className="flex flex-col p-4 rounded-md shadow bg-white gap-2 lg:col-span-1 lg:row-span-1">
            <p className="font-bold text-[14px]">Categoria con mayor impacto</p>
            {mostFrequentActivity ? (
                <>
                    <div>
                        <div className="flex gap-2">
                            <IconItemsDashboard
                                icon={activityIcon(nombreActividad)}
                                colorIcon={"text-emerald-900"}
                                bg={"bg-emerald-800/10"}
                            />
                            <div className="py-3">
                                <p className="text-emerald-900 font-bold">
                                    {mostFrequentActivity.name}
                                </p>
                                <p className="text-gray-500 text-xs font-medium">
                                    Representa el{" "}
                                    {(
                                        (Number(
                                            mostFrequentActivity.total_emissions,
                                        ) /
                                            totalEmissions) *
                                            100 || 0
                                    ).toFixed()}
                                    % de tus emisiones totales.
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
                </>
            ) : (
                <p className="flex justify-center items-center w-full h-full font-bold text-emerald-800">
                    Aun no tienes registros.
                </p>
            )}
        </div>
    );
}
