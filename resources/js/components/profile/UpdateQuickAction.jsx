import {  Pencil } from "lucide-react";

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
import { route } from "ziggy-js";
import { authUser } from "@/stores/user-store";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function UpdateQuickAction() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = authUser().user;
    const { data, setData, put, processing } = useForm({
        name: user.name,
        description: user?.description,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("user.update", user.id), {
            onSuccess: () => {
                setIsModalOpen(false);
            },
        });
    };

    return (
        <div className="flex items-center justify-between absolute bottom-6 right-6">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                    <button className="cursor-pointer border border-green-700 text-emerald-700 flex items-center gap-1 text-[14px] p-2 bg-white rounded-md">
                        <Pencil size={15} /> Editar perfil
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Editar perfil</DialogTitle>
                        <DialogDescription>
                            Realiza cambios en tu perfil aquí. Haz clic en
                            guardar cuando hayas terminado.
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
                        <div className="flex flex-col gap-1">
                            <div className="w-full max-w-sm">
                                <label htmlFor="name" className="text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200"
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="w-full max-w-sm">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Descripcion
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                className="w-full h-37.5 resize-none px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200"
                                placeholder="Escribe algo aquí..."
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            >
                                {data.description}
                            </textarea>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <button
                                disabled={processing}
                                className={
                                    "cursor-pointer bg-emerald-700 text-white hover:bg-emerald-900 h-8 gap-1.5 px-2.5 rounded-md"
                                }
                                type="submit"
                            >
                                {processing
                                    ? "Guardando cambios..."
                                    : "Actualizar perfil"}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
