import React from "react";
import MobileNavEnlace from "./MobileNavEnlace";
import { HomeIcon, Leaf, StarIcon, User2 } from "lucide-react";
import { IconChartBar } from "@tabler/icons-react";
import { route } from "ziggy-js";

export default function MobileBar() {
    return (
        <nav className="flex items-center justify-around border-t border-gray-100 shadow w-screen h-20 fixed bottom-0 z-50 md:hidden bg-white">
            <MobileNavEnlace
                icon={HomeIcon}
                text={"Inicio"}
                url={route("dashboard.index")}
            />
            <MobileNavEnlace
                icon={Leaf}
                text={"Actividades"}
                url={route("activities.index")}
            />
            <MobileNavEnlace icon={IconChartBar} text={"Historial"} url={"#"} />
            <MobileNavEnlace icon={StarIcon} text={"Recomendacion"} url={"#"} />
            <MobileNavEnlace icon={User2} text={"Perfil"} url={"#"} />
        </nav>
    );
}
