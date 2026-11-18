import { IconBell } from "@tabler/icons-react";

export default function NotificationBtn() {
    return (
        <button
            type="button"
            aria-label="Notificaciones"
            className="flex items-center justify-center min-h-11 min-w-11 md:min-h-0 md:min-w-0 cursor-pointer"
        >
            <IconBell className="size-6 text-gray-500" />
        </button>
    );
}
