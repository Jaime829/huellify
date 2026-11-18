import React from "react";
import NavEnlace from "./NavEnlace";
import { route } from "ziggy-js";

import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import {
    Leaf,
    Calculator,
    History,
    ChartNoAxesCombined,
    House,
    Car,
    Zap,
    RotateCcwClock,
    Lightbulb,
    User,
    ChevronDown,
    Calendar,
} from "lucide-react";
import QuoteNav from "./QuoteNav";
import Logo from "./Logo";

export default function AsideNav() {
    return (
        <>
            <aside className="hidden md:bg-white md:border-r md:sticky md:border-gray-300 md:h-screen md:max-w-64 md:p-4 md:flex md:flex-col md:justify-between md:top-0">
                <div className="flex flex-col flex-1">
                    <Logo />

                    <nav className="flex flex-col gap-2">
                        <NavEnlace
                            url={route("dashboard.index")}
                            texto={"Dashboard"}
                            icon={House}
                        />
                        <NavEnlace
                            url={route("dashboard.activities.index")}
                            texto={"Actividades"}
                            icon={Calendar}
                        />
                        <NavEnlace
                            url={route("dashboard.myhabits")}
                            texto={"Habitos"}
                            icon={Leaf}
                        />
                        <NavEnlace
                            url={route("dashboard.history")}
                            texto={"Historial"}
                            icon={RotateCcwClock}
                        />
                        <NavEnlace
                            url={route("dashboard.recommendations")}
                            texto={"Recomendaciones"}
                            icon={Lightbulb}
                        />
                        <NavEnlace
                            url={route("dashboard.profile")}
                            texto={"Perfil"}
                            icon={User}
                        />
                    </nav>
                </div>
                <QuoteNav className="shrink-0" />
            </aside>
        </>
    );
}
