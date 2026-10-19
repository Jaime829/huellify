import { Link } from "@inertiajs/react";

export default function NavEnlace({ url, texto, icon: Icon }) {
    const isPageActual =
        window.location.href === url
            ? "bg-green-600/30 text-emerald-800"
            : "text-gray-600";
    return (
        <Link
            className={`flex items-center gap-1 transition-colors text-sm delay-75 ease-in-out hover:bg-green-600/30 hover:text-emerald-800 p-2 rounded-md ${isPageActual}`}
            href={url}
        >
            {Icon && <Icon className="size-5" />} {texto}
        </Link>
    );
}
