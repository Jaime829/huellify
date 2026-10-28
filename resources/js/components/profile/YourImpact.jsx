import { authUser } from "@/stores/user-store";
import { IconLeafFilled } from "@tabler/icons-react";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function () {
    const fecha = new Date();
    const periodoActual = authUser().periods.filter(
        (period) =>
            period.name ===
            fecha.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric",
            }),
    );
    console.log(periodoActual[0]);

    return (
        <div className="bg-white rounded-md shadow flex flex-col gap-3 col-span-2 p-4">
            <div className="flex gap-2 items-center">
                <div className="flex items-center justify-center rounded-full bg-green-600/10 text-emerald-800 w-16 h-16">
                    <IconLeafFilled size={35} />
                </div>
                <p className="text-emerald-800 font-bold text-[18px]">
                    Tu impacto
                </p>
            </div>
            <div className="p-4 bg-green-600/10 rounded-md flex justify-between">
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-[16px] text-gray-700">
                        Huella de carbono total
                    </p>
                    {periodoActual[0] ? (
                        <>
                            <p className="font-bold text-2xl text-gray-700">
                                {Number(
                                    periodoActual[0].total_emissions,
                                ).toFixed(2)}{" "}
                                kg CO<sub>2</sub>e
                            </p>
                            <p
                                className={`${Number(periodoActual[0].variation_percentage) > 0 ? "text-red-600" : "text-emerald-700"} flex items-center gap-1 text-[16px] font-medium text-green-600`}
                            >
                                {periodoActual[0].variation_percentage}%
                                {Number(periodoActual[0].variation_percentage) >
                                0 ? (
                                    <ArrowUp size={15} />
                                ) : (
                                    <ArrowDown size={15} />
                                )}
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-500 font-semibold">
                            Aun no tienes registro
                        </p>
                    )}
                </div>
                <div className="w-20 h-20 rounded-full bg-green-600/10 text-emerald-800 flex items-center justify-center">
                    <IconLeafFilled size={45} />
                </div>
            </div>
        </div>
    );
}
