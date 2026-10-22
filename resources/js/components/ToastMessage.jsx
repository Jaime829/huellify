import { usePage } from "@inertiajs/react";
import { IconCircleCheck } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

export default function ToastMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash.status) {
            setVisible(true);

            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [setVisible]);

    if (!visible) return null;

    return (
        <>
            {flash.status && (
                <div
                    className={`${visible ? "block" : "hidden"} fixed top-20 right-8 z-[1000]`}
                >
                    <ul className="flex flex-col gap-2">
                        <li className="flex items-center animate-wobble text-white gap-1 h-auto text-xs max-w-46 bg-green-400/80 p-2 rounded-xl">
                            <span>
                                <IconCircleCheck stroke={2} />
                            </span>
                            {flash.status}
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
