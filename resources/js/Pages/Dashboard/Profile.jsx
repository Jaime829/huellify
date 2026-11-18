import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import ProfileContent from "@/components/profile/ProfileContent";
import { Head } from "@inertiajs/react";

export default function Profile() {
    return (
        <>
            <Head title="Profile" />
            <main className="flex min-h-dvh">
                <AsideNav />
                <section className="flex flex-col flex-1 min-w-0 bg-gray-50">
                    <HeaderDashboard />
                    <ProfileContent />
                </section>
            </main>
        </>
    );
}
