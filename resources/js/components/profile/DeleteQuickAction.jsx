import { ChevronRight, Eye, EyeClosed, Trash } from "lucide-react";
import { IconLock } from "@tabler/icons-react";

import {
    DialogHeader,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogClose } from "radix-ui/dialog";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { authUser } from "@/stores/user-store";

export default function DeleteQuickAction() {
    const [show, setShow] = useState(false);
    const user = authUser().user;
    const {
        delete: destroy,
        errors,
        setData,
        processing,
    } = useForm({
        password: "",
    });

    const destroyHandle = (e) => {
        e.preventDefault();
        destroy(route("user.destroy", user.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Trash size={20} />
                <p>Eliminar cuenta</p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={"cursor-pointer"} variant="outline">
                        <ChevronRight />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm z-100">
                    <DialogHeader>
                        <DialogTitle>Eliminar cuenta</DialogTitle>
                        <DialogDescription>
                            Seguro que deseas eliminar tu cuenta, no hay vuelta
                            atras cuando lo haga
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={destroyHandle}>
                        <input
                            type="hidden"
                            name="_token"
                            value={document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content")}
                        />
                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="password">
                                Escribe tu contraseña:
                            </label>
                            <div className="flex items-center gap-1">
                                <IconLock className="text-gray-500" />
                                <div className="flex items-center border border-gray-300 rounded-md p-1 transition-all ease-in delay-75  focus:border-green-500 focus:ring-2 focus:ring-green-600/50">
                                    <input
                                        onChange={(e) => {
                                            setData(
                                                "password",
                                                e.currentTarget.value,
                                            );
                                        }}
                                        required
                                        type={show ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        className="focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShow(!show);
                                        }}
                                    >
                                        {show ? <Eye /> : <EyeClosed />}
                                    </button>
                                </div>
                            </div>
                            {errors.password && (
                                <p className="text-red-600 text-[14px]">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className={'cursor-pointer'} variant="outline">Cancelar</Button>
                            </DialogClose>
                            <button
                                disabled={processing}
                                className={
                                    "cursor-pointer bg-red-600 text-white hover:bg-red-800 p-1 rounded-md"
                                }
                                type="submit"
                            >
                                {processing
                                    ? "Eliminando cuenta..."
                                    : "Eliminar cuenta"}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
