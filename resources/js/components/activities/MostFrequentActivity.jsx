import { Car, ChevronRight } from "lucide-react";
import IconItemsDashboard from "../dashboard/IconItemsDashboard";
import { Link } from "@inertiajs/react";
import { authUser } from "@/stores/user-store";

export default function MostFrequentActivity() {
    const footPrint = authUser().last_footprint?.total_emissions ?? 0;
    const mostFrequentActivity = authUser().mostFrequentActivity;
    return (
        <div className="p-4 flex flex-col gap-3 bg-white shadow rounded-md">
            <div className="flex gap-2 items-center">
                <IconItemsDashboard
                    icon={Car}
                    colorIcon={"text-green-800"}
                    bg={"bg-green-500/10"}
                />
                <p className="text-emerald-900 font-semibold text-[14px]">
                    Actividad más frecuente
                </p>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold text-emerald-900 text-[14px]">
                        {mostFrequentActivity.name}
                    </p>
                    <p className="text-gray-500 font-semibold text-[12px]">
                        {(mostFrequentActivity.total_emissions / footPrint) *
                            100}
                        % del total
                    </p>
                    <p className="font-semibold text-gray-700 text-[16px]">
                        {Number(mostFrequentActivity.total_emissions).toFixed(
                            2,
                        )}{" "}
                        Kg CO
                        <sub>2</sub>e
                    </p>
                </div>
                <Link>
                    <ChevronRight />
                </Link>
            </div>
        </div>
    );
}
