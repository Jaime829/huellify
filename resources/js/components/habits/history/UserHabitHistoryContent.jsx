import SafeDBIcon from "@/components/util/SafeDBIcon";
import StatusIndicator from "@/components/util/StatusIndicator";
import { Link, usePage } from "@inertiajs/react";
import {
    IconCalendarCheck,
    IconCalendarStar,
    IconChevronDown,
    IconChevronUp,
    IconDatabase,
    IconNote,
} from "@tabler/icons-react";
import {
    ChevronLeft,
    Eye,
    PencilIcon,
    Trash2Icon,
    TrashIcon,
} from "lucide-react";

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
import HistoryModalAction from "./HistoryModalAction";
import { route } from "ziggy-js";

export default function UserHabitHistoryContent() {
    const {
        userHabit,
        monthActions,
        totalActions,
        dateLastAction,
        dateFirstAction,
        userHabitActions,
    } = usePage().props;

    const dateLastActionFormateado = new Date(
        dateLastAction?.recorded_at.replace(/-/g, "\/"),
    ).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    const dateFirstActionFormateado = new Date(
        dateFirstAction?.recorded_at.replace(/-/g, "\/"),
    ).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const [isOpenActionsId, setIsOpenActionsId] = useState(null);
    const [modalAction, setModalAction] = useState({
        isOpen: false,
        action: null,
        actionType: null,
    });

    return (
        <div className="flex flex-col gap-4">
            <Link
                className="flex gap-1 items-center w-fit text-[14px] font-medium"
                href={route("dashboard.myhabits")}
            >
                <ChevronLeft /> Volver a Mis hábitos
            </Link>
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
                    categoryId={userHabit.habit.habit_category_id}
                />
            </div>
            <div className="flex gap-4">
                <InfoCardHistory
                    icon={IconDatabase}
                    value={totalActions}
                    description={"Total de registros"}
                    colorBg={
                        userHabit.habit.habit_category_id == 1
                            ? "bg-green-200/10"
                            : " bg-blue-200/20"
                    }
                    colorIcon={
                        userHabit.habit.habit_category_id !== 1
                            ? "#1447e6"
                            : "#007a55"
                    }
                />
                <InfoCardHistory
                    icon={Calendar}
                    value={monthActions}
                    description={"Este mes"}
                    colorBg={
                        userHabit.habit.habit_category_id == 1
                            ? "bg-green-200/10"
                            : "bg-blue-200/20"
                    }
                    colorIcon={
                        userHabit.habit.habit_category_id !== 1
                            ? "#1447e6"
                            : "#007a55"
                    }
                />
                <InfoCardHistory
                    icon={IconCalendarStar}
                    value={dateFirstActionFormateado}
                    description={"Primer registro"}
                    colorBg={
                        userHabit.habit.habit_category_id == 1
                            ? "bg-green-200/10"
                            : "bg-blue-200/20"
                    }
                    colorIcon={
                        userHabit.habit.habit_category_id !== 1
                            ? "#1447e6"
                            : "#007a55"
                    }
                />
                <InfoCardHistory
                    icon={IconCalendarCheck}
                    value={dateLastActionFormateado}
                    description={"Último registro"}
                    colorBg={
                        userHabit.habit.habit_category_id == 1
                            ? "bg-green-200/10"
                            : "bg-blue-200/20"
                    }
                    colorIcon={
                        userHabit.habit.habit_category_id !== 1
                            ? "#1447e6"
                            : "#007a55"
                    }
                />
            </div>
            <div className="flex flex-col gap-4 p-4 border rounded-lg bg-white">
                <header className="flex justify-between">
                    <div className="flex gap-2">
                        <Clock
                            color={
                                userHabit.habit.habit_category_id !== 1
                                    ? "#1447e6"
                                    : "#007a55"
                            }
                        />
                        <h2 className="text-gray-800 font-semibold text-[18px]">
                            Historial de registros
                        </h2>
                    </div>
                    <div>filtros</div>
                </header>
                <div className="flex flex-col gap-2">
                    {userHabitActions.data.length > 0 ? (
                        userHabitActions.data.map((action) => {
                            const recordedAt = new Date(
                                action.recorded_at.replaceAll("-", "/"),
                            ).toLocaleDateString("es-CO", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            });

                            return (
                                <div
                                    key={action.id}
                                    className="border p-2 rounded-xl flex justify-between items-center gap-4"
                                >
                                    <div className="flex gap-4 items-center w-1/2">
                                        <div
                                            className={`${userHabit.habit.habit_category_id == 1 ? "text-emerald-800 bg-green-500/20" : "text-blue-800 bg-blue-500/20"} h-14 w-14 aspect-square flex items-center justify-center rounded-full `}
                                        >
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
                                            <small
                                                className={`${userHabit.habit.habit_category_id == 1 ? " bg-green-400/10 text-emerald-600" : "bg-blue-400/10 text-blue-600"} flex items-center gap-1 font-medium text-[14px] px-2 py-1 rounded-xl`}
                                            >
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
                                        open={isOpenActionsId === action.id}
                                        onOpenChange={(open) => {
                                            if (open) {
                                                setIsOpenActionsId(action.id);
                                            } else {
                                                setIsOpenActionsId(null);
                                            }
                                        }}
                                    >
                                        <DropdownMenuTrigger asChild>
                                            <button className="cursor-pointer focus:outline-none">
                                                {isOpenActionsId ===
                                                action.id ? (
                                                    <IconChevronUp />
                                                ) : (
                                                    <IconChevronDown />
                                                )}
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className={"mr-2 "}
                                        >
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem
                                                    className={
                                                        "text-[12px] cursor-pointer"
                                                    }
                                                    onClick={() =>
                                                        setModalAction({
                                                            isOpen: true,
                                                            action: action,
                                                            actionType:
                                                                "details",
                                                        })
                                                    }
                                                >
                                                    <Eye />
                                                    Ver detalles
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className={
                                                        "text-[12px]  cursor-pointer"
                                                    }
                                                    onClick={() =>
                                                        setModalAction({
                                                            isOpen: true,
                                                            action: action,
                                                            actionType: "edit",
                                                        })
                                                    }
                                                >
                                                    <PencilIcon />
                                                    Editar registro
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem
                                                    className={
                                                        "text-[12px] cursor-pointer"
                                                    }
                                                    variant="destructive"
                                                    onClick={() =>
                                                        setModalAction({
                                                            isOpen: true,
                                                            action: action,
                                                            actionType:
                                                                "delete",
                                                        })
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
                        })
                    ) : (
                        <p className="text-center font-medium">
                            Aun no tienes registros
                        </p>
                    )}

                    {modalAction.action && (
                        <HistoryModalAction
                            key={modalAction.action.id}
                            modalAction={modalAction}
                            setModalAction={setModalAction}
                        />
                    )}
                </div>
                <div className="flex items-center gap-2 justify-center">
                    {userHabitActions.links.map((link, index) => {
                        if (!link.url) {
                            return (
                                <span
                                    className="cursor-not-allowed"
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            );
                        }
                        return (
                            <Link
                                key={index}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
