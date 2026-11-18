import AdminAside from "@/components/admin/AdminAside";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminMain from "@/components/admin/AdminMain";
import ToastMessage from "@/components/ToastMessage";
import { Head } from "@inertiajs/react";

export default function Admin() {
    return (
        <>
            <Head title="Administracion" />
            <main className="flex min-h-screen">
                <AdminAside />
                <section className="flex flex-col flex-1 bg-gray-50">
                    <AdminHeader />
                    <ToastMessage />
                    <AdminMain />
                </section>
            </main>
        </>
    );
}
