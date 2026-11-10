import CategoryTag from "@/components/util/CategoryTag";
import SafeDBIcon from "@/components/util/SafeDBIcon";
import StatusIndicator from "@/components/util/StatusIndicator";
import { Link, usePage } from "@inertiajs/react";
import {
    ArrowRight,
    Calendar,
    ChevronLeft,
    Clock,
    Info,
    PencilIcon,
    PlusCircle,
    RotateCcw,
    Ruler,
    Target,
    TrashIcon,
    TrendingUp,
    XCircle,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
    IconBulb,
    IconDots,
    IconHistory,
    IconLeafFilled,
    IconPlayerPause,
    IconPlayerPlay,
} from "@tabler/icons-react";
import ModalAdoptHabitEdit from "../ModalAdoptHabitEdit";
import ModalConfirmation from "../ModalConfirmation";
import HabitProgressBar from "../HabitProgressBar";
import { route } from "ziggy-js";
import ModalRegistrarAvance from "../ModalRegistrarAvance";

export default function ShowMyHabitMain() {
    const { userHabit, habitLogs, progress } = usePage().props;
    const [selectedHabitEdit, setSelectedHabitEdit] = useState(null);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [confirmationAction, setConfirmationAction] = useState({
        isOpen: false,
        action: null,
        habit: null,
    });

    return (
        <>
            <div className="p-4 pb-24 xl:pb-4 flex flex-col gap-4">
                <Link
                    className="flex gap-1 items-center w-fit text-[14px] font-medium"
                    href={route("dashboard.myhabits")}
                >
                    <ChevronLeft /> Volver a Mis hábitos
                </Link>

                <div className="border flex gap-4 relative p-4 rounded-lg bg-white">
                    <div
                        className={`${userHabit.habit.habit_category_id !== 1 ? "bg-blue-500/20 text-blue-700" : "bg-green-500/20 text-emerald-700"} flex items-center justify-center w-24 h-24 aspect-square rounded-full`}
                    >
                        <SafeDBIcon
                            className="scale-200"
                            svgRawString={userHabit.habit.icon}
                        />
                    </div>
                    <div className="flex-1 flex ">
                        <div className="flex flex-col gap-2">
                            <h1
                                className={`${userHabit.habit.habit_category_id !== 1 ? " text-blue-950" : " text-emerald-950"} font-semibold text-[18px]`}
                            >
                                {userHabit.habit.name}
                            </h1>

                            <CategoryTag
                                categoryId={userHabit.habit.habit_category_id}
                                categoryName={
                                    userHabit.habit.habit_category.name
                                }
                                size={14}
                            />
                            <p className="text-gray-800 text-[14px] max-w-[70%]">
                                {userHabit.habit.instructions}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <StatusIndicator
                            status={userHabit.status}
                            categoryId={userHabit.habit.habit_category_id}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="focus:outline-none flex items-center justify-center cursor-pointer border bg-white h-fit w-fit px-1 rounded-lg">
                                    <IconDots stroke={2} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={"mr-2"}>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route(
                                                "dashboard.habits.recordProgress",
                                                userHabit.id,
                                            )}
                                            className="flex gap-1 items-center text-[12px] cursor-pointer"
                                        >
                                            <IconHistory />
                                            Ver historial
                                        </Link>
                                    </DropdownMenuItem>
                                    {userHabit.status === "active" && (
                                        <>
                                            <DropdownMenuItem>
                                                <button
                                                    className="flex gap-1 items-center text-[12px] cursor-pointer"
                                                    onClick={() =>
                                                        setSelectedHabitEdit(
                                                            userHabit.habit,
                                                        )
                                                    }
                                                >
                                                    <PencilIcon />
                                                    Editar objetivo
                                                </button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <button
                                                    className="flex gap-1 items-center text-[12px] cursor-pointer"
                                                    onClick={() =>
                                                        setConfirmationAction({
                                                            isOpen: true,
                                                            action: "pause",
                                                            habit: userHabit.habit,
                                                        })
                                                    }
                                                >
                                                    <IconPlayerPause
                                                        stroke={2}
                                                    />
                                                    Pausar
                                                </button>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    {userHabit.status === "paused" && (
                                        <>
                                            <DropdownMenuItem>
                                                <button
                                                    className="flex gap-1 items-center text-[12px] cursor-pointer"
                                                    onClick={() =>
                                                        setSelectedHabitEdit(
                                                            userHabit.habit,
                                                        )
                                                    }
                                                >
                                                    <PencilIcon />
                                                    Editar objetivo
                                                </button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <button
                                                    className="flex  gap-1 cursor-pointer items-center text-[12px]"
                                                    onClick={() =>
                                                        setConfirmationAction({
                                                            isOpen: true,
                                                            action: "resume",
                                                            habit: userHabit.habit,
                                                        })
                                                    }
                                                >
                                                    <IconPlayerPlay
                                                        stroke={2}
                                                    />
                                                    Reanudar
                                                </button>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    {userHabit.status === "abandoned" && (
                                        <>
                                            <DropdownMenuItem>
                                                <button
                                                    className="flex items-center gap-1 cursor-pointer w-fit text-[12px]"
                                                    onClick={() =>
                                                        setConfirmationAction({
                                                            isOpen: true,
                                                            action: "readopt",
                                                            habit: userHabit.habit,
                                                        })
                                                    }
                                                >
                                                    <RotateCcw />
                                                    Volver a adoptar
                                                </button>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {userHabit.status !== "abandoned" && (
                                        <DropdownMenuItem
                                            className={
                                                "text-[12px] cursor-pointer"
                                            }
                                            variant="destructive"
                                        >
                                            <button
                                                className="flex gap-1 cursor-pointer"
                                                onClick={() =>
                                                    setConfirmationAction({
                                                        isOpen: true,
                                                        action: "abandon",
                                                        habit: userHabit.habit,
                                                    })
                                                }
                                            >
                                                <XCircle />
                                                Abandonar
                                            </button>
                                        </DropdownMenuItem>
                                    )}

                                    <DropdownMenuItem
                                        className={"text-[12px] cursor-pointer"}
                                        variant="destructive"
                                    >
                                        <button
                                            className="flex gap-1 cursor-pointer"
                                            onClick={() =>
                                                setConfirmationAction({
                                                    isOpen: true,
                                                    action: "delete",
                                                    habit: userHabit.habit,
                                                })
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
                </div>
                <div className="border flex flex-col gap-4 relative p-4 rounded-lg bg-white">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <TrendingUp
                                color={
                                    userHabit.habit.habit_category_id !== 1
                                        ? "#1447e6"
                                        : "#007a55"
                                }
                            />
                            <h2 className="font-semibold text-gray-800">
                                Tu progreso esta semana
                            </h2>
                        </div>
                        <button
                            onClick={() => setSelectedHabit(userHabit.habit)}
                            className={`${userHabit.habit.habit_category_id !== 1 ? "bg-blue-700" : "bg-emerald-700"} flex items-center p-2 text-white  rounded-xl cursor-pointer`}
                        >
                            <PlusCircle /> Registrar avance
                        </button>
                    </div>
                    <div className="flex items-center gap-4 relative">
                        <div className="flex gap-4">
                            <div className="flex  gap-3  pr-6 border-r">
                                <div
                                    className={`${userHabit.habit.habit_category_id !== 1 ? "bg-blue-500/10 text-blue-700" : "bg-green-500/10 text-emerald-700"} flex items-center justify-center p-2 aspect-square w-fit h-fit rounded-full `}
                                >
                                    <Target />
                                </div>
                                <div className="flex flex-col">
                                    <small className="text-gray-600">
                                        Objetivo semanal
                                    </small>
                                    <p className="font-semibold text-[18px]">
                                        {Number(
                                            userHabit.weekly_target,
                                        ).toFixed()}{" "}
                                        {userHabit.habit.tracking_type ===
                                        "quantity"
                                            ? "Unidad"
                                            : "Veces"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-center pr-6 border-r">
                                <SafeDBIcon
                                    className={`${userHabit.habit.habit_category_id !== 1 ? "text-blue-700" : "text-emerald-700"} h-fit scale-125`}
                                    svgRawString={userHabit.habit.icon}
                                />

                                <div className="flex flex-col">
                                    <small className="text-gray-600">
                                        {userHabit.habit.tracking_type ===
                                        "quantity"
                                            ? "Cantidad registrada"
                                            : "Veces registradas"}
                                    </small>
                                    <p className="font-semibold text-[18px]">
                                        {progress}
                                        {/* {userHabit.habit.tracking_type ===
                                        "quantity"
                                            ? userHabit.habit_logs.reduce(
                                                  (acumulador, log) =>
                                                      acumulador + log.quantity,
                                                  0,
                                              )
                                            : habitLogs.length} */}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-between items-center">
                            <div className="w-[70%]">
                                <HabitProgressBar
                                    color={
                                        userHabit.habit.habit_category_id !== 1
                                            ? "blue-600 "
                                            : "emerald-600"
                                    }
                                    value={progress}
                                    total={Number(
                                        userHabit.weekly_target,
                                    ).toFixed()}
                                />
                            </div>
                            <span
                                className={`${
                                    userHabit.habit.habit_category_id !== 1
                                        ? "text-blue-950"
                                        : "text-emerald-950"
                                } flex gap-2 justify-center text-center items-center font-medium`}
                            >
                                <IconLeafFilled
                                    color={
                                        userHabit.habit.habit_category_id !== 1
                                            ? "#1447e6"
                                            : "#007a55"
                                    }
                                />{" "}
                                ¡Vas por buen camino!
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg flex-1 border">
                        <div className="flex items-center justify-between">
                            <p className="flex items-center gap-2 font-medium">
                                <Clock
                                    color={
                                        userHabit.habit.habit_category_id !== 1
                                            ? "#1447e6"
                                            : "#007a55"
                                    }
                                />{" "}
                                Últimos registros
                            </p>
                            <Link
                                href={route(
                                    "dashboard.habits.recordProgress",
                                    userHabit.id,
                                )}
                                className={`${userHabit.habit.habit_category_id !== 1 ? "text-blue-700" : " text-emerald-700"} flex gap-1 items-center text-[14px]`}
                            >
                                Ver historial completo <ArrowRight size={20} />
                            </Link>
                        </div>

                        <div className="flex flex-col py-2">
                            {habitLogs.map((log) => {
                                const recordedAt = new Date(
                                    log.recorded_at.replaceAll("-", "/"),
                                ).toLocaleDateString("es-CO", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                });
                                return (
                                    <div
                                        key={log.id}
                                        className="flex items-center gap-4 px-4 py-2 border rounded-lg"
                                    >
                                        <div
                                            className={`${userHabit.habit.habit_category_id !== 1 ? "bg-blue-500/10 text-blue-700" : "bg-green-500/10 text-emerald-700"} p-2 rounded-full w-14 h-14 flex items-center justify-center`}
                                        >
                                            <SafeDBIcon
                                                className="scale-150"
                                                svgRawString={
                                                    userHabit.habit.icon
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-medium">
                                                {recordedAt}
                                            </p>
                                            {log.quantity && (
                                                <p className="font-medium">
                                                    {log.quantity}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg flex-1 border">
                        <div className="flex items-center justify-between">
                            <p className="flex items-center gap-2 font-medium">
                                <Info
                                    color={
                                        userHabit.habit.habit_category_id !== 1
                                            ? "#1447e6"
                                            : "#007a55"
                                    }
                                />{" "}
                                Información del hábito
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-2 py-2 border-y">
                                <Calendar
                                    size={25}
                                    color={
                                        userHabit.habit.habit_category_id !== 1
                                            ? "#1447e6"
                                            : "#007a55"
                                    }
                                />
                                <div>
                                    <small className="font-medium text-[14px]">
                                        Descripción
                                    </small>
                                    <p className="text-gray-600 text-[15px]">
                                        {userHabit.habit.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 py-2 border-y">
                                <IconBulb
                                    size={30}
                                    color={
                                        userHabit.habit.habit_category_id !== 1
                                            ? "#1447e6"
                                            : "#007a55"
                                    }
                                />
                                <div>
                                    <small className="font-medium text-[14px]">
                                        Instrucciones
                                    </small>
                                    <p className="text-gray-600 text-[15px]">
                                        {userHabit.habit.instructions}
                                    </p>
                                </div>
                            </div>
                            <div className="flex py-2">
                                <div className="flex-1 flex gap-2">
                                    <Target
                                        color={
                                            userHabit.habit
                                                .habit_category_id !== 1
                                                ? "#1447e6"
                                                : "#007a55"
                                        }
                                    />
                                    <div>
                                        <p className="text-gray-600">
                                            Objetivo semanal
                                        </p>
                                        <p>{Number(userHabit.weekly_target)}</p>
                                    </div>
                                </div>
                                {userHabit.habit.tracking_type ===
                                    "quantity" && (
                                    <div className="flex-1 flex pl-2 border-l">
                                        <Ruler
                                            color={
                                                userHabit.habit
                                                    .habit_category_id !== 1
                                                    ? "#1447e6"
                                                    : "#007a55"
                                            }
                                        />
                                        <div>
                                            <p className="text-gray-600">
                                                Unidad de medida
                                            </p>
                                            <p>Unidad de medida</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalAdoptHabitEdit
                selectedHabit={selectedHabitEdit}
                setSelectedHabit={setSelectedHabitEdit}
                weekly_target={userHabit.weekly_target}
                userHabitId={userHabit.id}
            />
            <ModalConfirmation
                confirmationAction={confirmationAction}
                setConfirmationAction={setConfirmationAction}
                userHabitId={userHabit.id}
            />
            {selectedHabit && (
                <ModalRegistrarAvance
                    selectedHabit={selectedHabit}
                    setSelectedHabit={setSelectedHabit}
                    weekly_target={userHabit.weekly_target}
                    progress={progress}
                    adopted_at={userHabit.adopted_at}
                    userHabitId={userHabit.id}
                />
            )}
        </>
    );
}
