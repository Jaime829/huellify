import IconItemsDashboard from "@/components/dashboard/IconItemsDashboard";
import { IconBulb } from "@tabler/icons-react";
import React from "react";

export default function DatoCurioso() {
    return (
        <div className="flex p-2 bg-green-600/10 rounded-md">
            <IconItemsDashboard
                icon={IconBulb}
                colorIcon={"text-green-800"}
                bg={"bg-green-500/10"}
            />
            <div className="p-2 flex flex-col gap-2">
                <p className="text-emerald-700 font-semibold text-[12px]">¿Sabías que...?</p>
                <p className="text-emerald-700/70 text-[14px]">Un viaje de 50km en automóvil promedio puede generar entre 10 y 15 kg de CO<sub>2</sub>e, dependiendo del tipo de vehículo y combustible.</p>
            </div>
        </div>
    );
}
