import SafeDBIcon from "@/components/util/SafeDBIcon";
import StatusIndicator from "@/components/util/StatusIndicator";
import { usePage } from "@inertiajs/react";
import {
    IconCalendarCheck,
    IconCalendarStar,
    IconChevronDown,
    IconChevronUp,
    IconDatabase,
    IconNote,
} from "@tabler/icons-react";
import { Eye, PencilIcon, Trash2Icon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Clock, Target } from "lucide-react";
import InfoCardHistory from "./InfoCardHistory";
import { useState } from "react";

export default function UserHabitHistoryContent() {
    const {
        userHabit,
        monthActions,
        totalActions,
        dateLastAction,
        dateFirstAction,
        userHabitActions,
    } = usePage().props;
    console.log(userHabit);

    const dateLastActionFormateado = new Date(
        dateLastAction.recorded_at.replace(/-/g, "\/"),
    ).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    const dateFirstActionFormateado = new Date(
        dateFirstAction.recorded_at.replace(/-/g, "\/"),
    ).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const [isOpenActions, setIsOpenActions] = useState(false);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 p-4 bg-white rounded-lg border relative">
                <div
                    className={`${userHabit.habit.habit_category_id == 1 ? "bg-green-500/20 text-emerald-700" : "text-blue-700 bg-blue-500/20"} flex items-center justify-center h-20 aspect-square rounded-full`}
                >
                    <SafeDBIcon
                        svgRawString={userHabit.habit.icon}
                        className="scale-200"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-xl text-gray-800">
                        {userHabit.habit.name}
                    </h1>
                    <span
                        className={`${userHabit.habit.habit_category_id == 1 ? "text-emerald-800 bg-green-500/20" : "text-blue-800 bg-blue-500/20"} px-2 py-0.5 rounded-xl w-fit flex items-center justify-center text-[12px] font-semibold`}
                    >
                        {userHabit.habit.habit_category.name}
                    </span>
                    <p className="text-gray-600 text-[14px]">
                        {userHabit.habit.instructions}
                    </p>
                    <p className="flex items-center gap-1 text-[14px] text-gray-700">
                        <Target size={15} /> Objetivo semanal:{" "}
                        <span className="font-bold text-gray-800">
                            {Number(userHabit.weekly_target)}{" "}
                            {userHabit.habit.measurement_unit_id
                                ? "Unidad"
                                : "Veces"}
                        </span>
                    </p>
                </div>
                <StatusIndicator
                    status={userHabit.status}
                    className="absolute bottom-2 left-2 md:left-[unset] md:bottom-[unset] md:top-4 md:right-4"
                />
            </div>
            <div className="flex gap-4">
                <InfoCardHistory
                    icon={IconDatabase}
                    value={totalActions}
                    description={"Total de registros"}
                />
                <InfoCardHistory
                    icon={Calendar}
                    value={monthActions}
                    description={"Este mes"}
                />
                <InfoCardHistory
                    icon={IconCalendarStar}
                    value={dateFirstActionFormateado}
                    description={"Primer registro"}
                />
                <InfoCardHistory
                    icon={IconCalendarCheck}
                    value={dateLastActionFormateado}
                    description={"Último registro"}
                />
            </div>
            <div className="flex flex-col gap-4 p-4 border rounded-lg bg-white">
                <header className="flex justify-between">
                    <div className="flex gap-2">
                        <Clock color="#007a55" />
                        <h2 className="text-gray-800 font-semibold text-[18px]">
                            Historial de registros
                        </h2>
                    </div>
                    <div>filtros</div>
                </header>
                <div className="flex flex-col gap-2">
                    {userHabitActions.data.map((action) => {
                        const recordedAt = new Date(
                            action.recorded_at.replaceAll("-", "/"),
                        ).toLocaleDateString("es-CO", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        });
                        console.log(action);
                        console.log(recordedAt);
                        return (
                            <div
                                key={action.id}
                                className="border p-2 rounded-xl flex justify-between items-center gap-4"
                            >
                                <div className="flex gap-4 items-center w-1/2">
                                    <div className="h-14 w-14 aspect-square flex items-center justify-center rounded-full bg-green-500/20 text-emerald-700">
                                        <SafeDBIcon
                                            className="scale-150"
                                            svgRawString={
                                                action.user_habit.habit.icon
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col border-gray-300">
                                        <p className="font-semibold text-gray-800">
                                            {recordedAt}
                                        </p>
                                    </div>
                                    {action.quantity ? (
                                        <p className="text-[16px] px-4 border-x font-semibold text-gray-800">
                                            {action.quantity}
                                        </p>
                                    ) : (
                                        <small className="flex items-center gap-1  text-gray-700 font-medium text-[14px] bg-green-400/10 px-2 py-1 rounded-xl">
                                            Completado
                                        </small>
                                    )}
                                </div>
                                <div>
                                    {action.notes && (
                                        <small className="flex items-center gap-1 text-gray-700 font-medium text-[14px] bg-green-400/10 px-2 py-1 rounded-xl">
                                            <IconNote color="#007955" />
                                            {action.notes}
                                        </small>
                                    )}
                                </div>
                                <DropdownMenu
                                    open={isOpenActions}
                                    onOpenChange={setIsOpenActions}
                                >
                                    <DropdownMenuTrigger asChild>
                                        <button className="cursor-pointer focus:outline-none">
                                            {isOpenActions ? (
                                                <IconChevronUp />
                                            ) : (
                                                <IconChevronDown />
                                            )}
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className={"mr-2 "}>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem
                                                className={"text-[12px]"}
                                                onClick={() =>
                                                    console.log("Ver")
                                                }
                                            >
                                                <Eye />
                                                Ver detalles
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className={"text-[12px]"}
                                                onClick={() =>
                                                    console.log("Editar")
                                                }
                                            >
                                                <PencilIcon />
                                                Editar registro
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem
                                                className={"text-[12px]"}
                                                variant="destructive"
                                                onClick={() =>
                                                    console.log("eliminar")
                                                }
                                            >
                                                <Trash2Icon />
                                                Eliminar registro
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
