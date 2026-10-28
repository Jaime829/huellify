import {
    IconBoltFilled,
    IconCarFilled,
    IconLeafFilled,
    IconToolsKitchen2Filled,
    IconTrash,
} from "@tabler/icons-react";

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

export default function activityIcon(activityName) {
    return activitiesType[activityName].icon;
}
