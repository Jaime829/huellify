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
    Ban,
    Calendar,
    CheckCircle,
    Pause,
    Play,
    RefreshCw,
    Ruler,
    Trash,
} from "lucide-react";
import SafeDBIcon from "@/components/util/SafeDBIcon";
import {
    IconCircleCheckFilled,
    IconFileDescription,
    IconRuler2,
} from "@tabler/icons-react";
import FormActivityLabel from "@/components/util/FormActivityLabel";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
export default function HistoryModalAction({ modalAction, setModalAction }) {
    if (!modalAction.action) return null;
    const {
        put,
        delete: destroy,
        data,
        setData,
        processing,
    } = useForm({
        recorded_at: modalAction.action.recorded_at,
        quantity: modalAction.action.quantity,
        notes: modalAction.action.notes,
    });
    const recordedAt =
        modalAction.actionType !== "edit"
            ? new Date(
                  modalAction.action.recorded_at.replaceAll("-", "/"),
              ).toLocaleDateString("es-Co", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
              })
            : modalAction.action.recorded_at;

    const handleSubmit = (e) => {
        e.preventDefault();
        put(
            route("dashboard.habits.updateLog", {
                userHabit: modalAction.action.user_habit.id,
                habitLog: modalAction.action.id,
            }),
            {
                onSuccess: () => {
                    setModalAction({
                        isOpen: false,
                        action: null,
                        actionType: null,
                    });
                },
            },
        );
    };
    const handleDelete = (e) => {
        e.preventDefault();

        destroy(
            route("dashboard.habits.destroyLog", {
                userHabit: modalAction.action.user_habit.id,
                habitLog: modalAction.action.id,
            }),
            {
                onSuccess: () => {
                    setModalAction({
                        isOpen: false,
                        action: null,
                        actionType: null,
                    });
                },
            },
        );
    };


    const minDate = modalAction.action.user_habit
        ? modalAction.action.user_habit.adopted_at.split(" ")[0]
        : null;

    const maxDate = new Date().toISOString().split("T")[0];

    return (
        <Dialog
            open={modalAction.isOpen}
            onOpenChange={(open) => {
                if (!open)
                    setModalAction({
                        isOpen: false,
                        action: null,
                    });
            }}
        >
            <DialogContent className={"p-6"}>
                <DialogHeader className={"flex flex-col gap-4"}>
                    <DialogTitle
                        className={
                            "flex items-center gap-2 font-bold text-[18px]"
                        }
                    >
                        <div
                            className={`${modalAction.actionType === "details" && "text-emerald-700 bg-green-500/30"} ${modalAction.actionType === "edit" && "text-emerald-800 bg-green-500/20"} ${modalAction.actionType === "delete" && "text-red-700 bg-red-500/20"}  h-20 w-20 aspect-square rounded-full flex items-center justify-center`}
                        >
                            {modalAction.actionType !== "delete" && (
                                <SafeDBIcon
                                    className="scale-200"
                                    svgRawString={
                                        modalAction.action.user_habit.habit.icon
                                    }
                                />
                            )}

                            {modalAction.actionType === "delete" && (
                                <Trash size={40} strokeWidth={3} />
                            )}
                        </div>

                        {modalAction.actionType === "details" && (
                            <p className="text-emerald-900">
                                Detalle del registro
                            </p>
                        )}
                        {modalAction.actionType === "edit" && (
                            <p className="text-emerald-900">Editar registro</p>
                        )}
                    </DialogTitle>
                    <DialogDescription className={"flex flex-col gap-2"}>
                        {modalAction.actionType !== "delete" && (
                            <span className="flex items-center gap-2 p-4 text-[16px] bg-green-500/20 rounded-xl font-semibold text-gray-800">
                                <SafeDBIcon
                                    className="scale-150 text-green-700"
                                    svgRawString={
                                        modalAction.action.user_habit.habit.icon
                                    }
                                />
                                {modalAction.action.user_habit.habit.name}
                            </span>
                        )}

                        {modalAction.actionType === "delete" && (
                            <>
                                <span className="font-bold text-gray-800 text-[18px]">
                                    ¿Eliminar este registro?
                                </span>
                                <span className="text-gray-600">
                                    Esta acción eliminará permanentemente este
                                    avance de tu historial. No podrás recuperar
                                    esta informacion.
                                </span>
                            </>
                        )}
                    </DialogDescription>
                </DialogHeader>
                {modalAction.actionType === "details" && (
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                            <Calendar />
                            <div>
                                <small className="font-semibold text-gray-700 text-[14px]">
                                    Fecha de realización
                                </small>
                                <p>{recordedAt}</p>
                            </div>
                        </div>
                        {modalAction.action.quantity && (
                            <div>
                                <IconRuler2 />
                                <div>
                                    <small className="font-semibold text-gray-700 text-[14px]">
                                        Cantidad registrada
                                    </small>
                                    <p>{modalAction.action.quantity}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <IconFileDescription />
                            <div>
                                <small className="font-semibold text-gray-700 text-[14px]">
                                    Notas
                                </small>
                                <p className="text-[14px] px-2 py-1 rounded-xl bg-green-500/20 font-medium">
                                    {modalAction.action.notes
                                        ? modalAction.action.notes
                                        : "Sin notas"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {modalAction.actionType === "edit" && (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        <div className="flex gap-2 w-full">
                            <Calendar />
                            <div className="flex flex-col w-full">
                                <FormActivityLabel
                                    isRequired={true}
                                    className="font-semibold text-gray-700 text-[14px]"
                                >
                                    Fecha de realización
                                </FormActivityLabel>
                                <input
                                    className="border py-1 px-2 rounded-md"
                                    type="date"
                                    name="recorded_at"
                                    value={data.recorded_at}
                                    onChange={(e) =>
                                        setData("recorded_at", e.target.value)
                                    }
                                    min={minDate}
                                    max={maxDate}
                                />
                            </div>
                        </div>
                        {modalAction.action.user_habit.habit.tracking_type ===
                            "quantity" && (
                            <div className="flex gap-2 w-full">
                                <Ruler />
                                <div className="flex flex-col w-full">
                                    <FormActivityLabel
                                        className={
                                            "font-semibold text-gray-700 text-[14px]"
                                        }
                                        isRequired={true}
                                    >
                                        Cantidad
                                    </FormActivityLabel>
                                    <input
                                        className="border py-1 px-2 rounded-md"
                                        type="number"
                                        name="quantity"
                                        value={data.quantity}
                                        onChange={(e) =>
                                            setData("quantity", e.target.value)
                                        }
                                        min={1}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex gap-2 w-full">
                            <IconFileDescription />
                            <div className="flex flex-col w-full">
                                <FormActivityLabel
                                    className={
                                        "font-semibold text-gray-700 text-[14px]"
                                    }
                                >
                                    Notas (opcional)
                                </FormActivityLabel>
                                <textarea
                                    className="border rounded-md p-1 resize-none"
                                    name=""
                                    id=""
                                    value={data.notes ?? ""}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                ></textarea>
                            </div>
                        </div>

                        <DialogFooter className={`mt-6 flex flex-row`}>
                            <DialogClose asChild>
                                <Button
                                    className={"cursor-pointer flex-1"}
                                    variant="outline"
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <button
                                type="submit"
                                disabled={processing}
                                className="cursor-pointer flex gap-1 items-center justify-center flex-1 border rounded-lg bg-emerald-600 text-white transition-colors hover:bg-emerald-800"
                            >
                                {processing ? (
                                    <>
                                        Guardando Cambios <Spinner />
                                    </>
                                ) : (
                                    "Guardar Cambios"
                                )}
                            </button>
                        </DialogFooter>
                    </form>
                )}

                {modalAction.actionType === "delete" && (
                    <>
                        <div className="bg-green-600/10 rounded-lg p-2 flex flex-col gap-2">
                            <div className="flex gap-2 ">
                                <div className="flex items-center justify-center p-2 h-12 w-12 text-green-800 bg-green-500/10  aspect-square rounded-full">
                                    <SafeDBIcon
                                        svgRawString={
                                            modalAction.action.user_habit.habit
                                                .icon
                                        }
                                    />
                                </div>
                                <div>
                                    <small className="text-[14px] text-gray-600">
                                        Hábito
                                    </small>
                                    <p className="text-gray-800 font-medium">
                                        {
                                            modalAction.action.user_habit.habit
                                                .name
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center justify-center p-2 h-12 w-12 bg-green-500/10 text-green-800  aspect-square rounded-full">
                                    <Calendar />
                                </div>
                                <div>
                                    <small className="text-[14px] text-gray-600">
                                        Fecha del registro
                                    </small>
                                    <p className="text-gray-800 font-medium">
                                        {recordedAt}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className={`mt-6 flex flex-row`}>
                            <DialogClose asChild>
                                <Button
                                    className={"cursor-pointer flex-1"}
                                    variant="outline"
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <button
                                type="submit"
                                onClick={handleDelete}
                                className="cursor-pointer flex gap-1 items-center justify-center flex-1 border rounded-lg bg-red-600 text-white transition-colors hover:bg-red-800"
                            >
                                {processing ? (
                                    <>
                                        Eliminando <Spinner />
                                    </>
                                ) : (
                                    "Sí, eliminar"
                                )}
                            </button>
                        </DialogFooter>
                    </>
                )}

                {modalAction.actionType === "details" && (
                    <DialogFooter
                        className={`mt-6 flex  flex-col sm:flex-col `}
                    >
                        <DialogClose asChild>
                            <Button
                                className={"cursor-pointer"}
                                variant="outline"
                            >
                                Cerrar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
