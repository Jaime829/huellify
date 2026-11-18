import AsideNav from "@/components/AsideNav";
import DashboardContent from "@/components/dashboard/DashboardContent";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard"/>
            <main className="flex min-h-dvh">
                <AsideNav />
                <section className="flex flex-col flex-1 min-w-0 bg-gray-50">
                    <HeaderDashboard />
                    <DashboardContent />
                </section>
            </main>
        </>
    );
}
