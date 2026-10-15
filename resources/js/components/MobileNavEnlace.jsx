export default function MobileNavEnlace({ icon: Icon, text, url }) {
    const isPageActual =
        window.location.href === url ? "text-emerald-800" : "text-gray-500";

    return (
        <a href={url} className={`flex flex-col items-center text-sm ${isPageActual}`}>
            <Icon />
            <p>{text}</p>
        </a>
    );
}
