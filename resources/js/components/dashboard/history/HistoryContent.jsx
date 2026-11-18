import React from "react";
import HistoryInfoCard from "./HistoryInfoCard";
import { ArrowRight, Calendar, List, PlusCircle } from "lucide-react";
import { IconChartBar, IconLeafFilled } from "@tabler/icons-react";
import GraficoEmisiones from "../GraficoEmisiones";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import TortaPeriod from "./TortaPeriod";

export default function HistoryContent() {
    const { periods, lastestFootPrint, promedioEmisiones } = usePage().props;

    if (!periods || periods.data.length === 0) {
        return (
            <div className="p-4 rounded-lg border flex flex-col gap-4 items-center h-fit w-2/3 mx-auto my-0">
                <div className="h-[40%]">
                    <img
                        className="w-full h-full object-cover"
                        src="/images/assets/asset-footprint.webp"
                        alt=""
                    />
                </div>
                <p className="font-bold text-gray-800 text-[22px]">
                    Aún no tienes resultados en tu historial
                </p>
                <p className="text-gray-700 text-center">
                    Cuando registres actividades y se guarden los resultados de
                    tu huella de carbono, podrás consultar aquí tu evolucion a
                    lo largo del tiempo.
                </p>
                <Link
                    href={route("dashboard.activities.index")}
                    className="flex items-center gap-2 p-2  bg-emerald-600 text-white rounded-lg transition-colors hover:bg-emerald-800"
                >
                    <PlusCircle /> Ir a mis actividades
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3">
                <HistoryInfoCard
                    icon={Calendar}
                    value={periods.data.length}
                    description={"Periodos registrados"}
                />
                <HistoryInfoCard
                    icon={IconLeafFilled}
                    value={`${Number(lastestFootPrint || 0).toFixed(1)} kg CO₂e`}
                    description={"Último resultado"}
                />
                <HistoryInfoCard
                    icon={IconChartBar}
                    value={`${Number(promedioEmisiones || 0).toFixed(1)} kg CO₂e`}
                    description={"Promedio de emisiones"}
                />
            </div>
            <GraficoEmisiones size={52} />

            <div className="flex flex-col gap-4 py-2">
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-gray-800 font-semibold text-[18px]">
                        <List /> Resultados por período
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    {periods.data.map((period) => {
                        return (
                            <div
                                key={period.id}
                                className="border rounded-lg bg-white p-4 flex items-center justify-between"
                            >
                                <div>
                                    <small className="text-gray-600 font-medium">
                                        {period.name}
                                    </small>
                                    <p className="font-bold">
                                        {Number(
                                            period.carbon_footprint
                                                .total_emissions,
                                        ).toFixed(1)}{" "}
                                        kg CO<sub>2</sub>e
                                    </p>
                                </div>

                                <TortaPeriod
                                    emissions_per_categories={{
                                        Transporte: period.transport_emissions,
                                        Energía: period.energy_emissions,
                                    }}
                                />

                                <Link
                                    href={route(
                                        "dashboard.history.show",
                                        period.id,
                                    )}
                                    className="flex items-center gap-2 p-2 h-fit border rounded-xl text-gray-700 font-medium transition-colors hover:bg-gray-100"
                                >
                                    Ver detalle <ArrowRight />
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center justify-end gap-2">
                    {periods.links.map((link, index) => {
                        if (!link.url) {
                            return (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded text-gray-400 bg-gray-50 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={link.url}
                                className={`${link.active ? "bg-emerald-700 text-white hover:bg-emerald-800" : "bg-white text-gray-800 hover:bg-gray-100"} px-4 py-2 rounded border transition-colors`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
