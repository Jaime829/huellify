import { useForm } from "@inertiajs/react";
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
import SafeDBIcon from "../util/SafeDBIcon";
import { Calendar, Clock, Target } from "lucide-react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import DoughnutChartHabits from "./DoughnutChartHabits";
import FormActivityLabel from "../util/FormActivityLabel";
export default function ModalRegistrarAvance({
    selectedHabit,
    setSelectedHabit,
    weekly_target = null,
    progress = null,
    adopted_at = null,
    userHabitId = null,
}) {

    const { post, data, setData, processing } = useForm({
        recorded_at: new Date().toISOString().split("T")[0],
        quantity: null,
        notes: null,
    });
    const minDate = selectedHabit
        ? (selectedHabit.pivot?.adopted_at.split(" ")[0] ??
          adopted_at.split(" ")[0])
        : null;

    const maxDate = new Date().toISOString().split("T")[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedHabit) return;

        post(
            route(
                "dashboard.habits.recordProgressStore",
                selectedHabit.pivot?.id ?? userHabitId,
            ),
            {
                only: [
                    "flash",
                    "userHabits",
                    "userHabit",
                    "monthActions",
                    "progress",
                ],
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
                            <div
                                className={` ${selectedHabit.habit_category_id !== 1 ? "bg-blue-500/20 text-blue-700" : "bg-green-500/20  text-emerald-700"} w-14 h-14 aspect-square flex items-center justify-center rounded-full`}
                            >
                                <SafeDBIcon svgRawString={selectedHabit.icon} />
                            </div>{" "}
                            Registrar avance
                        </DialogTitle>
                        <DialogDescription className={"flex flex-col gap-1"}>
                            <span className="font-bold text-black text-[16px]">
                                {selectedHabit.name}
                            </span>
                            <span
                                className={`${selectedHabit.habit_category_id !== 1 ? "bg-blue-400/20 text-blue-700" : "bg-green-400/20  text-emerald-700"} py-1 px-2 w-fit text-center text rounded-xl font-medium`}
                            >
                                {selectedHabit.habit_category.name}
                            </span>
                            <span className="text-gray-700">
                                {selectedHabit.measurement_unit_id
                                    ? "Indica cuanto has avanzado con este hábito."
                                    : "Registra cada vez que realizas este hábito."}
                            </span>
                        </DialogDescription>
                        <div
                            className={`${selectedHabit.habit_category_id !== 1 ? "bg-blue-400/20" : "bg-green-500/20"} flex items-center justify-between shadow rounded-lg p-2`}
                        >
                            <div className="flex gap-1 pr-2 border-r text-gray-700">
                                <Target size={20} />
                                <div>
                                    <p className="leading-3 font-medium text-[12px]">
                                        Objetivo semanal
                                    </p>
                                    <p className="font-bold text-[16px]">
                                        {Number(
                                            selectedHabit.pivot
                                                ?.weekly_target ??
                                                weekly_target,
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
                                            color={`${selectedHabit.habit_category_id !== 1 ? "#1447e6" : "#14c01d"} `}
                                        />
                                        <div className="flex flex-col">
                                            <p className="leading-3 font-medium text-gray-700 text-[12px]">
                                                Avance registrado
                                            </p>
                                            <p className="font-bold text-[16px]">
                                                {selectedHabit?.progress ??
                                                    progress}{" "}
                                                de{" "}
                                                {Number(
                                                    selectedHabit.pivot
                                                        ?.weekly_target ??
                                                        weekly_target,
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
                                            selectedHabit?.progress ?? progress
                                        }
                                        total={Number(
                                            selectedHabit.pivot
                                                ?.weekly_target ??
                                                weekly_target,
                                        )}
                                        colorRGBA={`${selectedHabit.habit_category_id !== 1 ? "rgba(20, 71, 230, 1)" : "rgba(20, 192, 29, 1)"} `}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="flex gap-1 px-1 py-1.5 bg-gray-50 items-center text-[12px] rounded-xl w-fit text-gray-700">
                            <Clock
                                color={`${selectedHabit.habit_category_id !== 1 ? "#1447e6" : "#007a55"} `}
                            />
                            Te faltan{" "}
                            <span
                                className={`${selectedHabit.habit_category_id !== 1 ? "text-blue-700" : "text-emerald-700"} font-bold`}
                            >
                                {selectedHabit.tracking_type === "quantity"
                                    ? "calculo"
                                    : `${Number(selectedHabit.pivot?.weekly_target ?? weekly_target - selectedHabit?.progress ?? progress).toFixed()} veces`}
                            </span>
                            para alcanzar tu objetivo semanal.
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
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content")}
                        />

                        {selectedHabit.tracking_type === "quantity" && (
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
                                        value={data.quantity || 0}
                                        onChange={(e) =>
                                            setData("quantity", e.target.value)
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
                                        setData("recorded_at", e.target.value)
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
                                    setData("notes", e.target.value)
                                }
                            ></textarea>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className={"cursor-pointer"}
                                    variant="outline"
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <button
                                disabled={processing}
                                className={`${selectedHabit.habit_category_id !== 1 ? "bg-blue-700 hover:bg-blue-900" : "bg-emerald-700 hover:bg-emerald-900"} cursor-pointer text-white  h-8 gap-1.5 px-2.5 rounded-md`}
                                type="submit"
                            >
                                {processing ? <Spinner /> : "Guardar registro"}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
