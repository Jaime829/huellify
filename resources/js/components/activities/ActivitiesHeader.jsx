import { Link } from "@inertiajs/react";
import { IconLeafFilled } from "@tabler/icons-react";
import { Plus } from "lucide-react";
import { route } from "ziggy-js";

export default function ActivitiesHeader() {
    return (
        <header className="flex justify-between items-center pb-4 pt-2 max-w-full">
            <div className="flex gap-2 items-center">
                <div className="flex items-center justify-center rounded-full bg-green-600/10 text-emerald-800 w-12 h-12">
                    <IconLeafFilled size={30} />
                </div>
                <div>
                    <h1 className="text-green-900 font-bold leading-7  text-3xl">
                        Actividades
                    </h1>
                    <p className="text-gray-400 text-[14px]">
                        Registra y gestiona tus actividades diarias para
                        calcular tu huella de carbono.
                    </p>
                </div>
            </div>
            <Link
                href={route("activities.create")}
                className="text-white bg-emerald-700 flex font-medium items-center gap-1 text-[10px] lg:text-[12px] p-2 rounded-md transition-colors ease-in-out delay-75 cursor-pointer hover:bg-emerald-900"
            >
                <Plus /> Registrar actividadad
            </Link>
        </header>
    );
}
