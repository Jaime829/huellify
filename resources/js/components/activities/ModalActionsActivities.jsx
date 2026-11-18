import {
    DialogHeader,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { DialogClose } from "radix-ui/dialog";
import SafeDBIcon from "@/components/util/SafeDBIcon";
import {
    Calendar,
    Car,
    Check,
    ChevronDown,
    Fuel,
    Hash,
    Info,
    List,
    Pencil,
    Plug2,
    Ruler,
    Trash,
    Zap,
} from "lucide-react";
import { route } from "ziggy-js";
import activityIcon from "../util/ActivityIcon";
import { useForm, usePage } from "@inertiajs/react";
import { IconFileText, IconLeafFilled } from "@tabler/icons-react";

export default function ModalActionsActivities({
    actionActivity,
    setActionActivity,
}) {
    if (!actionActivity.activity) return null;
    const {
        put,
        delete: destroy,
        data,
        setData,
        processing,
        errors,
    } = useForm(
        actionActivity.activity.activity_category_id === 1
            ? {
                  activity_date: actionActivity.activity.activity_date,
                  description: actionActivity.activity.description,
                  transport_type_id: actionActivity.activity.source_id,
                  fuel_type_id: actionActivity.activity.fuel_type_id,
                  quantity: actionActivity.activity.quantity,
                  measurement_unit_id:
                      actionActivity.activity.measurement_unit_id,
              }
            : {
                  activity_date: actionActivity.activity.activity_date,
                  description: actionActivity.activity.description,
                  measurement_unit_id:
                      actionActivity.activity.measurement_unit_id,
                  energy_source_id: actionActivity.activity.source_id,
                  quantity: actionActivity.activity.quantity,
              },
    );
    const { transportTypes, fuelTypes, energySources } = usePage().props;
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = hoy.getMonth();
    const primerDia = new Date(anio, mes, 1).toISOString().split("T")[0];
    const ultimoDia = new Date(anio, mes + 1, 0).toISOString().split("T")[0];

    const activityDateFormateada = new Date(
        actionActivity.activity.activity_date,
    ).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const IconActivity = activityIcon(
        actionActivity.activity.category_name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        put(
            actionActivity.activity.activity_category_id === 1
                ? route(
                      "dashboard.activities.transport.update",
                      actionActivity.activity.id,
                  )
                : route(
                      "dashboard.activities.energy.update",
                      actionActivity.activity.id,
                  ),
            {
                only: ["flash", "activities", "auth"],
                onSuccess: () => {
                    setActionActivity({
                        isOpen: false,
                        activity: null,
                        action: null,
                    });
                },
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const handleDestroy = (e) => {
        e.preventDefault();
        destroy(
            actionActivity.activity.activity_category_id === 1
                ? route(
                      "dashboard.activities.transport.destroy",
                      actionActivity.activity.id,
                  )
                : route(
                      "dashboard.activities.energy.destroy",
                      actionActivity.activity.id,
                  ),
            {
                only: ["flash", "activities", "auth"],
                onSuccess: () => {
                    setActionActivity({
                        isOpen: false,
                        activity: null,
                        action: null,
                    });
                },
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (
        <Dialog
            open={actionActivity.isOpen && actionActivity.activity}
            onOpenChange={(open) => {
                if (!open)
                    setActionActivity({
                        isOpen: false,
                        activity: null,
                        action: null,
                    });
            }}
        >
            <DialogContent className="sm:max-w-162.5 w-full">
                <DialogHeader>
                    <div className="flex gap-2 items-center">
                        <div
                            className={`${actionActivity.action === "edit" ? "bg-green-500/20 text-emerald-700" : "bg-red-500/20 text-red-700"} w-16 h-16 aspect-square flex items-center justify-center rounded-full`}
                        >
                            {actionActivity.action === "edit" ? (
                                <Pencil size={30} />
                            ) : (
                                <Trash size={30} />
                            )}
                        </div>

                        <div>
                            <p className="text-[18px] font-semibold text-gray-800">
                                {actionActivity.action === "edit"
                                    ? "Editar actividad"
                                    : "¿Eliminar esta actividad?"}
                            </p>
                            {actionActivity.action === "edit" && (
                                <small className="text-[14px] text-gray-600">
                                    Actualiza la información de tu actividad
                                    para mantener tus registros al día.
                                </small>
                            )}
                        </div>
                    </div>
                    {actionActivity.action === "delete" && (
                        <small className="text-[14px] text-gray-600">
                            Esta acción eliminará permanentemente la actividad y
                            no podrás recuperar su informacion
                        </small>
                    )}
                </DialogHeader>
                {actionActivity.action === "edit" && (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-4"
                    >
                        {actionActivity.activity.activity_category_id === 1 && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <legend className="font-bold text-[16px] text-gray-900">
                                        Información general
                                    </legend>
                                    <div className="flex gap-2">
                                        <div className="flex flex-col flex-1 gap-2">
                                            <label
                                                htmlFor="activity_date"
                                                className="flex gap-2 items-center text-gray-800 font-medium text-sm"
                                            >
                                                <Calendar size={15} /> Fecha de
                                                la actividad
                                            </label>
                                            <input
                                                className="border px-2 py-1 rounded-md"
                                                type="date"
                                                name="activity_date"
                                                id="activity_date"
                                                min={primerDia}
                                                max={ultimoDia}
                                                value={data.activity_date}
                                                onChange={(e) =>
                                                    setData(
                                                        "activity_date",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1 gap-2">
                                            <label
                                                htmlFor="description"
                                                className="flex gap-2 items-center text-gray-800 font-medium text-sm"
                                            >
                                                <List size={15} /> Descripción
                                            </label>
                                            <textarea
                                                className="resize-none border px-2 py-1 rounded-md"
                                                name="description"
                                                id="description"
                                                value={data.description ?? ""}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <legend className="font-bold text-[16px] text-gray-900">
                                        Información especifica
                                    </legend>
                                    <div className="flex flex-col gap-2 bg-green-500/10 p-4 rounded-lg">
                                        <div className="flex items-center gap-4 text-emerald-700">
                                            <IconActivity size={45} />
                                            <p className="text-[18px] font-semibold">
                                                {
                                                    actionActivity.activity
                                                        .category_name
                                                }
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-2">
                                                <label
                                                    htmlFor="transport_type_id"
                                                    className="flex gap-2 items-center text-gray-800 font-medium text-sm"
                                                >
                                                    Tipo de transporte
                                                </label>
                                                <div className="flex gap-1 items-center border py-1 px-2 rounded-md bg-white text-gray-700">
                                                    <Car />
                                                    <select
                                                        className="flex-1 focus:outline-none"
                                                        name="transport_type_id"
                                                        id="transport_type_id"
                                                        value={
                                                            data.transport_type_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "transport_type_id",
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        {transportTypes.map(
                                                            (type) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            type.id
                                                                        }
                                                                        value={
                                                                            type.id
                                                                        }
                                                                    >
                                                                        {
                                                                            type.name
                                                                        }
                                                                    </option>
                                                                );
                                                            },
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label
                                                    htmlFor="fuel_type_id"
                                                    className="flex gap-2 items-center text-gray-800 font-medium text-sm"
                                                >
                                                    Tipo de combustible
                                                </label>
                                                <div className="flex gap-1 items-center border py-1 px-2 rounded-md bg-white text-gray-700">
                                                    <Fuel />
                                                    <select
                                                        className="flex-1 focus:outline-none"
                                                        name="fuel_type_id"
                                                        id="fuel_type_id"
                                                        value={
                                                            data.fuel_type_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "fuel_type_id",
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        {fuelTypes.map(
                                                            (type) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            type.id
                                                                        }
                                                                        value={
                                                                            type.id
                                                                        }
                                                                    >
                                                                        {
                                                                            type.name
                                                                        }
                                                                    </option>
                                                                );
                                                            },
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label
                                                    htmlFor="quantity"
                                                    className="flex gap-2 items-center text-gray-800 font-medium text-sm"
                                                >
                                                    Distancia recorrida
                                                </label>
                                                <div className="flex items-center gap-1 border-2 bg-gray-200 rounded-md">
                                                    <input
                                                        className="focus:outline-none flex-1  rounded-md py-1 px-2 bg-white"
                                                        type="number"
                                                        min={1}
                                                        name="quantity"
                                                        id="quantity"
                                                        step={0.001}
                                                        value={data.quantity}
                                                        onChange={(e) =>
                                                            setData(
                                                                "quantity",
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <span className="px-2 font-semibold">
                                                        {
                                                            actionActivity
                                                                .activity
                                                                .measurement_unit
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label
                                                    htmlFor=""
                                                    className="flex gap-2 items-center text-gray-800 font-medium text-sm"
                                                >
                                                    Unidad de medida
                                                </label>
                                                <div className="flex items-center gap-2 px-2 py-1 text-gray-700 bg-gray-400/15 rounded-md">
                                                    <Ruler />
                                                    <span className="flex items-center justify-between  px-2 font-semibold cursor-not-allowed flex-1">
                                                        {
                                                            actionActivity
                                                                .activity
                                                                .measurement_unit
                                                        }
                                                        <ChevronDown />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {actionActivity.activity.activity_category_id === 2 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div className="flex flex-col gap-2 min-w-0">
                                        <label
                                            htmlFor="energy_source_id"
                                            className="flex gap-2 items-center text-gray-800 font-medium text-sm"
                                        >
                                            <Zap
                                                size={18}
                                                className="shrink-0"
                                            />{" "}
                                            Fuente de energía
                                        </label>
                                        <div className="flex items-center py-1.5 px-2 border rounded-md text-gray-800 bg-white w-full">
                                            <Plug2
                                                size={18}
                                                className="shrink-0 mr-1 text-gray-500"
                                            />

                                            <select
                                                className="focus:outline-none w-full min-w-0 bg-transparent text-sm"
                                                value={data.energy_source_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "energy_source_id",
                                                        e.target.value,
                                                    )
                                                }
                                                name="energy_source_id"
                                                id="energy_source_id"
                                            >
                                                {energySources.map((source) => (
                                                    <option
                                                        key={source.id}
                                                        value={source.id}
                                                    >
                                                        {source.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 min-w-0">
                                        <label className="flex gap-2 items-center text-gray-800 font-medium text-sm">
                                            <Hash
                                                size={18}
                                                className="shrink-0"
                                            />{" "}
                                            Cantidad
                                        </label>
                                        <div className="flex items-center border bg-gray-200 rounded-md w-full overflow-hidden">
                                            <input
                                                className="focus:outline-none py-1.5 px-2 bg-white w-full min-w-0 text-sm"
                                                type="number"
                                                min={1}
                                                step={0.001}
                                                value={data.quantity}
                                                onChange={(e) =>
                                                    setData(
                                                        "quantity",
                                                        e.target.value,
                                                    )
                                                }
                                                name="quantity"
                                                id="quantity"
                                            />
                                            <span className="px-2 font-semibold text-xs text-gray-700 shrink-0">
                                                {
                                                    actionActivity.activity
                                                        .measurement_unit
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 min-w-0">
                                        <label
                                            className="flex gap-2 items-center text-gray-800 font-medium text-sm"
                                            htmlFor="activity_date"
                                        >
                                            <Calendar
                                                size={16}
                                                className="shrink-0"
                                            />{" "}
                                            Fecha de registro
                                        </label>
                                        <input
                                            className="border px-2 py-1.5 rounded-md w-full min-w-0 text-sm bg-white"
                                            type="date"
                                            min={primerDia}
                                            max={ultimoDia}
                                            value={data.activity_date}
                                            onChange={(e) =>
                                                setData(
                                                    "activity_date",
                                                    e.target.value,
                                                )
                                            }
                                            name="activity_date"
                                            id="activity_date"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        className="flex gap-2 items-center text-gray-800 font-medium text-sm"
                                        htmlFor="description"
                                    >
                                        <IconFileText
                                            size={20}
                                            className="shrink-0"
                                        />{" "}
                                        Descripción (opcional)
                                    </label>
                                    <textarea
                                        className="resize-none p-2 border rounded-md"
                                        name="description"
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </>
                        )}
                        <div className="flex items-center gap-4 bg-blue-500/10 px-4 py-2 rounded-lg">
                            <Info size={40} className="text-blue-800" />{" "}
                            <p className="text-[14px] text-gray-700 font-medium">
                                Al guardar los cambios se actualizará el cálculo
                                de emisiones de esta actividad y los resultados
                                del periodo correspondiente.
                            </p>
                        </div>
                        <DialogFooter className={"mt-4"}>
                            <DialogClose asChild>
                                <button
                                    className="px-4 py-2 text-gray-900 bg-white  rounded-lg border cursor-pointer"
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </DialogClose>
                            <button
                                className="px-4 py-2 text-white bg-emerald-700 rounded-lg cursor-pointer"
                                type="submit"
                            >
                                Guardar cambios
                            </button>
                        </DialogFooter>
                    </form>
                )}

                {actionActivity.action === "delete" && (
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleDestroy}
                    >
                        <div className="p-4 flex gap-4 rounded-lg bg-green-500/10">
                            <div className="flex items-center justify-center p-2 rounded-full w-16 h-16 aspect-square bg-green-500/15 text-emerald-700">
                                <IconActivity size={45} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-[18px] text-gray-800">
                                    {actionActivity.activity.description
                                        ? actionActivity.activity.description
                                        : actionActivity.activity.name}
                                </p>
                                <p className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <Calendar size={15} />{" "}
                                    {activityDateFormateada}
                                </p>
                                <p className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <Ruler size={15} />{" "}
                                    {actionActivity.activity.quantity}{" "}
                                    {actionActivity.activity.measurement_unit}
                                </p>
                                <p className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <IconLeafFilled size={15} color="#00A63E" />{" "}
                                   <span> {actionActivity.activity.emissions}{" "}

                                        kg CO<sub>2</sub>e
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-red-500/10 px-4 py-2 rounded-lg">
                            <Info size={40} className="text-red-800" />{" "}
                            <p className="text-[14px] text-gray-700 font-medium">
                                Las emisiones correspondientes a esta actividad
                                se descontarán del total de tu huella de carbono
                                del período.
                            </p>
                        </div>
                        <DialogFooter className={"mt-4"}>
                            <DialogClose asChild>
                                <button
                                    className="px-4 py-2 text-gray-900 bg-white  rounded-lg border cursor-pointer"
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </DialogClose>
                            <button
                                className="px-4 py-2 text-white bg-red-700 rounded-lg cursor-pointer"
                                type="submit"
                            >
                                Eliminar actividad
                            </button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
