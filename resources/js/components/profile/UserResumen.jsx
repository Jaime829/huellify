import { Link, usePage } from "@inertiajs/react";
import { CircleCheck, CircleX, Edit, Pencil } from "lucide-react";

export default function UserResumen() {
    const { user } = usePage().props;

    return (
        <div className="flex bg-green-600/10 col-span-3 rounded-md p-2 relative">
            <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                    className="object-cover w-full h-full"
                    src="/images/assets/user-avatar.png"
                    alt=""
                />
            </div>

            <div>
                <div className="flex flex-col gap-2">
                    <div>
                        <h1 className="text-[14px] font-bold text-emerald-900">
                            {user?.name}
                        </h1>
                        <p className="text-[12px] text-gray-500">
                            {user?.email}
                        </p>
                    </div>
                    {user?.email_verified_at ? (
                        <div className="rounded-xl p-1 text-[10px] text-green-700 bg-green-600/20 max-w-28 flex items-center justify-center gap-1">
                            <CircleCheck size={15} /> Correo verificado
                        </div>
                    ) : (
                        <div className="rounded-xl p-1 text-[10px] text-red-700 bg-red-600/20 max-w-28 flex items-center justify-center gap-1">
                            <CircleX size={15} /> Correo no verificado
                        </div>
                    )}
                </div>
            </div>
            <Link className="absolute flex items-center gap-2 bottom-4 right-4 bg-white border border-green-700 text-green-700 px-3 py-2 rounded-[10px] text-[14px]">
                <Pencil size={17}/> Editar perfil
            </Link>
        </div>
    );
}
