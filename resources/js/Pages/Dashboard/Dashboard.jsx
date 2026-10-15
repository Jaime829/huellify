import AsideNav from "@/components/AsideNav";
import DashboardContent from "@/components/dashboard/DashboardContent";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import MobileBar from "@/components/MobileBar";
import { userStore } from "@/stores/user-store";
import { useEffect } from "react";

export default function Dashboard({ user }) {
    const userSave = userStore((state) => state.userSave);

    useEffect(() => {
        if (user) {
            userSave(user);
        }
    }, [user, userSave]);

    return (
        <>
            <main className="flex min-h-screen">
                <AsideNav />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <HeaderDashboard />
                    <DashboardContent />
                </section>
            </main>
            <MobileBar />
        </>
    );
}
