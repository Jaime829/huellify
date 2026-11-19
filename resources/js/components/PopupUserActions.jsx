import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Eye, LogOut } from "lucide-react";
import UserInfo from "./UserInfo";
import { route } from "ziggy-js";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import { IconUserShield } from "@tabler/icons-react";

export default function PopupUserActions() {
    const [state, setState] = useState(false);

    return (
        <Collapsible className="relative z-1000 w-fit">
            <CollapsibleTrigger
                className="flex gap-1 items-center cursor-pointer"
                onClick={() => {
                    setState(!state);
                }}
            >
                <UserInfo />
                {state ? (
                    <ChevronUp className="text-gray-500 hidden md:block" />
                ) : (
                    <ChevronDown className="text-gray-500 hidden md:block" />
                )}
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute  flex flex-col items-center animate-fade-in-right animate-duration-250 gap-6 top-10 right-0 w-35 lg:w-52 py-4 px-2 bg-white border border-gray-400 shadow-md rounded-md">
                <div className="flex flex-col gap-1 w-full">
                    <UserInfo className="animate-fade-in-right animate-duration-350" />

                    <Link
                        href={route("dashboard.profile")}
                        className="animate-fade-in-right animate-duration-350 text-center text-gray-500 flex gap-1 items-center w-full text-[12px] transition-colors ease-in-out delay-75 hover:bg-gray-100 rounded-md p-2"
                    >
                        <Eye className="size-5" /> Ver perfil
                    </Link>
                    {window.location.href != route("admin.index") && (
                        <Link
                            href={route("admin.index")}
                            className="animate-fade-in-right animate-duration-350 text-center text-gray-500 flex gap-1 items-center w-full text-[12px] transition-colors ease-in-out delay-75 hover:bg-gray-100 rounded-md p-2"
                        >
                            <IconUserShield className="size-5" /> Panel de administracion
                        </Link>
                    )}
                </div>

                <form
                    className="w-full animate-duration-500 animate-fade-in-right"
                    action={route("auth.logout")}
                    method="post"
                >
                    <input
                        type="hidden"
                        name="_token"
                        value={document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content")}
                    />
                    <button
                        className="text-center gap-1 cursor-pointer text-red-500 flex items-center w-full text-[12px] transition-colors ease-in-out delay-75 hover:bg-red-500/10 hover: rounded-md p-2"
                        type="submit"
                    >
                        <LogOut className="size-5" /> Cerrar sesion
                    </button>
                </form>
            </CollapsibleContent>
        </Collapsible>
    );
}
