import {
    IconCircleCheckFilled,
    IconCircleFilled,
    IconDots,
    IconPlayerPause,
    IconPlayerPlay,
    IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { router, useForm, usePage } from "@inertiajs/react";
import SafeDBIcon from "../util/SafeDBIcon";

import {
    DialogHeader,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { DialogClose } from "radix-ui/dialog";
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
    Check,
    Clock,
    History,
    PencilIcon,
    Play,
    PlusCircle,
    RotateCcw,
    Target,
    TrashIcon,
    XCircle,
} from "lucide-react";
import HabitProgressBar from "./HabitProgressBar";
import DoughnutChartHabits from "./DoughnutChartHabits";
import { useState } from "react";
import FormActivityLabel from "../util/FormActivityLabel";
import { route } from "ziggy-js";
import ModalAdoptHabit from "./ModalAdoptHabit";
import ModalConfirmation from "./ModalConfirmation";
import StatusIndicator from "../util/StatusIndicator";

export default function MyHabitsTable() {
    const { userHabits } = usePage().props;

    const { post, data, setData, errors, processing } = useForm({
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

    console.log(confirmationAction);
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

        post(route("dashboard.habits.recordProgress", selectedHabit.pivot.id), {
            only: ["flash"],
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                setSelectedHabit(null);
                router.reload({ only: ["userHabits", "monthActions"] });
            },
        });
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
                                            <div
                                                className={`${habit.habit_category_id == 1 ? "bg-green-500/20 text-emerald-700" : "text-blue-700 bg-blue-500/20"} flex items-center justify-center h-16 aspect-square  rounded-lg`}
                                            >
                                                <SafeDBIcon
                                                    svgRawString={habit.icon}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 flex-1">
                                                <div className="flex gap-2 justify-end">
                                                    <StatusIndicator
                                                        status={
                                                            habit.pivot.status
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
                                                                        <DropdownMenuItem
                                                                            className={
                                                                                "text-[12px] cursor-pointer"
                                                                            }
                                                                        >
                                                                            <History />
                                                                            Ver
                                                                            historial
                                                                        </DropdownMenuItem>
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
                                                <div className="flex flex-col gap-1">
                                                    <p className="leading-4 text-[14px] font-bold">
                                                        {habit.name}
                                                    </p>
                                                    <span
                                                        className={`${habit.habit_category_id == 1 ? "text-emerald-800 bg-green-500/20" : "text-blue-800 bg-blue-500/20"} px-2 py-0.5 rounded-xl w-fit flex items-center justify-center text-[12px] font-semibold`}
                                                    >
                                                        {
                                                            habit.habit_category
                                                                .name
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
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
                                                                Último registro
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
                                                                ? "bg-emerald-600"
                                                                : "bg-blue-600"
                                                        }
                                                        value={
                                                            habit.pivot
                                                                .habit_logs
                                                                .length
                                                        }
                                                        total={Number(
                                                            habit.pivot
                                                                .weekly_target,
                                                        )}
                                                    />
                                                )}
                                            </div>
                                        </div>
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
                                <Dialog
                                    open={!!selectedHabit}
                                    onOpenChange={(open) => {
                                        if (!open) {
                                            setSelectedHabit(null);
                                        }
                                    }}
                                >
                                    <DialogContent className="sm:max-w-sm">
                                        <DialogHeader>
                                            <DialogTitle
                                                className={
                                                    "flex gap-2 items-center font-bold text-gray-800 text-[18px]"
                                                }
                                            >
                                                <div className="w-14 h-14 aspect-square bg-green-500/20 text-emerald-700 flex items-center justify-center rounded-full">
                                                    <SafeDBIcon
                                                        svgRawString={
                                                            selectedHabit.icon
                                                        }
                                                    />
                                                </div>{" "}
                                                Registrar avance
                                            </DialogTitle>
                                            <DialogDescription
                                                className={
                                                    "flex flex-col gap-1"
                                                }
                                            >
                                                <span className="font-bold text-black text-[16px]">
                                                    {selectedHabit.name}
                                                </span>
                                                <span
                                                    className={`${selectedHabit.habit_category_id !== 1 ? "bg-blue-400/20 text-blue-700" : "bg-green-400/20  text-emerald-700"} py-1 max-w-20 text-center rounded-xl font-medium`}
                                                >
                                                    {
                                                        selectedHabit
                                                            .habit_category.name
                                                    }
                                                </span>
                                                <span className="text-gray-700">
                                                    {selectedHabit.measurement_unit_id
                                                        ? "Indica cuanto has avanzado con este hábito."
                                                        : "Registra cada vez que realizas este hábito."}
                                                </span>
                                            </DialogDescription>
                                            <div className="flex items-center justify-between shadow rounded-lg bg-green-500/10 p-2">
                                                <div className="flex gap-1 pr-2 border-r text-gray-700">
                                                    <Target size={20} />
                                                    <div>
                                                        <p className="leading-3 font-medium text-[12px]">
                                                            Objetivo semanal
                                                        </p>
                                                        <p className="font-bold text-[16px]">
                                                            {Number(
                                                                selectedHabit
                                                                    .pivot
                                                                    .weekly_target,
                                                            ).toFixed()}
                                                            {selectedHabit.tracking_type ===
                                                            "quantity"
                                                                ? " Unidad de medida"
                                                                : " veces"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex gap-1">
                                                            <IconCircleCheckFilled
                                                                size={20}
                                                                color="#14c01d"
                                                            />
                                                            <div className="flex flex-col">
                                                                <p className="leading-3 font-medium text-gray-700 text-[12px]">
                                                                    Avance
                                                                    registrado
                                                                </p>
                                                                <p className="font-bold text-[16px]">
                                                                    {
                                                                        selectedHabit
                                                                            .pivot
                                                                            .habit_logs
                                                                            .length
                                                                    }{" "}
                                                                    de{" "}
                                                                    {Number(
                                                                        selectedHabit
                                                                            .pivot
                                                                            .weekly_target,
                                                                    ).toFixed()}{" "}
                                                                    {selectedHabit.tracking_type ===
                                                                    "quantity"
                                                                        ? "Unidad de medida"
                                                                        : "veces"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <DoughnutChartHabits
                                                            value={
                                                                selectedHabit
                                                                    .pivot
                                                                    .habit_logs
                                                                    .length
                                                            }
                                                            total={Number(
                                                                selectedHabit
                                                                    .pivot
                                                                    .weekly_target,
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="flex gap-1 px-1 py-1.5 bg-gray-50 items-center text-[12px] rounded-xl w-fit text-gray-700">
                                                <Clock color="#007a55" />
                                                Te faltan{" "}
                                                <span className="text-emerald-700 font-bold">
                                                    {selectedHabit.tracking_type ===
                                                    "quantity"
                                                        ? "calculo"
                                                        : `${Number(selectedHabit.pivot.weekly_target - selectedHabit.pivot.habit_logs.length).toFixed()} veces`}
                                                </span>
                                                para alcanzar tu objetivo
                                                semanal.
                                            </p>
                                        </DialogHeader>
                                        <form
                                            className="flex flex-col gap-2"
                                            onSubmit={handleSubmit}
                                        >
                                            <input
                                                type="hidden"
                                                name="_token"
                                                value={document
                                                    .querySelector(
                                                        'meta[name="csrf-token"]',
                                                    )
                                                    ?.getAttribute("content")}
                                            />

                                            {selectedHabit.tracking_type ===
                                                "quantity" && (
                                                <div className="flex flex-col gap-1">
                                                    <FormActivityLabel htmlFor="quantity">
                                                        Cantidad realizada
                                                    </FormActivityLabel>
                                                    <div className="flex border w-fit rounded-md overflow-hidden">
                                                        <input
                                                            className="px-1 focus:outline-none"
                                                            type="number"
                                                            name="quantity"
                                                            id="quantity"
                                                            value={
                                                                data.quantity ||
                                                                0
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "quantity",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            min={1}
                                                        />
                                                        <p className="px-1 py-1 text-[12px bg-gray-300 text-gray-700]">
                                                            Medida
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-1 w-fit">
                                                <FormActivityLabel htmlFor="recorded_at">
                                                    Fecha de realización
                                                </FormActivityLabel>
                                                <div className="flex items-center border py-1 px-2 rounded-md gap-1">
                                                    <Calendar color="#6a7282" />
                                                    <input
                                                        className="flex-1 focus:outline-none"
                                                        type="date"
                                                        name="recorded_at"
                                                        id="recorded_at"
                                                        value={data.recorded_at}
                                                        onChange={(e) =>
                                                            setData(
                                                                "recorded_at",
                                                                e.target.value,
                                                            )
                                                        }
                                                        min={minDate}
                                                        max={maxDate}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <FormActivityLabel htmlFor="notes">
                                                    Notas (opcional)
                                                </FormActivityLabel>
                                                <textarea
                                                    name="notes"
                                                    id="notes"
                                                    className="resize-none border rounded-md focus:outline-none p-1"
                                                    value={data.notes || ""}
                                                    onChange={(e) =>
                                                        setData(
                                                            "notes",
                                                            e.target.value,
                                                        )
                                                    }
                                                ></textarea>
                                            </div>

                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button
                                                        className={
                                                            "cursor-pointer"
                                                        }
                                                        variant="outline"
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </DialogClose>
                                                <button
                                                    disabled={processing}
                                                    className={
                                                        "cursor-pointer bg-emerald-700 text-white hover:bg-emerald-900 h-8 gap-1.5 px-2.5 rounded-md"
                                                    }
                                                    type="submit"
                                                >
                                                    {processing ? (
                                                        <Spinner />
                                                    ) : (
                                                        "Guardar registro"
                                                    )}
                                                </button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            )}

                            <ModalAdoptHabit
                                selectedHabit={selectedHabitEdit}
                                setSelectedHabit={setSelectedHabitEdit}
                                isEdit={true}
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
