import { IconLeafFilled } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { route } from "ziggy-js";

export default function HabitsHeader() {
    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-16 h-16 aspect-square bg-emerald-600/10 text-emerald-700 rounded-full">
                    <IconLeafFilled size={40} />
                </div>
                <div>
                    <h1 className="text-emerald-900 text-3xl font-bold">
                        Hábitos
                    </h1>
                    <p className="text-gray-500">
                        Adopta y sigue hábitos sostenibles para reducir tu
                        huella de carbono.
                    </p>
                </div>
            </div>
            <Link
                href={route("dashboard.habits.explore")}
                className="flex items-center bg-emerald-700 text-white p-2 rounded-lg text-[14px] transition-colors ease-in-out delay-75 hover:bg-emerald-800"
            >
                <Plus /> Explorar hábitos
            </Link>
        </header>
    );
}
