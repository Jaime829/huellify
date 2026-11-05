import ActivitiesResumen from "./ActivitiesResumen";
import LatestActivities from "./LatestActivities";
import { router, usePage } from "@inertiajs/react";
import { authUser } from "@/stores/user-store";
import LateralInformation from "./LateralInformation";
import activityIcon from "../util/ActivityIcon";

export default function ActivitiesMain({ lateralController }) {
    const activityCategories = authUser().activitiesCategory;

    const urlParams = new URLSearchParams(window.location.search);
    const activeFilter = urlParams.get("category_type") || "all";

    const filtrarPorTipo = (tipo) => {
        router.get(
            window.location.pathname,
            { category_type: tipo },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="p-4 border-t border-gray-200 flex flex-col gap-4 max-w-full">
            <nav className="flex flex-wrap items-center gap-3">
                <button
                    className={`${activeFilter === "all" ? "bg-emerald-700 text-white" : "bg-white text text-gray-500"} flex items-center justify-center  h-8 w-28 shadow rounded-md cursor-pointer font-medium text-[12px] `}
                    onClick={() => filtrarPorTipo("all")}
                >
                    Todas
                </button>
                {activityCategories.map((activity) => {
                    const nombreActividad = activity.name
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    const IconComponent = activityIcon(nombreActividad);

                    return (
                        <button
                            className={`${activeFilter == activity.id ? "bg-emerald-700 text-white" : "bg-white text text-gray-500"} flex items-center justify-center gap-1 bg-emerald-700 h-8 w-28 shadow rounded-md cursor-pointer font-medium text-[12px]`}
                            key={activity.id}
                            onClick={() => filtrarPorTipo(activity.id)}
                        >
                            <IconComponent size={18} /> {activity.name}
                        </button>
                    );
                })}
            </nav>
            <ActivitiesResumen />
            {!lateralController && <LateralInformation />}

            <LatestActivities />
        </div>
    );
}
