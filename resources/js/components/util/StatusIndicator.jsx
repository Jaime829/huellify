import { IconCircleFilled } from "@tabler/icons-react";

export default function StatusIndicator({ status, className = "" }) {
    return (
        <span
            className={`${className} ${
                status === "active" && "bg-green-500/20 text-emerald-700"
            }  ${status === "paused" && "bg-gray-500/20 text-gray-700"} ${
                status === "abandoned" && "bg-red-500/20 text-red-700"
            } px-2 py-1 flex gap-1 items-center rounded-xl font-medium h-fit w-fit`}
        >
            <IconCircleFilled size={15} />

            {status === "active" && "Activo"}
            {status === "paused" && "Pausado"}
            {status === "abandoned" && "Abandonado"}
        </span>
    );
}
