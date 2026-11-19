import ActivitiesCreateContent from "@/components/activities/create/ActivitiesCreateContent";
import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import { Head } from "@inertiajs/react";

export default function CreateActivity() {
    return (
        <>
            <Head title="Activities" />
            <main className="flex min-h-dvh pb-6 lg:pb-0">
                <AsideNav />
                <section className="flex flex-col flex-1 min-w-0 bg-gray-50">
                    <HeaderDashboard />
                    <ActivitiesCreateContent />
                </section>
            </main>
        </>
    );
}
