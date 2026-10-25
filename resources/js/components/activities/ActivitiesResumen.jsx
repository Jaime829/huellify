import { IconLeafFilled } from "@tabler/icons-react";
import PeriodoCard from "../dashboard/PeriodoCard";
import { authUser } from "@/stores/user-store";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function ActivitiesResumen() {
    const last_footprint = authUser().last_footprint;
    const fecha = new Date();
    const periodoActual = authUser().periods.filter(
        (period) =>
            period.name ===
            fecha.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric",
            }),
    );
    return (
        <div className="bg-green-500/10 p-4 rounded-md flex flex-col xl:flex-row xl:justify-between xl:items-center shadow">
            <div className="flex gap-4">
                <div className="flex gap-3">
                    <div className="flex items-center justify-center rounded-full bg-green-600/10 text-emerald-800 w-12 h-12">
                        <IconLeafFilled size={30} />
                    </div>
                    <div>
                        <p className="text-emerald-800 font-medium">
                            Total de emisiones (este periodo)
                        </p>
                        <h2 className="text-emerald-900 font-bold text-2xl">
                            {last_footprint
                                ? Number(
                                      last_footprint.total_emissions,
                                  ).toFixed(2)
                                : 0}{" "}
                            <span className="font-medium text-[18px]">
                                kg CO<sub>2</sub>e
                            </span>
                        </h2>
                    </div>
                </div>
                <div
                    className={`${Number(periodoActual[0].variation_percentage) > 0 ? "text-red-600" : "text-emerald-700"}`}
                >
                    <p className="font-medium">
                        {periodoActual[0].variation_percentage}%
                    </p>
                    <small className="flex items-center gap-1">
                        {Number(periodoActual[0].variation_percentage) > 0 ? (
                            <ArrowUp size={15} />
                        ) : (
                            <ArrowDown size={15} />
                        )}
                        vs. periodo anterior
                    </small>
                </div>
            </div>
            <PeriodoCard isPrincipal={false} />
        </div>
    );
}
