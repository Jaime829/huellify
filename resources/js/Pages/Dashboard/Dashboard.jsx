import AsideNav from "@/components/AsideNav";
import DashboardContent from "@/components/dashboard/DashboardContent";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import MobileBar from "@/components/MobileBar";

export default function Dashboard() {
    return (
        <>
            <main className="flex min-h-screen">
                <AsideNav />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <HeaderDashboard />
                    <DashboardContent />
                </section>
            </main>
            <MobileBar />
        </>
    );
}
