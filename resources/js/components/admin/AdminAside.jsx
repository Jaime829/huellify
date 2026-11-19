import { route } from "ziggy-js";
import AdminNavEnlace from "./AdminNavEnlace";
import {
    IconChartAreaLineFilled,
    IconDatabaseFilled,
    IconHomeFilled,
} from "@tabler/icons-react";
import { ArrowLeft, LogOut } from "lucide-react";
import { router } from "@inertiajs/react";

export default function AdminAside() {
    return (
        <aside className="z-100 hidden md:flex flex-col gap-6 p-2 bg-teal-800 h-dvh max-w-72 sticky top-0 left-0 rounded-tr-md">
            <div className="max-w-full w-44 h-fit">
                <img className="" src="/images/logo-admin.webp" alt="" />
            </div>
            <nav className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 pb-8 border-b border-teal-600">
                    <AdminNavEnlace
                        texto={"Dashboard"}
                        url={route("admin.index")}
                        icon={IconHomeFilled}
                    />
                    <AdminNavEnlace
                        texto={"Factores de emisión"}
                        url={route("admin.emissions.index")}
                        icon={IconDatabaseFilled}
                    />
                    <AdminNavEnlace
                        texto={"Métricas de recomendaciones"}
                        url={route("admin.recommendations.metrics")}
                        icon={IconChartAreaLineFilled}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <AdminNavEnlace
                        texto={"Volver a la plataforma"}
                        url={route("dashboard.index")}
                        icon={ArrowLeft}
                    />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.post(route("auth.logout"));
                        }}
                        className="w-full"
                    >
                        <button
                            type="submit"
                            className="w-full flex items-center gap-2 p-2 rounded-lg text-white font-medium text-[14px] transition-colors hover:bg-teal-600/60 cursor-pointer"
                        >
                            <LogOut /> <span>Cerrar sesión</span>
                        </button>
                    </form>
                </div>
            </nav>
        </aside>
    );
}
