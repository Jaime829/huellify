import { authUser } from "@/stores/user-store";
import { Link } from "@inertiajs/react";
import { CircleCheck, CircleX, Edit, Pencil } from "lucide-react";
import UpdateQuickAction from "./UpdateQuickAction";

export default function UserResumen() {
    const user = authUser().user;
    return (
        <div className="flex bg-green-500/10 h-full col-span-3 rounded-md p-4 relative">
            <div className="w-28 h-28 rounded-full overflow-hidden">
                <img
                    className="object-cover w-full h-full"
                    src="/images/assets/user-avatar.png"
                    alt=""
                />
            </div>

            <div>
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-emerald-900">
                            {user?.name}
                        </h1>
                        <p className="text-[12px] text-gray-500">
                            {user?.email}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        {user?.email_verified_at ? (
                            <div className="rounded-xl p-1 text-[10px] text-green-700 bg-green-600/20 max-w-28 flex items-center justify-center gap-1">
                                <CircleCheck size={15} /> Correo verificado
                            </div>
                        ) : (
                            <div className="rounded-xl p-1 text-[10px] text-red-700 bg-red-600/20 max-w-28 flex items-center justify-center gap-1">
                                <CircleX size={15} /> Correo no verificado
                            </div>
                        )}

                        <p className="max-w-86 text-gray-600 text-[14px] font-medium">
                            {user.description}.
                        </p>
                    </div>
                </div>
            </div>
            <UpdateQuickAction />
        </div>
    );
}
