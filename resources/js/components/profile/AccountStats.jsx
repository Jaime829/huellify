import { authUser } from "@/stores/user-store";
import { IconChartBarPopular } from "@tabler/icons-react";

export default function AccountStats() {
    const diasActivo = authUser().dias_activos;
    const user = authUser().user;
    const ultimoLogin = new Date(user.last_login);
    const opcionesFecha = { day: "2-digit", month: "short", year: "numeric" };

    return (
        <div className="col-span-1 lg:col-span-2 rounded-md flex flex-col gap-4 bg-white shadow p-4">
            <div className="flex gap-2 items-center">
                <div className="w-8 h-8 p-2 rounded-full bg-green-600/10 flex items-center justify-center text-emerald-800">
                    <IconChartBarPopular size={20} />
                </div>
                <p className="font-bold">Estadísticas de tu cuenta</p>
            </div>
            <div className="w-full flex flex-wrap gap-3">
                <div className="w-1/2 border-r border-gray-200">
                    <p className="text-gray-500">Días activos</p>
                    <p className="font-bold">{diasActivo}</p>
                    <small className="text-gray-500">de los ultimos 30 días</small>
                </div>
                <div className="w-1/2">
                    <p className="text-gray-500">Último acceso</p>
                    <p className="font-medium">
                        {ultimoLogin.toLocaleDateString("es-ES", opcionesFecha)}
                    </p>
                    <small className="text-gray-700 font-medium">
                        {ultimoLogin.toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </small>
                </div>
            </div>
        </div>
    );
}
