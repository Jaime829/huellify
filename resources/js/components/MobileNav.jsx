import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import {
    Leaf,
    RotateCcwClock,
    House,
    Calendar,
    Lightbulb,
    User,
} from "lucide-react";
import { route } from "ziggy-js";
import NavEnlace from "./NavEnlace";
import QuoteNav from "./QuoteNav";
import Logo from "./Logo";

export default function MobileNav() {
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
                className="flex md:hidden items-center justify-center min-h-11 min-w-11 -ml-2 cursor-pointer text-gray-700"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                aria-controls="mobile-nav-drawer"
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
                        id="mobile-nav-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menú principal"
                        className="absolute inset-y-0 left-0 flex h-dvh w-72 max-w-[85vw] flex-col gap-4 overflow-y-auto bg-white p-4 shadow-xl pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <Logo />
                            <button
                                type="button"
                                className="flex items-center justify-center min-h-11 min-w-11 cursor-pointer text-gray-700"
                                aria-label="Cerrar menú"
                                onClick={close}
                            >
                                <X className="size-6" />
                            </button>
                        </div>

                        <nav
                            className="flex flex-col gap-2"
                            aria-label="Navegación principal"
                        >
                            <NavEnlace
                                url={route("dashboard.index")}
                                texto={"Dashboard"}
                                icon={House}
                            />
                            <NavEnlace
                                url={route("dashboard.activities.index")}
                                texto={"Actividades"}
                                icon={Calendar}
                            />
                            <NavEnlace
                                url={route("dashboard.myhabits")}
                                texto={"Habitos"}
                                icon={Leaf}
                            />
                            <NavEnlace
                                url={route("dashboard.history")}
                                texto={"Historial"}
                                icon={RotateCcwClock}
                            />
                            <NavEnlace
                                url={route("dashboard.recommendations")}
                                texto={"Recomendaciones"}
                                icon={Lightbulb}
                            />
                            <NavEnlace
                                url={route("dashboard.profile")}
                                texto={"Perfil"}
                                icon={User}
                            />
                        </nav>
                        <div className="mt-auto">
                            <QuoteNav />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
