import { Link } from "@inertiajs/react";

export default function AdminNavEnlace({ url, texto, icon: Icon }) {
    const isLocationActual = window.location.href == url;
    return (
        <Link
            className={`${isLocationActual ? "bg-teal-600/60 hover:bg-teal-600/80" : "hover:bg-teal-600/60"} flex items-center gap-2 p-2 rounded-lg text-white font-medium text-[14px] transition-colors`}
            href={url}
        >
            <Icon /> {texto}
        </Link>
    );
}
