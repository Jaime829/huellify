import { authUser } from "@/stores/user-store";

export default function UserAvatar({ size = 10, isNav = true }) {
    const userName = authUser().user.name;
    return (
        <div
            className={`w-${size} h-${size} flex items-center justify-center bg-emerald-600 rounded-full text-white font-bold aspect-square ${isNav ? "text-[16px]" : `text-[${size}px]`} `}
        >
            <p>{userName[0]}</p>
        </div>
    );
}
