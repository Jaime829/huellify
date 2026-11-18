import { IconShieldCheckFilled } from "@tabler/icons-react";
import PopupUserActions from "../PopupUserActions";

export default function AdminHeader() {
    return (
        <div className="p-4 flex items-center justify-between border-b bg-white">
            <p className="font-bold">Panel administrativo</p>
            <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-[14px] p-2 rounded-full text-emerald-800 font-semibold flex items-center gap-2">
                    <IconShieldCheckFilled />
                    Sesión administrativa
                </span>
                <PopupUserActions />
            </div>
        </div>
    );
}
