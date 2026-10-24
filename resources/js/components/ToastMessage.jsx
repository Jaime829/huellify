import { usePage } from "@inertiajs/react";
import { IconCircleCheck, IconLeafFilled, IconX } from "@tabler/icons-react";
import { ClosedCaptionIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToastMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash.status) {
            setVisible(true);

            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [setVisible, flash]);

    if (!visible) return null;

    return (
        <>
            <ul className="flex flex-col gap-2 fixed top-20 right-8 z-1000">
                {flash.status && (
                    <li
                        className={`${visible ? "flex" : "hidden"} relative items-center animate-wobble border-l-8 border-green-500 gap-2 text-xs w-64 h-16 bg-white shadow p-2 rounded-md`}
                    >
                        <span className="p-1 text-green-700 rounded-full bg-green-600/10">
                            <IconLeafFilled />
                        </span>
                        <div>
                            <p className="font-bold text-emerald-800">Exito</p>
                            <p className="text-gray-400 font-[12px]">
                                {flash.status}
                            </p>
                        </div>

                        <button
                            onClick={() => setVisible(false)}
                            className="absolute top-1 right-1 cursor-pointer"
                        >
                            <IconX size={16} />
                        </button>
                    </li>
                )}

                {flash.errors}
            </ul>
        </>
    );
}
