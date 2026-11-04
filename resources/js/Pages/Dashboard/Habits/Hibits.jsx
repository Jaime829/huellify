import AsideNav from "@/components/AsideNav";
import DashboardContent from "@/components/dashboard/DashboardContent";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import HabitsMain from "@/components/habits/HabitsMain";
import MobileBar from "@/components/MobileBar";
import { Head } from "@inertiajs/react";

export default function Hibits() {
    return (
        <>
            <Head title="Habitos" />
            <main className="flex min-h-screen">
                <AsideNav />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <HeaderDashboard />
                    <HabitsMain />
                </section>
            </main>
            <MobileBar />
        </>
    );
}
