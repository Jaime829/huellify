import { authUser } from "@/stores/user-store";

export default function UserAvatar({ size = 12, isNav = true }) {
    const userName = authUser().user.name;
    console.log(`font-[${size}px]`);
    return (
        <div
            className={`w-${size} h-${size} flex items-center justify-center bg-emerald-600 rounded-full text-white font-bold ${isNav ? "text-[16px]" : `text-[${size}px]`} `}
        >
            <p>{userName[0]}</p>
        </div>
    );
}
