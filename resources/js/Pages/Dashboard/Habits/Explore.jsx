import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import ExploreHabitsMain from "@/components/habits/explore/ExploreHabitsMain";
import MobileBar from "@/components/MobileBar";
import { Head } from "@inertiajs/react";

export default function Explore() {
    return (
        <>
            <Head title="Explorar Habitos" />
            <main className="flex min-h-screen">
                <AsideNav />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <HeaderDashboard />
                    <ExploreHabitsMain />
                </section>
            </main>
            <MobileBar />
        </>
    );
}
