import { userStore } from "@/stores/user-store";

export default function BienvenidaCard() {
    const userRecover = userStore((state) => state.userSaved);

    return (
        <div className="col-span-3 relative w-full max-h-40 rounded-xl bg-slate-50 overflow-hidden p-8 flex items-center shadow">
            <div className="absolute inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 bg-cover bg-bottom-right z-0">
                <img
                    className="size-full absolute object-cover -z-10 object-bottom-right"
                    src="/images/bg-auth2.jpg"
                    alt="Fondo Bienvenida"
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-50 via-slate-50/80 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-xl grid gap-2">
                <p className="text-sm font-medium text-emerald-800 flex items-center gap-1">
                    {" "}
                    Hola,{" "}
                    {userRecover
                        ? userRecover.name
                        : "Cargando usuario..."}{" "}
                    <span>👋</span>
                </p>
                <h1 className="text-2xl md:text-2xl font-bold text-teal-950 tracking-tight">
                    Aquí está el resumen de tu huella de carbono
                </h1>
                <p className="text-slate-600 text-sm md:text-base leading-5">
                    Seguimos construyendo un futuro más sostenible. <br /> Cada
                    acció cuenta.
                </p>
            </div>
        </div>
    );
}
