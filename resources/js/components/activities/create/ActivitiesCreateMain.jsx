import {
    IconBoltFilled,
    IconCarFilled,
    IconLeafFilled,
    IconToolsKitchen2Filled,
    IconTrash,
} from "@tabler/icons-react";
import EnumeracionSeccion from "./EnumeracionSeccion";

const activitiesType = {
    transporte: {
        icon: IconCarFilled,
        text: "Transporte",
    },
    energia: {
        icon: IconBoltFilled,
        text: "Energia",
    },
    habitos: {
        icon: IconLeafFilled,
        text: "Hábitos",
    },
    alimentacion: {
        icon: IconToolsKitchen2Filled,
        text: "Alimentación",
    },
    residuos: {
        icon: IconTrash,
        text: "Residuos",
    },
};

export default function ActivitiesCreateMain() {
    return (
        <div className="p-2 bg-white shadow rounded-md">
            <div>
                <div>
                    <EnumeracionSeccion number={1} />
                    <div>
                        <p>Tipo de actividad</p>
                        <small>Selecciona la categoria de la actividad que vas a registrar</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
