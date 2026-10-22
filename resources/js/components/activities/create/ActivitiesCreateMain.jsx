import {
    IconBoltFilled,
    IconCarFilled,
    IconLeafFilled,
    IconToolsKitchen2Filled,
    IconTrash,
} from "@tabler/icons-react";
import { authUser } from "@/stores/user-store";
import { useState } from "react";
import FormularioTransporte from "./FormularioTransporte";
import FormularioEnergia from "./FormularioEnergia";
import FormularioResiduos from "./FormularioResiduos";
import HeadSeccionActivitiesForm from "./HeadSeccionActivitiesForm";

const activitiesType = {
    transporte: {
        icon: IconCarFilled,
    },
    energia: {
        icon: IconBoltFilled,
    },
    habitos: {
        icon: IconLeafFilled,
    },
    alimentacion: {
        icon: IconToolsKitchen2Filled,
    },
    residuos: {
        icon: IconTrash,
    },
};

export default function ActivitiesCreateMain() {
    const activitiesCategory = authUser().activitiesCategory;

    const [category, setCategory] = useState("transporte");

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex flex-col gap-4 border-b border-gray-200">
                <HeadSeccionActivitiesForm
                    number={1}
                    title={"Tipo de actividad"}
                    description={
                        "Selecciona la categoria de la actividad que vas a registrar."
                    }
                />

                <div className="flex gap-2 p-4 justify-center">
                    {activitiesCategory.map((activity) => {
                        const nombreActividad = activity.name
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                        const IconComponent =
                            activitiesType[nombreActividad].icon;

                        return (
                            <button
                                onClick={() => {
                                    if (nombreActividad !== category) {
                                        setCategory(nombreActividad);
                                    }
                                }}
                                className={`${category === nombreActividad ? "bg-emerald-500/10 border-emerald-700" : "border-gray-200 transition-all ease-in-out delay-75 hover:bg-emerald-500/10 hover:border-emerald-700"} w-28 h-20 font-medium text-[14px] cursor-pointer rounded-md flex flex-col gap-2 text-emerald-800 items-center border-2  justify-center`}
                                key={activity.id}
                            >
                                <IconComponent />
                                <p>{activity.name}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {category === "transporte" && <FormularioTransporte />}
            {category === "energia" && <FormularioEnergia />}
            {category === "residuos" && <FormularioResiduos />}
        </div>
    );
}
