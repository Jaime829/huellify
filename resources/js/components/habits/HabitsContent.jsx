import {
    IconChartBarPopular,
    IconCircleCheckFilled,
    IconLeafFilled,
} from "@tabler/icons-react";
import HabitCard from "./HabitCard";
import MyHabitsTable from "./MyHabitsTable";
import { usePage } from "@inertiajs/react";
import { authUser } from "@/stores/user-store";

export default function HabitsContent() {
    const { numberAdoptedHabits, numberActiveHabits, monthActions } =
        usePage().props;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3">
                <HabitCard
                    icon={IconLeafFilled}
                    title={"Hábitos adoptados"}
                    value={numberAdoptedHabits}
                    text={"En total"}
                />
                <HabitCard
                    icon={IconCircleCheckFilled}
                    title={"Hábitos activos"}
                    value={numberActiveHabits}
                    text={"Actualmente en práctica"}
                />
                <HabitCard
                    icon={IconChartBarPopular}
                    title={"Acciones este mes"}
                    value={monthActions}
                    text={"Registros realizados"}
                />
            </div>
            <MyHabitsTable />
        </div>
    );
}
