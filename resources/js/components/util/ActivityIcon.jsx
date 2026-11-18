import { IconBoltFilled, IconCarFilled } from "@tabler/icons-react";

const activitiesType = {
    transporte: {
        icon: IconCarFilled,
    },
    energia: {
        icon: IconBoltFilled,
    },
};

export default function activityIcon(activityName) {
    return activitiesType[activityName].icon;
}
