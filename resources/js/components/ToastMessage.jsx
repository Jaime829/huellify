import { usePage, router } from "@inertiajs/react";
import {
    IconCircleX,
    IconInfoCircle,
    IconInfoCircleFilled,
    IconLeafFilled,
    IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ToastMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        if (flash.status?.text || flash.error?.text || flash.noChange?.text) {
            setVisible(true);

            const tiempo = flash.status ? 4000 : 6000;
            const timer = setTimeout(() => setVisible(false), tiempo);

            return () => clearTimeout(timer);
        }
    }, [flash.status?.time, flash.error?.time, flash.noChange?.time]);
    if (!visible) return null;

    return (
        <>
            <ul className="flex flex-col gap-2 fixed top-20 left-2 right-2 sm:left-auto sm:right-8 sm:w-64 z-1000">
                {flash.status && (
                    <li
                        className={`${visible ? "flex" : "hidden"} relative items-center animate-wobble border-l-8 border-green-500 gap-2 text-xs w-full sm:w-64 h-16 bg-white shadow p-2 rounded-md`}
                    >
                        <span className="p-1 text-green-700 rounded-full bg-green-600/10">
                            <IconLeafFilled />
                        </span>
                        <div>
                            <p className="font-bold text-emerald-800">Exito</p>
                            <p className="text-gray-400 font-[12px]">
                                {flash.status.text}
                            </p>
                        </div>

                        <button
                            onClick={() => setVisible(false)}
                            className="absolute top-1 right-1 p-2 cursor-pointer" aria-label="Cerrar"
                        >
                            <IconX size={16} />
                        </button>
                    </li>
                )}

                {flash.error && (
                    <li
                        className={`${visible ? "flex" : "hidden"} relative items-center animate-wobble border-l-8 border-red-500 gap-2 text-xs w-full sm:w-64 h-16 bg-white shadow p-2 rounded-md`}
                    >
                        <span className="p-1 text-red-700 rounded-full bg-red-600/10">
                            <IconCircleX />
                        </span>
                        <div>
                            <p className="font-bold text-red-800">Error</p>
                            <p className="text-gray-400 font-[12px]">
                                {flash.error.text}
                            </p>
                        </div>

                        <button
                            onClick={() => setVisible(false)}
                            className="absolute top-1 right-1 p-2 cursor-pointer" aria-label="Cerrar"
                        >
                            <IconX size={16} />
                        </button>
                    </li>
                )}
                {flash.noChange && (
                    <li
                        className={`${visible ? "flex" : "hidden"} relative items-center animate-wobble border-l-8 border-gray-500 gap-2 text-xs w-full sm:w-64 h-fit bg-white shadow p-2 rounded-md`}
                    >
                        <span className="p-1 text-gray-700 rounded-full">
                            <IconInfoCircle />
                        </span>
                        <div>
                            <p className="font-bold text-gray-800">
                                Sin cambios
                            </p>
                            <p className="text-gray-400 font-[12px]">
                                {flash.noChange.text}
                            </p>
                        </div>

                        <button
                            onClick={() => setVisible(false)}
                            className="absolute top-1 right-1 p-2 cursor-pointer" aria-label="Cerrar"
                        >
                            <IconX size={16} />
                        </button>
                    </li>
                )}
            </ul>
        </>
    );
}
