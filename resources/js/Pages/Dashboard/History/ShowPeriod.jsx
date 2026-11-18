import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import HistoryMain from "@/components/dashboard/history/HistoryMain";
import MobileBar from "@/components/MobileBar";
import { Head, usePage } from "@inertiajs/react";
import ShowPeriodMain from "../../../components/dashboard/history/showPeriod/ShowPeriodMain";

export default function ShowPeriod() {
    return (
        <>
            <Head title="Historial" />
            <main className="flex min-h-screen">
                <AsideNav />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <HeaderDashboard />
                    <ShowPeriodMain />
                </section>
            </main>
            <MobileBar />
        </>
    );
}
