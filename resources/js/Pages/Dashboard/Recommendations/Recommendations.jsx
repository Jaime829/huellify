import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import RecommendationsMain from "@/components/recommendations/RecommendationsMain";
import ToastMessage from "@/components/ToastMessage";
import { Head } from "@inertiajs/react";

export default function Recommendations() {
    return (
        <>
            <Head title="Recomendaciones" />
            <main className="flex min-h-dvh">
                <AsideNav />
                <section className="flex flex-col flex-1 min-w-0 bg-gray-50">
                    <HeaderDashboard />
                    <ToastMessage />
                    <RecommendationsMain />
                </section>
            </main>
        </>
    );
}
