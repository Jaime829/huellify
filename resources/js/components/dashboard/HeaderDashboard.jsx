import React from "react";
import SearchInput from "../SearchInput";
import NotificationBtn from "../NotificationBtn";
import Logo from "../Logo";
import PopupUserActions from "../PopupUserActions";
import MobileNav from "../MobileNav";

export default function HeaderDashboard() {
    return (
        <>
            <nav className="w-full px-4 py-2 flex items-center justify-between gap-2 bg-white shadow-sm sticky top-0 z-50 pt-[max(0.5rem,env(safe-area-inset-top))]">
                <div className="flex items-center gap-1 min-w-0">
                    <MobileNav />
                    <Logo isHidden={true} />
                </div>
                <SearchInput />

                <div className="flex gap-4">
                    <NotificationBtn />
                    <PopupUserActions />
                </div>
            </nav>
        </>
    );
}
