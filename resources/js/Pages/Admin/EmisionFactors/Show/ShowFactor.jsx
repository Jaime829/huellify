import AdminAside from "@/components/admin/AdminAside";
import AdminHeader from "@/components/admin/AdminHeader";
import ShowFactorMain from "@/components/admin/emisionFactors/show/ShowFactorMain";
import ToastMessage from "@/components/ToastMessage";
import { Head } from "@inertiajs/react";

export default function ShowFactor() {
    return (
        <>
            <Head title="Administracion" />
            <main className="flex min-h-dvh">
                <AdminAside />
                <section className="flex flex-col flex-1 min-w-0 bg-gray-50">
                    <AdminHeader />
                    <ToastMessage />
                    <ShowFactorMain />
                </section>
            </main>
        </>
    );
}
