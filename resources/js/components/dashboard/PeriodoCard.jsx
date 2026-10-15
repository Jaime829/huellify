import { Calendar, ChevronRight, Leaf } from "lucide-react";
import IconItemsDashboard from "./IconItemsDashboard";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export default function PeriodoCard() {
    const fecha = new Date();
    const mes = fecha.getMonth();
    const year = fecha.getFullYear();
    const fechaInicio = new Date(year, mes, 1);
    const fechaFin = new Date(year, mes + 1, 0);
    const opcionesFecha = { day: "2-digit", month: "short", year: "numeric" };

    return (
        <div className="bg-green-500/10 max-h-40 rounded-xl p-4 flex gap-2 relative">
            <IconItemsDashboard
                icon={Leaf}
                colorIcon={"text-emerald-900"}
                bg={"bg-emerald-800/20"}
            />

            <div className="flex flex-col gap-2">
                <p className="text-gray-500 text-sm font-medium">
                    Periodo actual
                </p>
                <p className="text-emerald-900 font-bold">
                    {fecha.toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                    })}
                </p>
                <small className="flex items-center gap-1 text-gray-500">
                    <Calendar className="size-5" />{" "}
                    {fechaInicio.toLocaleDateString("es-ES", opcionesFecha)} -{" "}
                    {fechaFin.toLocaleDateString("es-ES", opcionesFecha)}
                </small>
            </div>

            <a href="#" className="absolute top-10 right-4">
                <ChevronRight />
            </a>
        </div>
    );
}
