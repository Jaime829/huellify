import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import UserHabitHistoryMain from "@/components/habits/history/UserHabitHistoryMain";
import MobileBar from "@/components/MobileBar";
import { Head, usePage } from "@inertiajs/react";

export default function UserHabitHistory() {
    const { name } = usePage().props.userHabit.habit;
    return (
        <>
            <Head title={name} />
            <main className="flex min-h-screen">
                <AsideNav />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <HeaderDashboard />
                    <UserHabitHistoryMain />
                </section>
            </main>
            <MobileBar />
        </>
    );
}
