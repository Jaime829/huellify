import AsideNav from "@/components/AsideNav";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import UserHabitHistoryMain from "@/components/habits/history/UserHabitHistoryMain";
import { Head, usePage } from "@inertiajs/react";

export default function UserHabitHistory() {
    const { name } = usePage().props.userHabit.habit;
    return (
        <>
            <Head title={name} />
            <main className="flex min-h-dvh">
                <AsideNav />
                <section className="flex flex-col flex-1 min-w-0 bg-gray-50">
                    <HeaderDashboard />
                    <UserHabitHistoryMain />
                </section>
            </main>
        </>
    );
}
