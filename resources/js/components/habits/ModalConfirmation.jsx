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
import { Ban, Check, Pause, Play, RefreshCw, Trash } from "lucide-react";
import { route } from "ziggy-js";

export default function ModalConfirmation({
    confirmationAction,
    setConfirmationAction,
}) {
    if (!confirmationAction.habit) return null;

    const {
        patch,
        processing,
        delete: destroy,
    } = useForm({
        action: confirmationAction.action,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(
            route(
                "dashboard.myhabit.update",
                confirmationAction.habit.pivot.id,
            ),
            {
                onSuccess: () => {
                    setConfirmationAction({
                        isOpen: false,
                        action: null,
                        habit: null,
                    });
                },
            },
        );
    };
    const handleDelete = (e) => {
        e.preventDefault();
        destroy(
            route(
                "dashboard.myhabit.destroy",
                confirmationAction.habit.pivot.id,
            ),
            {
                onSuccess: () => {
                    setConfirmationAction({
                        isOpen: false,
                        action: null,
                        habit: null,
                    });
                },
            },
        );
    };

    return (
        <Dialog
            open={confirmationAction.isOpen}
            onOpenChange={(open) => {
                if (!open)
                    setConfirmationAction({
                        isOpen: false,
                        action: null,
                        habit: null,
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
                            className={`${confirmationAction.action === "resume" && "text-emerald-700 bg-green-500/30"} ${confirmationAction.action === "pause" && "text-emerald-800 bg-green-500/20"} ${confirmationAction.action === "abandon" && "text-orange-800 bg-orange-500/20"} ${
                                confirmationAction.action === "delete" &&
                                "text-red-800 bg-red-400/20"
                            } ${
                                confirmationAction.action === "readopt" &&
                                "text-emerald-700 bg-green-500/30"
                            }  h-20 w-20 aspect-square rounded-full flex items-center justify-center`}
                        >
                            {confirmationAction.action === "resume" && (
                                <Play size={40} strokeWidth={3} />
                            )}
                            {confirmationAction.action === "pause" && (
                                <Pause size={40} strokeWidth={3} />
                            )}
                            {confirmationAction.action === "abandon" && (
                                <Ban size={40} strokeWidth={3} />
                            )}
                            {confirmationAction.action === "delete" && (
                                <Trash size={40} strokeWidth={3} />
                            )}
                            {confirmationAction.action === "readopt" && (
                                <RefreshCw />
                            )}
                        </div>
                    </DialogTitle>
                    <DialogDescription className={"flex flex-col gap-2"}>
                        <span className="font-bold text-black text-[18px]">
                            {confirmationAction.action === "resume" &&
                                "¿Reanudar este hábito?"}
                            {confirmationAction.action === "pause" &&
                                "¿Pausar este hábito?"}
                            {confirmationAction.action === "abandon" &&
                                "¿Abandonar este hábito?"}
                            {confirmationAction.action === "delete" &&
                                "¿Eliminar este hábito?"}
                            {confirmationAction.action === "readopt" &&
                                "¿Volver a adoptar este hábito?"}
                        </span>
                        <span className="rounded-xl text-gray-700 font-medium">
                            {confirmationAction.action === "resume" &&
                                "¿Reanudar este hábito?"}
                            {confirmationAction.action === "pause" &&
                                "Dejarás de registrar avances mientras el hábito esté pausado. Podrás retomarlo cuando quieras."}
                            {confirmationAction.action === "abandon" &&
                                "El habito dejará de estar activo y pasara al estado <<Abandonado>>. Podrás consultar tu historial de avances y volver a adoptarlo cuando quieras."}
                            {confirmationAction.action === "delete" &&
                                "Esta acción eliminará el hábito de tu lista y todos los avances asociados. No podrás recuparar esta informacion."}
                            {confirmationAction.action === "readopt" &&
                                "Volverás a incorporar este hábito a tu seguimiento. Podrás configurar nuevamente tu objetivo semanal y continuar registrando tus avances. Tu historial anterior se conservará."}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="_token"
                        value={document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content")}
                    />
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
                            className={`${confirmationAction.action === "resume" && "bg-emerald-700 text-white hover:bg-emerald-900"} ${confirmationAction.action === "pause" && "bg-emerald-700 text-white hover:bg-emerald-900"} ${confirmationAction.action === "abandon" && "text-white bg-orange-600 hover:bg-orange-800"} ${
                                confirmationAction.action === "delete" &&
                                "text-white bg-red-600 hover:bg-red-800"
                            } ${
                                confirmationAction.action === "readopt" &&
                                "bg-emerald-700 text-white hover:bg-emerald-900"
                            } cursor-pointer font-medium h-8 gap-1.5 px-2.5 rounded-md flex items-center`}
                            disabled={processing}
                            onClick={
                                confirmationAction.action !== "delete"
                                    ? handleSubmit
                                    : handleDelete
                            }
                        >
                            {confirmationAction.action === "resume" &&
                                "¿Reanudar este hábito?"}
                            {confirmationAction.action === "pause" &&
                                (processing ? (
                                    <>
                                        Pausando
                                        <Spinner />
                                    </>
                                ) : (
                                    <>
                                        <Check size={15} />
                                        Sí, pausar
                                    </>
                                ))}
                            {confirmationAction.action === "abandon" &&
                                (processing ? (
                                    <>
                                        Abandonando
                                        <Spinner />
                                    </>
                                ) : (
                                    <>
                                        <Check size={15} />
                                        Sí, abandonar
                                    </>
                                ))}
                            {confirmationAction.action === "delete" &&
                                (processing ? (
                                    <>
                                        Eliminando
                                        <Spinner />
                                    </>
                                ) : (
                                    <>
                                        <Check size={15} />
                                        Sí, eliminar
                                    </>
                                ))}
                            {confirmationAction.action === "readopt" &&
                                (processing ? (
                                    <>
                                        Readoptando
                                        <Spinner />
                                    </>
                                ) : (
                                    <>
                                        <Check size={15} />
                                        Sí, readoptar
                                    </>
                                ))}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
