import { authUser } from "@/stores/user-store";
import { usePage } from "@inertiajs/react";
import { IconLeafFilled } from "@tabler/icons-react";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function () {
    const { actualPeriod } = usePage().props;


    return (
        <div className="bg-white rounded-md shadow flex flex-col gap-3 col-span-1 lg:col-span-2 p-4">
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
                    {actualPeriod ? (
                        <>
                            <p className="font-bold text-2xl text-gray-700">
                                {Number(
                                    actualPeriod.carbon_footprint
                                        .total_emissions,
                                ).toFixed(2)}{" "}
                                kg CO<sub>2</sub>e
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
