import FormActivityLabel from "@/components/util/FormActivityLabel";
import HeadSeccionActivitiesForm from "./HeadSeccionActivitiesForm";
import { authUser } from "@/stores/user-store";
import { ArrowRight, Calendar, Zap } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import ToastMessage from "@/components/ToastMessage";
import ErrorsList from "./ErrorsList";

export default function FormularioEnergia() {
    const measurementUnits = authUser().energy.measurementUnits;
    const energySources = authUser().energy.energy_sources;

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = hoy.getMonth();

    const primerDia = new Date(anio, mes, 1).toISOString().split("T")[0];
    const ultimoDia = new Date(anio, mes + 1, 0).toISOString().split("T")[0];

    const fechaHoy = hoy.toISOString().split("T")[0];

    const { post, errors, processing, data, setData } = useForm({
        energy_source_id: 1,
        quantity: 0,
        measurement_unit_id: measurementUnits[0].id,
        activity_date: fechaHoy,
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("dashboard.activities.energy.store"));
    };
    return (
        <form className="py-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <HeadSeccionActivitiesForm
                number={2}
                title={"Detalles del consumo"}
            />
            <ToastMessage />
            <ErrorsList errors={errors} />
            <input
                type="hidden"
                name="_token"
                value={document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content")}
            />
            <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-1 w-1/3">
                    <FormActivityLabel
                        htmlFor="energy_source_id"
                        isRequired={true}
                    >
                        Fuente de energia
                    </FormActivityLabel>
                    <div className="flex gap-1 p-2 border text-gray-500 rounded-md">
                        <Zap />
                        <select
                            name="energy_source_id"
                            id="energy_source_id"
                            className="focus:outline-none w-full"
                            value={data.energy_source_id}
                            onChange={(e) => {
                                setData("energy_source_id", e.target.value);
                            }}
                        >
                            {energySources.map((source) => {
                                return (
                                    <option value={source.id} key={source.id}>
                                        {source.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-1/3">
                    <FormActivityLabel htmlFor="quantity" isRequired={true}>
                        Cantidad
                    </FormActivityLabel>
                    <div className="flex items-center p-2 border text-gray-500 rounded-md">
                        <input
                            type="number"
                            min={0}
                            value={data.quantity}
                            step={0.001}
                            name="quantity"
                            className="appearance-none focus:outline-none flex-1"
                            onChange={(e) => {
                                setData("quantity", e.target.value);
                            }}
                        />
                        <select
                            name="measurement_unit_id"
                            id="measurement_unit_id"
                            className="pl-2 focus:outline-none border-l"
                            value={data.measurement_unit_id}
                            onChange={(e) => {
                                setData("measurement_unit_id", e.target.value);
                            }}
                        >
                            {measurementUnits.map((unit) => {
                                return (
                                    <option value={unit.id} key={unit.id}>
                                        {unit.symbol}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-1/3">
                    <FormActivityLabel
                        htmlFor="activity_date"
                        isRequired={true}
                    >
                        Fecha de registro
                    </FormActivityLabel>
                    <div className="flex flex-col">
                        <div
                            // className="flex items-center gap-2 border p-2 rounded-md text-gray-500"
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

            <div className="flex flex-col gap-1 pb-2 border-b">
                <FormActivityLabel htmlFor="description">
                    Descripcion (opcional)
                </FormActivityLabel>
                <textarea
                    name="description"
                    id="description"
                    className="rounded-md border resize-none p-2 h-20 focus:outline-none text-gray-600"
                    placeholder="Ejemplo: consumo del aire acondicionado durante el dia."
                    value={data.description}
                    onChange={(e) => {
                        setData("description", e.target.value);
                    }}
                ></textarea>
            </div>

            <div className="flex items-center justify-between">
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
