import ActivitiesContent from "@/components/activities/ActivitiesContent";
import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import MobileBar from "@/components/MobileBar";

export default function Activities() {
    return (
        <>
            <main className="flex min-h-screen">
                <AsideNav />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <HeaderDashboard />
                    <ActivitiesContent />
                </section>
            </main>
            <MobileBar />
        </>
    );
}
