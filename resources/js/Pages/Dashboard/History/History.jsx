import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import HistoryMain from "@/components/dashboard/history/HistoryMain";
import MobileBar from "@/components/MobileBar";
import { Head } from "@inertiajs/react";

export default function History() {
    return (
        <>
            <Head title="Historial" />
            <main className="flex min-h-screen">
                <AsideNav />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <HeaderDashboard />
                    <HistoryMain />
                </section>
            </main>
            <MobileBar />
        </>
    );
}
