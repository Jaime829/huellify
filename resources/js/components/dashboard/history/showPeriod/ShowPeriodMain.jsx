import { Link, usePage } from "@inertiajs/react";
import React from "react";
import ShowPeriodContent from "./ShowPeriodContent";
import { ChevronLeft } from "lucide-react";

export default function ShowPeriodMain() {
    const { name } = usePage().props.period;
    return (
        <div className="flex flex-col gap-4 px-6 pt-6 pb-24 xl:pb-6">
            <Link
                className="flex gap-1 items-center w-fit text-[14px] font-medium"
                href={route("dashboard.history")}
            >
                <ChevronLeft /> Volver al historial
            </Link>
            <div>
                <h1 className="text-emerald-950 font-semibold text-2xl">
                    {name}
                </h1>
                <p className="text-gray-700">
                    Detalle de tu huella de carbono durante este período.
                </p>
            </div>
            <ShowPeriodContent />
        </div>
    );
}
