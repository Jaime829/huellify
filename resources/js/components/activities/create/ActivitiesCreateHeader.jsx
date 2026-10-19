import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { route } from "ziggy-js";

export default function ActivitiesCreateHeader() {
    return (
        <div className="flex flex-col">
            <Link href={route('activities.index')} className="pl-2 flex gap-1 items-center text-green-700 font-semibold text-[14px]">
                <ArrowLeft size={15} /> Volver a actividades
            </Link>
            <div className="flex items-center gap-1">
                <div className="w-16 h-16">
                    <img src="/images/assets/leaf-asset.png" alt="Asset leaf" />
                </div>
                <div>
                    <h1 className="text-green-700 font-bold text-2xl">
                        Registrar actividad
                    </h1>
                    <p className="text-gray-400 text-[14px]">
                        Completa la información para calcular la huella de
                        carbono de tu actividad.
                    </p>
                </div>
            </div>
        </div>
    );
}
