import React from "react";
import SearchInput from "../SearchInput";
import NotificationBtn from "../NotificationBtn";
import Logo from "../Logo";
import UserNavSection from "../UserNavSection";

export default function HeaderDashboard() {
    return (
        <>
            <nav className="w-full px-4 py-2 flex items-center justify-between bg-white shadow-sm sticky top-0 z-100">
                <Logo isHidden={true} />
                <SearchInput />

                <div className="flex gap-4">
                    <NotificationBtn />
                    <UserNavSection />
                </div>
            </nav>
        </>
    );
}
