import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { ArrowLeft, LogOut, Menu, X } from "lucide-react";
import {
    IconChartAreaLineFilled,
    IconDatabaseFilled,
    IconHomeFilled,
} from "@tabler/icons-react";
import { route } from "ziggy-js";
import AdminNavEnlace from "./AdminNavEnlace";

export default function AdminMobileNav() {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        const removeListener = router.on("navigate", () => setOpen(false));
        return () => removeListener();
    }, []);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const focusableSelector =
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.stopPropagation();
                setOpen(false);
                buttonRef.current?.focus();
                return;
            }
            if (event.key !== "Tab" || !panelRef.current) {
                return;
            }
            const focusable = Array.from(
                panelRef.current.querySelectorAll(focusableSelector),
            );
            if (focusable.length === 0) {
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        panelRef.current?.querySelector(focusableSelector)?.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    const close = () => {
        setOpen(false);
        buttonRef.current?.focus();
    };

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                className="flex md:hidden items-center justify-center min-h-11 min-w-11 -ml-2 cursor-pointer text-teal-900"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                aria-controls="admin-mobile-nav-drawer"
                onClick={() => setOpen((value) => !value)}
            >
                {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>

            {open && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div
                        className="absolute inset-0 bg-black/40"
                        aria-hidden="true"
                        onClick={close}
                    />
                    <div
                        ref={panelRef}
                        id="admin-mobile-nav-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menú de administración"
                        className="absolute inset-y-0 left-0 flex h-dvh w-72 max-w-[85vw] flex-col gap-6 overflow-y-auto bg-teal-800 p-2 shadow-xl pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))]"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div className="w-44 h-fit">
                                <img src="/images/logo-admin.webp" alt="" />
                            </div>
                            <button
                                type="button"
                                className="flex items-center justify-center min-h-11 min-w-11 cursor-pointer text-white"
                                aria-label="Cerrar menú"
                                onClick={close}
                            >
                                <X className="size-6" />
                            </button>
                        </div>
                        <nav
                            className="flex flex-col gap-2"
                            aria-label="Navegación de administración"
                        >
                            <div className="flex flex-col gap-2 pb-8 border-b border-teal-600">
                                <AdminNavEnlace
                                    texto={"Dashboard"}
                                    url={route("admin.index")}
                                    icon={IconHomeFilled}
                                />
                                <AdminNavEnlace
                                    texto={"Factores de emisión"}
                                    url={route("admin.emissions.index")}
                                    icon={IconDatabaseFilled}
                                />
                                <AdminNavEnlace
                                    texto={"Métricas de recomendaciones"}
                                    url={route("admin.recommendations.metrics")}
                                    icon={IconChartAreaLineFilled}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <AdminNavEnlace
                                    texto={"Volver a la plataforma"}
                                    url={route("dashboard.index")}
                                    icon={ArrowLeft}
                                />
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        router.post(route("auth.logout"));
                                    }}
                                    className="w-full"
                                >
                                    <button
                                        type="submit"
                                        className="w-full flex items-center gap-2 p-2 min-h-11 rounded-lg text-white font-medium text-[14px] transition-colors hover:bg-teal-600/60 cursor-pointer"
                                    >
                                        <LogOut /> <span>Cerrar sesión</span>
                                    </button>
                                </form>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
