import { IconShieldCheckFilled } from "@tabler/icons-react";
import PopupUserActions from "../PopupUserActions";
import AdminMobileNav from "./AdminMobileNav";

export default function AdminHeader() {
    return (
        <div className="p-4 flex items-center justify-between gap-2 border-b bg-white pt-[max(1rem,env(safe-area-inset-top))]">
            <div className="flex items-center gap-2 min-w-0">
                <AdminMobileNav />
                <p className="font-bold truncate">Panel administrativo</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <span className="bg-emerald-500/20 text-[14px] p-2 rounded-full text-emerald-800 font-semibold hidden sm:flex items-center gap-2">
                    <IconShieldCheckFilled />
                    Sesión administrativa
                </span>
                <span
                    className="bg-emerald-500/20 p-2 rounded-full text-emerald-800 sm:hidden"
                    title="Sesión administrativa"
                >
                    <IconShieldCheckFilled />
                </span>
                <PopupUserActions />
            </div>
        </div>
    );
}
