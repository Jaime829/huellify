import {
    IconCircleCheckFilled,
    IconDots,
    IconHistory,
    IconPlayerPause,
    IconPlayerPlay,
    IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import SafeDBIcon from "../util/SafeDBIcon";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Calendar,
    PencilIcon,
    PlusCircle,
    RotateCcw,
    Target,
    TrashIcon,
    XCircle,
} from "lucide-react";
import HabitProgressBar from "./HabitProgressBar";
import { useState } from "react";
import { route } from "ziggy-js";
import ModalConfirmation from "./ModalConfirmation";
import StatusIndicator from "../util/StatusIndicator";
import ModalAdoptHabitEdit from "./ModalAdoptHabitEdit";
import CategoryTag from "../util/CategoryTag";
import ModalRegistrarAvance from "./ModalRegistrarAvance";

export default function MyHabitsTable() {
    const { userHabits } = usePage().props;

    const { post, data, setData, processing } = useForm({
        recorded_at: new Date().toISOString().split("T")[0],
        quantity: null,
        notes: null,
    });

    const [selectedHabit, setSelectedHabit] = useState(null);
    const [selectedHabitEdit, setSelectedHabitEdit] = useState(null);
    const [confirmationAction, setConfirmationAction] = useState({
        isOpen: false,
        action: null,
        habit: null,
    });

    const minDate = selectedHabit
        ? selectedHabit.pivot.adopted_at.split(" ")[0]
        : null;

    const maxDate = new Date().toISOString().split("T")[0];

    const urlParams = new URLSearchParams(window.location.search);
    const activeFilter = urlParams.get("status") || "all";

    const filtrarPorStatus = (status) => {
        router.get(
            window.location.pathname,
            { status: status },
            { preserveState: true, replace: true },
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedHabit) return;

        post(
            route(
                "dashboard.habits.recordProgressStore",
                selectedHabit.pivot.id,
            ),
            {
                only: ["flash", "userHabits", "monthActions"],
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    setSelectedHabit(null);
                },
            },
        );
    };

    return (
        <>
            <div className="flex flex-col gap-4 py-4">
                <div className={"flex items-center gap-2 px-4"}>
                    <button
                        className={`${activeFilter === "all" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-500"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                        onClick={() => filtrarPorStatus("all")}
                    >
                        Todos
                    </button>
                    <button
                        className={`${activeFilter === "active" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-500"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                        onClick={() => filtrarPorStatus("active")}
                    >
                        Activos
                    </button>
                    <button
                        className={`${activeFilter === "paused" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-500"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                        onClick={() => filtrarPorStatus("paused")}
                    >
                        Pausados
                    </button>
                    <button
                        className={`${activeFilter === "abandoned" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-500"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                        onClick={() => filtrarPorStatus("abandoned")}
                    >
                        Abandonados
                    </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                    {userHabits.length > 0 ? (
                        <>
                            {userHabits.map((habit) => {
                                const lastRecord = new Date(
                                    habit.lastRecord?.created_at,
                                ).toLocaleDateString("es-CO", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                });
                                return (
                                    <div
                                        key={habit.id}
                                        className="border rounded-lg flex flex-col gap-4 p-4"
                                    >
                                        <div className="flex items-center gap-2 w-full">
                                            <Link
                                                href={route(
                                                    "dashboard.myhabit.show",
                                                    habit.pivot.id,
                                                )}
                                            >
                                                <div
                                                    className={`${habit.habit_category_id == 1 ? "bg-green-500/20 text-emerald-700" : "text-blue-700 bg-blue-500/20"} flex items-center justify-center h-16 aspect-square  rounded-lg`}
                                                >
                                                    <SafeDBIcon
                                                        svgRawString={
                                                            habit.icon
                                                        }
                                                    />
                                                </div>
                                            </Link>
                                            <div className="flex flex-col gap-2 flex-1">
                                                <div className="flex gap-2 justify-end">
                                                    <StatusIndicator
                                                        status={
                                                            habit.pivot.status
                                                        }
                                                        categoryId={
                                                            habit.habit_category_id
                                                        }
                                                    />

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <button className="focus:outline-none flex items-center justify-center cursor-pointer border bg-white px-1 rounded-lg">
                                                                <IconDots
                                                                    stroke={2}
                                                                />
                                                            </button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            className={"mr-2"}
                                                        >
                                                            <DropdownMenuGroup>
                                                                <DropdownMenuItem>
                                                                    <Link
                                                                        href={route(
                                                                            "dashboard.habits.recordProgress",
                                                                            habit
                                                                                .pivot
                                                                                .id,
                                                                        )}
                                                                        className="flex gap-1 items-center text-[12px] cursor-pointer"
                                                                    >
                                                                        <IconHistory />
                                                                        Ver
                                                                        historial
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                {habit.pivot
                                                                    .status ===
                                                                    "active" && (
                                                                    <>
                                                                        <DropdownMenuItem>
                                                                            <button
                                                                                className="flex gap-1 items-center text-[12px] cursor-pointer"
                                                                                onClick={() =>
                                                                                    setSelectedHabitEdit(
                                                                                        habit,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <PencilIcon />
                                                                                Editar
                                                                                objetivo
                                                                            </button>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem>
                                                                            <button
                                                                                className="flex gap-1 items-center text-[12px] cursor-pointer"
                                                                                onClick={() =>
                                                                                    setConfirmationAction(
                                                                                        {
                                                                                            isOpen: true,
                                                                                            action: "pause",
                                                                                            habit: habit,
                                                                                        },
                                                                                    )
                                                                                }
                                                                            >
                                                                                <IconPlayerPause
                                                                                    stroke={
                                                                                        2
                                                                                    }
                                                                                />
                                                                                Pausar
                                                                            </button>
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
                                                                {habit.pivot
                                                                    .status ===
                                                                    "paused" && (
                                                                    <>
                                                                        <DropdownMenuItem>
                                                                            <button
                                                                                className="flex gap-1 items-center text-[12px] cursor-pointer"
                                                                                onClick={() =>
                                                                                    setSelectedHabitEdit(
                                                                                        habit,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <PencilIcon />
                                                                                Editar
                                                                                objetivo
                                                                            </button>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem>
                                                                            <button
                                                                                className="flex  gap-1 cursor-pointer items-center text-[12px]"
                                                                                onClick={() =>
                                                                                    setConfirmationAction(
                                                                                        {
                                                                                            isOpen: true,
                                                                                            action: "resume",
                                                                                            habit: habit,
                                                                                        },
                                                                                    )
                                                                                }
                                                                            >
                                                                                <IconPlayerPlay
                                                                                    stroke={
                                                                                        2
                                                                                    }
                                                                                />
                                                                                Reanudar
                                                                            </button>
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
                                                                {habit.pivot
                                                                    .status ===
                                                                    "abandoned" && (
                                                                    <>
                                                                        <DropdownMenuItem>
                                                                            <button
                                                                                className="flex items-center gap-1 cursor-pointer w-fit text-[12px]"
                                                                                onClick={() =>
                                                                                    setConfirmationAction(
                                                                                        {
                                                                                            isOpen: true,
                                                                                            action: "readopt",
                                                                                            habit: habit,
                                                                                        },
                                                                                    )
                                                                                }
                                                                            >
                                                                                <RotateCcw />
                                                                                Volver
                                                                                a
                                                                                adoptar
                                                                            </button>
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
                                                            </DropdownMenuGroup>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuGroup>
                                                                {habit.pivot
                                                                    .status !==
                                                                    "abandoned" && (
                                                                    <DropdownMenuItem
                                                                        className={
                                                                            "text-[12px] cursor-pointer"
                                                                        }
                                                                        variant="destructive"
                                                                    >
                                                                        <button
                                                                            className="flex gap-1 cursor-pointer"
                                                                            onClick={() =>
                                                                                setConfirmationAction(
                                                                                    {
                                                                                        isOpen: true,
                                                                                        action: "abandon",
                                                                                        habit: habit,
                                                                                    },
                                                                                )
                                                                            }
                                                                        >
                                                                            <XCircle />
                                                                            Abandonar
                                                                        </button>
                                                                    </DropdownMenuItem>
                                                                )}

                                                                <DropdownMenuItem
                                                                    className={
                                                                        "text-[12px] cursor-pointer"
                                                                    }
                                                                    variant="destructive"
                                                                >
                                                                    <button
                                                                        className="flex gap-1 cursor-pointer"
                                                                        onClick={() =>
                                                                            setConfirmationAction(
                                                                                {
                                                                                    isOpen: true,
                                                                                    action: "delete",
                                                                                    habit: habit,
                                                                                },
                                                                            )
                                                                        }
                                                                    >
                                                                        <TrashIcon />
                                                                        Eliminar
                                                                    </button>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuGroup>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <Link
                                                    href={route(
                                                        "dashboard.myhabit.show",
                                                        habit.pivot.id,
                                                    )}
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <p className="leading-4 text-[14px] font-bold">
                                                            {habit.name}
                                                        </p>
                                                        <CategoryTag
                                                            categoryId={
                                                                habit.habit_category_id
                                                            }
                                                            categoryName={
                                                                habit
                                                                    .habit_category
                                                                    .name
                                                            }
                                                            size={12}
                                                        />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <Link
                                            href={route(
                                                "dashboard.myhabit.show",
                                                habit.pivot.id,
                                            )}
                                        >
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-1">
                                                    {habit.pivot.status !==
                                                        "active" && (
                                                        <div className="flex gap-1">
                                                            <Calendar
                                                                color="#364153"
                                                                size={20}
                                                            />
                                                            <div className="flex flex-col">
                                                                <span className="text-[12px] text-gray-700 font-medium">
                                                                    Último
                                                                    registro
                                                                </span>
                                                                <p className="font-bold text-[14px]">
                                                                    {lastRecord ===
                                                                    "Invalid Date"
                                                                        ? "Sin registros"
                                                                        : lastRecord}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex flex-col gap-1">
                                                        <span className="flex items-center gap-1 text-[12px] text-gray-700 font-medium">
                                                            <Target size={15} />{" "}
                                                            Objetivo semanal
                                                        </span>
                                                        <p className="text-gray-800 font-bold text-[18px]">
                                                            {Number(
                                                                habit.pivot
                                                                    .weekly_target,
                                                            )}
                                                            {habit.tracking_type ===
                                                            "quantity"
                                                                ? " Unidad de medida"
                                                                : " Veces"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {habit.pivot.status ===
                                                        "active" && (
                                                        <HabitProgressBar
                                                            color={
                                                                habit.habit_category_id ==
                                                                1
                                                                    ? "emerald-600"
                                                                    : "blue-600"
                                                            }
                                                            value={
                                                                habit.progress
                                                            }
                                                            total={Number(
                                                                habit.pivot
                                                                    .weekly_target,
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                        {habit.pivot.status === "active" && (
                                            <button
                                                className={`${habit.habit_category_id == 1 ? "bg-emerald-700" : "bg-blue-700"} cursor-pointer border bg- flex items-center justify-center gap-1 text-[14px] p-2 text-white font-medium rounded-lg`}
                                                onClick={() =>
                                                    setSelectedHabit(habit)
                                                }
                                            >
                                                <PlusCircle />
                                                Registrar avance
                                            </button>
                                        )}
                                        {habit.pivot.status === "paused" && (
                                            <button
                                                className={` cursor-pointer border-2 border-gray-300 bg- flex items-center justify-center gap-1 text-[14px] p-2 text-gray-600 font-medium rounded-lg transition-colors hover:bg-gray-200`}
                                                onClick={() =>
                                                    setConfirmationAction({
                                                        isOpen: true,
                                                        action: "resume",
                                                        habit: habit,
                                                    })
                                                }
                                            >
                                                <IconPlayerPlayFilled />
                                                Reanudar hábito
                                            </button>
                                        )}
                                        {habit.pivot.status === "abandoned" && (
                                            <button
                                                className={` cursor-pointer border-2 border-gray-300 bg- flex items-center justify-center gap-1 text-[14px] p-2 text-gray-600 font-medium rounded-lg transition-colors hover:bg-gray-200`}
                                                onClick={() =>
                                                    setConfirmationAction({
                                                        isOpen: true,
                                                        action: "readopt",
                                                        habit: habit,
                                                    })
                                                }
                                            >
                                                <RotateCcw />
                                                Volver a adoptar hábito
                                            </button>
                                        )}
                                    </div>
                                );
                            })}

                            {selectedHabit && (
                                <ModalRegistrarAvance
                                    selectedHabit={selectedHabit}
                                    setSelectedHabit={setSelectedHabit}
                                />
                            )}

                            <ModalAdoptHabitEdit
                                selectedHabit={selectedHabitEdit}
                                setSelectedHabit={setSelectedHabitEdit}
                            />
                            <ModalConfirmation
                                confirmationAction={confirmationAction}
                                setConfirmationAction={setConfirmationAction}
                            />
                        </>
                    ) : (
                        <p className="px-4 font-medium text-gray-500 text-center col-span-2 lg:col-span-3">
                            {activeFilter === "all" &&
                                "Aun no tienes hábitos adoptados"}
                            {activeFilter === "paused" &&
                                "No tienes hábitos pausados"}
                            {activeFilter === "abandoned" &&
                                "No tienes hábitos abandonados"}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
