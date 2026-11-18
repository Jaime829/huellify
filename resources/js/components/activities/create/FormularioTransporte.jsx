import { ArrowRight, Calendar, Car, Fuel, MapPin } from "lucide-react";
import HeadSeccionActivitiesForm from "./HeadSeccionActivitiesForm";
import { authUser } from "@/stores/user-store";
import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import ErrorsList from "./ErrorsList";
import ToastMessage from "@/components/ToastMessage";
import FormActivityLabel from "@/components/util/FormActivityLabel";

export default function FormularioTransporte() {
    const transportTypes = authUser().transport.types;
    const fuelTypes = authUser().transport.fuelTypes;
    const measurementUnits = authUser().transport.measurementUnits;

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = hoy.getMonth();

    const primerDia = new Date(anio, mes, 1).toISOString().split("T")[0];
    const ultimoDia = new Date(anio, mes + 1, 0).toISOString().split("T")[0];

    const fechaHoy = hoy.toISOString().split("T")[0];

    const { post, data, setData, errors, processing } = useForm({
        transport_type_id: 1,
        fuel_type_id: 1,
        quantity: 0,
        measurement_unit_id: 1,
        activity_date: fechaHoy,
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("dashboard.activities.transport.store"));
    };
    return (
        <form onSubmit={handleSubmit} className="py-4 flex flex-col gap-4">
            <ToastMessage />
            <ErrorsList errors={errors} />
            <HeadSeccionActivitiesForm
                number={2}
                title={"Detalles de la actividad"}
                description={
                    "Ingresa la información especifica según el tipo de actividad."
                }
            />
            <input
                type="hidden"
                name="_token"
                value={document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content")}
            />

            <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2 flex flex-col gap-1">
                    <FormActivityLabel htmlFor="transport">
                        Medio de transporte
                    </FormActivityLabel>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 border p-2 rounded-md text-gray-500">
                            <Car />
                            <select
                                className="flex-1 focus:outline-none"
                                name="transport_type_id"
                                id="transport_type_id"
                                value={data.transport_type_id}
                                onChange={(e) =>
                                    setData("transport_type_id", e.target.value)
                                }
                            >
                                {transportTypes.map((type) => {
                                    return (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        {errors.transport_type_id && (
                            <p className="text-red-500 text-[12px]">
                                {errors.transport_type_id}
                            </p>
                        )}
                    </div>
                </div>
                {data.transport_type_id == 5 || data.transport_type_id == 6 ? (
                    <input type="hidden" name="fuel_type_id" value={6} />
                ) : (
                    <div className="w-full sm:w-1/2 flex flex-col gap-1">
                        <FormActivityLabel htmlFor="fuel_type">
                            Tipo de combustible
                        </FormActivityLabel>
                        <div className="flex flex-col">
                            <div
                                className={`${errors.fuel_type_id ? "border-red-500" : ""} flex items-center gap-2 border p-2 rounded-md text-gray-500`}
                            >
                                <Fuel />
                                <select
                                    className="flex-1 focus:outline-none"
                                    value={data.fuel_type_id}
                                    onChange={(e) =>
                                        setData("fuel_type_id", e.target.value)
                                    }
                                    name="fuel_type_id"
                                    id="fuel_type_id"
                                >
                                    {fuelTypes.map((type) => {
                                        if (type.name === "None") return null; // Si es Mixta, no renderiza nada
                                        return (
                                            <option
                                                key={type.id}
                                                value={type.id}
                                            >
                                                {type.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            {errors.fuel_type_id && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.fuel_type_id}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4 ">
                <div className="w-full sm:w-1/2 flex flex-col gap-1">
                    <FormActivityLabel htmlFor="quantity">
                        Distancia recorrida
                    </FormActivityLabel>

                    <div className="flex flex-col">
                        <div
                            className={`${errors.quantity || errors.measurement_unit_id ? "border-red-500" : ""} flex items-center gap-2 border p-2 rounded-md text-gray-500`}
                        >
                            <div className="flex flex-1 gap-2 items-center">
                                <MapPin />
                                <input
                                    className="focus:outline-none flex-1"
                                    type="number"
                                    step={0.001}
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                    min={0}
                                    name="quantity"
                                    id="quantity"
                                />
                            </div>
                            <select
                                className="border-l h-full pl-2 focus:outline-none"
                                value={data.measurement_unit_id}
                                onChange={(e) =>
                                    setData(
                                        "measurement_unit_id",
                                        e.target.value,
                                    )
                                }
                                name="measurement_unit_id"
                                id="measurement_unit_id"
                            >
                                {measurementUnits.map((unit) => {
                                    return (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.symbol}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        {errors.quantity && (
                            <p className="text-red-500 text-[12px]">
                                {errors.quantity}
                            </p>
                        )}
                        {errors.measurement_unit_id && (
                            <p className="text-red-500 text-[12px]">
                                {errors.measurement_unit_id}
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col gap-1 ">
                    <FormActivityLabel htmlFor="activity_date">
                        Fecha de la actividad
                    </FormActivityLabel>
                    <div className="flex flex-col">
                        <div
                            className={`${errors.activity_date ? "border-red-500" : ""} flex items-center gap-2 border p-2 rounded-md text-gray-500`}
                        >
                            <Calendar />
                            <input
                                className="flex-1 focus:outline-none"
                                value={data.activity_date}
                                min={primerDia}
                                max={ultimoDia}
                                onChange={(e) => {
                                    setData("activity_date", e.target.value);
                                }}
                                type="date"
                                name="activity_date"
                                id="activity_date"
                            />
                        </div>
                        {errors.activity_date && (
                            <p className="text-red-500 text-[12px]">
                                {errors.activity_date}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 pb-6 border-b border-gray-200">
                <HeadSeccionActivitiesForm
                    number={3}
                    title={"Información adicional"}
                    description={
                        "Si es necesario, puedes agregar más detalles."
                    }
                />
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <FormActivityLabel htmlFor="description">
                            Descripcion (opcional)
                        </FormActivityLabel>
                        <textarea
                            className={` ${errors.description ? "border-red-500" : ""} resize-none h-20 border-2 border-gray-300 rounded-md focus:outline-none p-1 text-gray-600`}
                            name="description"
                            id="description"
                            placeholder="Ejemplo: viaje de ida y vuelta al trabajo, uso de transporte público, etc."
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        {errors.description && (
                            <p className="text-red-500 text-[12px]">
                                {errors.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center justify-between">
                <Link
                    href={route("dashboard.activities.index")}
                    className="py-2 px-4 border border-emerald-600 rounded-md text-[14px] text-gray-600 font-medium"
                >
                    Cancelar
                </Link>
                <button
                    type="submit"
                    className="flex items-center justify-center gap-1 bg-emerald-600 text-[14px] text-white font-medium py-2 px-4 cursor-pointer rounded-md"
                    disabled={processing}
                >
                    {processing
                        ? "Calculando..."
                        : "Calcular huella de carbono"}
                    <ArrowRight size={15} />
                </button>
            </div>
        </form>
    );
}
