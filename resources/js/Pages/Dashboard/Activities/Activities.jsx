import ActivitiesContent from "@/components/activities/ActivitiesContent";
import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import { Head } from "@inertiajs/react";

export default function Activities() {
    return (
        <>
            <Head title="Activities"/>
            <main className="flex min-h-dvh">
                <AsideNav />
                <section className="flex flex-col flex-1 min-w-0 bg-gray-50">
                    <HeaderDashboard />
                    <ActivitiesContent />
                </section>
            </main>
        </>
    );
}
