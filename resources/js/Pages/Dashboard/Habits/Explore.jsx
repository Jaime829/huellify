import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import ExploreHabitsMain from "@/components/habits/explore/ExploreHabitsMain";
import { Head } from "@inertiajs/react";

export default function Explore() {
    return (
        <>
            <Head title="Explorar Habitos" />
            <main className="flex min-h-dvh">
                <AsideNav />
                <section className="flex flex-col flex-1 min-w-0">
                    <HeaderDashboard />
                    <ExploreHabitsMain />
                </section>
            </main>
        </>
    );
}
