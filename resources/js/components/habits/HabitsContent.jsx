import {
    IconChartBarPopular,
    IconCircleCheckFilled,
    IconLeafFilled,
} from "@tabler/icons-react";
import HabitCard from "./HabitCard";
import MyHabitsTable from "./MyHabitsTable";

export default function HabitsContent() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <HabitCard
                    icon={IconLeafFilled}
                    title={"Hábitos adoptados"}
                    value={5}
                    text={"de recomendaciones"}
                />
                <HabitCard
                    icon={IconCircleCheckFilled}
                    title={"Hábitos activos"}
                    value={3}
                    text={"en seguimiento"}
                />
                <HabitCard
                    icon={IconChartBarPopular}
                    title={"Acciones este mes"}
                    value={12}
                    text={"registradas"}
                />
            </div>
            <MyHabitsTable />
        </div>
    );
}
