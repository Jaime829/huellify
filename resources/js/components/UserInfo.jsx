import { authUser } from "@/stores/user-store";

export default function UserInfo() {
    const user = authUser().user;
    return (
        <div className="flex gap-1 items-center">
            <div className="w-10 h-10">
                <img src="/images/assets/user-avatar.png" alt="User Avatar" />
            </div>
            <div className="hidden md:block">
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
