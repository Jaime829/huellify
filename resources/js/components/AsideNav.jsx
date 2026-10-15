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
                        <Collapsible className="w-full">
                            <CollapsibleTrigger className="cursor-pointer w-full flex items-center gap-1 text-sm text-gray-600 transition-colors delay-100 ease-in-out hover:bg-green-600/30 hover:text-emerald-800 p-2 rounded-md">
                                <Calendar className="size-5" /> Actividades{" "}
                                {<ChevronDown className="size-5" />}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-6">
                                <NavEnlace
                                    url={"#"}
                                    texto={"Registrar actividad"}
                                />
                                <NavEnlace url={"#"} texto={"Mis registros"} />
                            </CollapsibleContent>
                        </Collapsible>
                        <NavEnlace url={"#"} texto={"Transporte"} icon={Car} />
                        <NavEnlace url={"#"} texto={"Energia"} icon={Zap} />
                        <NavEnlace url={"#"} texto={"Habitos"} icon={Leaf} />
                        <NavEnlace
                            url={"#"}
                            texto={"Historial"}
                            icon={RotateCcwClock}
                        />
                        <NavEnlace
                            url={"#"}
                            texto={"Recomendaciones"}
                            icon={Lightbulb}
                        />
                        <NavEnlace url={"#"} texto={"Perfil"} icon={User} />
                    </nav>
                </div>
                <QuoteNav className="shrink-0" />
            </aside>
        </>
    );
}
