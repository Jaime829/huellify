import AdminAside from "@/components/admin/AdminAside";
import AdminHeader from "@/components/admin/AdminHeader";
import RecommendationsMetricsMain from "@/components/admin/recommendations/metrics/RecommendationsMetricsMain";
import ToastMessage from "@/components/ToastMessage";
import { Head } from "@inertiajs/react";


export default function RecommendationsMetrics() {
    return (
        <>
            <Head title="Factores de emision" />
            <main className="flex min-h-screen">
                <AdminAside />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <AdminHeader />
                    <ToastMessage />
                    <RecommendationsMetricsMain />
                </section>
            </main>
        </>
    );
}

