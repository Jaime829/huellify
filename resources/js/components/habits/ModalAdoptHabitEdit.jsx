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
import SafeDBIcon from "@/components/util/SafeDBIcon";
import { Check } from "lucide-react";
import { route } from "ziggy-js";

export default function ModalAdoptHabitEdit({
    selectedHabit,
    setSelectedHabit,
    weekly_target = null,
    userHabitId = null,
}) {
    if (!selectedHabit) return null;

    const { patch, processing, data, setData } = useForm({
        weekly_target: selectedHabit.pivot?.weekly_target
            ? selectedHabit.pivot.weekly_target
            : weekly_target,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(
            route(
                "dashboard.myhabit.update",
                selectedHabit.pivot?.id ? selectedHabit.pivot.id : userHabitId,
            ),
            {
                onSuccess: () => {
                    setSelectedHabit(null);
                },
            },
        );
    };

    return (
        <Dialog
            open={!!selectedHabit}
            onOpenChange={(open) => {
                if (!open) setSelectedHabit(null);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className={
                            "flex items-center gap-2 font-bold text-[18px]"
                        }
                    >
                        <div className="h-14 w-14 aspect-square bg-green-500/20 rounded-full flex items-center justify-center text-emerald-800">
                            <SafeDBIcon
                                svgRawString={selectedHabit.icon}
                                className="stroke-2"
                            />
                        </div>
                        Editar objetivo
                    </DialogTitle>
                    <DialogDescription className={"flex flex-col gap-1"}>
                        <span className="font-bold text-black text-[16px]">
                            {selectedHabit.name}
                        </span>
                        <span className="py-1 bg-green-400/20 max-w-20 text-center rounded-xl text-emerald-700 font-medium">
                            {selectedHabit.habit_category.name}
                        </span>
                        <span>{selectedHabit.instructions}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap gap-2 justify-between bg-green-500/15 p-2 rounded-lg">
                    <div className="flex">
                        <div></div>
                        <div>
                            <p className="font-bold text-emerald-800">
                                Tu objetivo semanal actual
                            </p>
                            <small className="font-light text-gray-700">
                                Huellify recomienda realizar este hábito:
                            </small>
                        </div>
                    </div>
                    <div className="bg-green-500/20 p-2 flex items-center gap-2 rounded-lg">
                        <p className="text-emerald-900 font-black text-[24px]">
                            {Number(
                                selectedHabit.pivot?.weekly_target
                                    ? selectedHabit.pivot.weekly_target
                                    : weekly_target,
                            )}
                        </p>
                        <div>
                            <p className="font-bold text-emerald-900 leading-[1.1] text-[18px]">
                                veces
                            </p>
                            <p className="leading-[1.1] font-light">
                                por semana
                            </p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="_token"
                        value={document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content")}
                    />
                    <div className="flex flex-col gap-1">
                        <label className="font-bold" htmlFor="weekly_target">
                            Tu objetivo semanal
                        </label>
                        <div className="border px-2 py-1 rounded-md flex items-center">
                            <input
                                className="focus:outline-none flex-1 text-center shrink"
                                name="weekly_target"
                                id="weekly_target"
                                type="number"
                                value={Number(data.weekly_target)}
                                min={1}
                                onChange={(e) => {
                                    setData("weekly_target", e.target.value);
                                }}
                            />
                            <span className="text-[10px] ">
                                Veces por semana
                            </span>
                        </div>
                    </div>
                    <DialogFooter className={"mt-6"}>
                        <DialogClose asChild>
                            <Button
                                className={"cursor-pointer"}
                                variant="outline"
                            >
                                Cancelar
                            </Button>
                        </DialogClose>
                        <button
                            className={
                                "cursor-pointer bg-emerald-700 text-white hover:bg-emerald-900 h-8 gap-1.5 px-2.5 rounded-md flex items-center"
                            }
                            disabled={processing}
                            type="submit"
                        >
                            {processing ? (
                                <>
                                    Actualizando objetivo
                                    <Spinner />
                                </>
                            ) : (
                                <>
                                    <Check size={15} />
                                    Actualizar objetivo
                                </>
                            )}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
