import { authUser } from "@/stores/user-store";
import UserAvatar from "./UserAvatar";

export default function UserInfo({ className = "" }) {
    const user = authUser().user;
    return (
        <div className={`${className} flex gap-1 items-center`}>
            <UserAvatar />
            {/* <div className="w-10 h-10">
                <img src="/images/assets/user-avatar.png" alt="User Avatar" />
            </div> */}
            <div className="hidden md:flex md:flex-col md:gap-2 md:justify-center">
                {user ? (
                    <>
                        <p className="margin-0 text-sm leading-1 font-bold">
                            {user.name}
                        </p>
                        <small className="text-gray-500">
                            {user.rol === "user" ? "Usuario" : "Admin"}
                        </small>
                    </>
                ) : (
                    <p className="margin-0 text-sm leading-1 font-bold"></p>
                )}
            </div>
        </div>
    );
}
