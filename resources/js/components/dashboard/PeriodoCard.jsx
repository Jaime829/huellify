import { Calendar, ChevronRight } from "lucide-react";
import IconItemsDashboard from "./IconItemsDashboard";
import { authUser } from "@/stores/user-store";

export default function PeriodoCard({ isPrincipal = true }) {
    const fecha = new Date();
    const mes = fecha.getMonth();
    const year = fecha.getFullYear();
    const fechaInicio = new Date(year, mes, 1);
    const fechaFin = new Date(year, mes + 1, 0);
    const opcionesFecha = { day: "2-digit", month: "short", year: "numeric" };
    const periodoActual = authUser().periods.filter(
        (period) =>
            period.name ===
            fecha.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric",
            }),
    );
    return (
        <div
            className={`${isPrincipal ? "bg-green-500/10" : ""}  lg:max-h-40 h-full rounded-xl px-4 py-3 flex flex-col gap-2 relative`}
        >
            <div className="flex gap-2 items-center flex-wrap">
                <IconItemsDashboard
                    icon={Calendar}
                    colorIcon={"text-emerald-900"}
                    bg={"bg-emerald-800/10"}
                />
                <p className="text-gray-500 text-sm font-medium">
                    Periodo actual
                </p>
                <a href="#" className="">
                    <ChevronRight />
                </a>
            </div>
            <div className="px-2">
                <div className="flex gap-2 flex-col">
                    <p className="text-emerald-900 font-bold text-[15px]">
                        {fecha.toLocaleDateString("es-ES", {
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <small className="flex items-center gap-1 text-gray-500">
                        <Calendar className="size-5" />{" "}
                        {fechaInicio.toLocaleDateString("es-ES", opcionesFecha)}{" "}
                        - {fechaFin.toLocaleDateString("es-ES", opcionesFecha)}
                    </small>
                </div>
            </div>
        </div>
    );
}
