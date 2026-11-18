import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import HistoryMain from "@/components/dashboard/history/HistoryMain";
import { Head } from "@inertiajs/react";

export default function History() {
    return (
        <>
            <Head title="Historial" />
            <main className="flex min-h-dvh">
                <AsideNav />
                <section className="flex flex-col flex-1 min-w-0 bg-gray-50">
                    <HeaderDashboard />
                    <HistoryMain />
                </section>
            </main>
        </>
    );
}
