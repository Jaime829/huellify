import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import MobileBar from "@/components/MobileBar";
import ProfileContent from "@/components/profile/ProfileContent";
import React from "react";

export default function Profile() {
    return (
        <>
            <main className="flex min-h-screen">
                <AsideNav />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <HeaderDashboard />
                    <ProfileContent />
                </section>
            </main>
            <MobileBar />
        </>
    );
}
