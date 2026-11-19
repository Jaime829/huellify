import { IconLeafFilled } from "@tabler/icons-react";
import React from "react";

export default function UserQuote() {
    return (
        <div className="col-span-1 h-full lg:col-span-3 rounded-md bg-white shadow p-4 relative">
            <div className="flex gap-2 items-center w-full h-full bg-green-500/10 p-2 rounded-md">
                <div className="flex items-center justify-center rounded-full bg-green-600/10 text-emerald-800 w-16 h-16">
                    <IconLeafFilled />
                </div>
                <div>
                    <p className="font-bold text-emerald-800">
                        Tu huella importa
                    </p>
                    <p className="text-emerald-800">
                        Sigue midiendo, aprendiendo y tomando acción.
                    </p>
                </div>
                <div className="hidden lg:block lg:w-24 lg:h-24 lg:absolute lg:right-2 lg:top-4">
                    <img
                        className="object-cover"
                        src="/images/assets/asset-plant.webp"
                        alt="Asset Plant"
                    />
                </div>
            </div>
        </div>
    );
}
