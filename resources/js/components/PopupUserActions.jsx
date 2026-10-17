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

export default function PopupUserActions() {
    const [state, setState] = useState(false);

    return (
        <Collapsible className="relative">
            <CollapsibleTrigger
                className="flex gap-1 items-center"
                onClick={() => {
                    setState(!state);
                }}
            >
                <UserInfo />
                {state ? (
                    <>
                        <ChevronUp className="text-gray-500 hidden md:block" />
                    </>
                ) : (
                    <>
                        <ChevronDown className="text-gray-500 hidden md:block" />
                    </>
                )}
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute  flex flex-col items-center gap-1 top-10 right-0 w-35  py-4 px-2 bg-white border border-gray-400 shadow-md rounded-md">
                <UserInfo />

                <Link
                    href={route("dashboard.profile")}
                    className="text-center text-gray-500 flex gap-1 items-center w-full text-[12px] hover:bg-gray-100 rounded-md p-2"
                >
                    <Eye className="size-5" /> Ver perfil
                </Link>

                <form
                    className="w-full"
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
                        className="text-center gap-1 cursor-pointer text-gray-500 flex items-center w-full text-[12px] hover:bg-gray-100 rounded-md p-2"
                        type="submit"
                    >
                        <LogOut className="size-5" /> Cerrar sesion
                    </button>
                </form>
            </CollapsibleContent>
        </Collapsible>
    );
}
