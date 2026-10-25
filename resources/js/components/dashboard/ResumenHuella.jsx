import { IconLeafFilled } from "@tabler/icons-react";
import IconItemsDashboard from "./IconItemsDashboard";
import { authUser } from "@/stores/user-store";

export default function ResumenHuella({ isPrincipal = true }) {
    const last_footprint = authUser().last_footprint;

    return (
        <div
            className={`${isPrincipal ? "shadow p-4 rounded-md h-40 max-h-48  bg-white" : ""}  flex flex-col justify-between gap-1`}
        >
            {isPrincipal && (
                <IconItemsDashboard
                    icon={IconLeafFilled}
                    colorIcon={"text-green-900"}
                    bg={"bg-green-800/10"}
                />
            )}
            <div className="flex flex-col gap-1">
                <p
                    className={` ${isPrincipal ? "font-semibold text-gray-800 " : "order-1 text-gray-500 text-[14px]"} `}
                >
                    Huella de carbono Total
                </p>
                <p
                    className={`font-bold text-xl text-gray-800 ${isPrincipal ? "" : "-order-1"}`}
                >
                    {last_footprint ? Number(last_footprint.total_emissions).toFixed(2) : 0}{" "}
                    <span className="text-[16px] font-medium text-gray-600 text-sm">
                        Kg CO<sub>2</sub>E
                    </span>
                </p>
            </div>
        </div>
    );
}
