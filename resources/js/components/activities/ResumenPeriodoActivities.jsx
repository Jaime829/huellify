import { IconLeafFilled } from "@tabler/icons-react";
import CardTorta from "../dashboard/CardTorta";
import IconItemsDashboard from "../dashboard/IconItemsDashboard";
import ResumenHuella from "../dashboard/ResumenHuella";
import { authUser } from "@/stores/user-store";
export default function ResumenPeriodoActivities() {

    return (
        <div className="flex flex-col bg-white shadow p-4 rounded-md">
            <div className="flex gap-2 items-center font-semibold text-[14px]">
                <IconItemsDashboard
                    icon={IconLeafFilled}
                    colorIcon={"text-green-800"}
                    bg={"bg-green-500/10"}
                />
                <p className="text-emerald-900">Resumen del periodo</p>
            </div>
            <ResumenHuella isPrincipal={false} value={2432} />
            <CardTorta wrap={true} />
        </div>
    );
}
