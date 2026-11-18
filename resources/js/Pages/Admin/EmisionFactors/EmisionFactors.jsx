import AdminAside from "@/components/admin/AdminAside";
import AdminHeader from "@/components/admin/AdminHeader";
import EmissionFactorsMain from "@/components/admin/emisionFactors/EmissionFactorsMain";
import ToastMessage from "@/components/ToastMessage";
import { Head } from "@inertiajs/react";

export default function EmisionFactors() {
    return (
        <>
            <Head title="Factores de emision" />
            <main className="flex min-h-dvh">
                <AdminAside />
                <section className="flex flex-col flex-1 min-w-0 bg-gray-50">
                    <AdminHeader />
                    <ToastMessage />
                    <EmissionFactorsMain />
                </section>
            </main>
        </>
    );
}
