import { IconLeafFilled } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { Search } from "lucide-react";
import { route } from "ziggy-js";

export default function HabitsHeader() {
    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-20 h-20 aspect-square bg-emerald-600/10 text-emerald-700 rounded-full">
                    <IconLeafFilled size={40} />
                </div>
                <div>
                    <h1 className="text-emerald-900 text-3xl font-bold">
                        Mis hábitos
                    </h1>
                    <p className="text-gray-500">
                        Adopta y sigue hábitos sostenibles para un mayor impacto
                        positivo.
                    </p>
                </div>
            </div>
            <Link
                href={route("dashboard.habits.explore")}
                className="flex items-center gap-1 bg-emerald-700 text-white p-2 rounded-lg text-[14px] transition-colors ease-in-out delay-75 hover:bg-emerald-800"
            >
                <Search size={20} /> Explorar hábitos
            </Link>
        </header>
    );
}
