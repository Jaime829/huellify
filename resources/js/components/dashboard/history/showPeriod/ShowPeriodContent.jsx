import { Link, usePage } from "@inertiajs/react";
import {
    IconBoltFilled,
    IconCarFilled,
    IconChartBarPopular,
    IconScale,
} from "@tabler/icons-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TortaPeriod from "../TortaPeriod";
import { Car, List } from "lucide-react";

export default function ShowPeriodContent() {
    const { period, activities, emissions_per_categories, equivalenceFactors } =
        usePage().props;
    return (
        <div className="flex flex-col gap-4">
            <div className="border bg-green-500/10 flex flex-col sm:flex-row gap-4 rounded-lg items-center p-4">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-green-600/15 aspect-square flex items-end justify-center">
                    <img
                        className="max-w-[90%]"
                        src="/images/assets/asset-foot-leafs.webp"
                        alt=""
                    />
                </div>
                <div>
                    <p className="font-semibold">Huella de carbono total</p>
                    <p className="font-bold text-emerald-900 text-3xl sm:text-4xl">
                        {Number(
                            period.carbon_footprint.total_emissions,
                        ).toFixed(2)}
                        kg CO<sub>2</sub>e
                    </p>
                    <small className="text-gray-500 font-medium">
                        Emisiones generadas durante este período
                    </small>
                </div>
            </div>

            <div className="flex flex-col gap-2 h-fit">
                <div className="flex flex-col">
                    <p className="flex items-center text-[18px] gap-2 font-semibold text-emerald-800">
                        <IconScale size={30} />
                        <span className="text-gray-800">
                            ¿Qué representan tus emisiones?
                        </span>
                    </p>
                    <p className="text-[14px] text-gray-600">
                        Conoce el impacto de tu huella de carbono a través de
                        algunas equivalencias ambientales.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 h-fit">
                    {equivalenceFactors.map((equivalence) => {
                        const totalEquivalence = Number(
                            period.carbon_footprint.total_emissions /
                                equivalence.kg_co2e_per_unit,
                        ).toFixed(3);
                        return (
                            <div
                                key={equivalence.id}
                                className="flex gap-4 p-4 bg-white rounded-xl border flex-1 h-full"
                            >
                                <div className="bg-green-500/10 text-emerald-700 h-20 w-20 flex items-center justify-center rounded-full">
                                    <img
                                        src={`/images/equivalenceFactorsIcons/${equivalence.icon}`}
                                        alt={`${equivalence.name} Icon`}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">
                                        {equivalence.name}
                                    </p>
                                    <p className="text-emerald-700 font-bold text-[20px]">
                                        {totalEquivalence}{" "}
                                        {equivalence.unit_label}
                                    </p>
                                    <small className="text-gray-600">
                                        {equivalence.description}
                                    </small>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col p-4 border rounded-lg bg-white ">
                <p className="flex items-center gap-2 font-semibold text-emerald-800">
                    <IconChartBarPopular />{" "}
                    <span className="text-gray-800">
                        Emisiones por categoría
                    </span>
                </p>
                <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-center">
                    <div className="flex-1 flex items-center h-full border-b lg:border-b-0 lg:border-r pb-4 lg:pb-0">
                        <TortaPeriod
                            size={32}
                            emissions_per_categories={emissions_per_categories}
                        />
                    </div>
                    <div className="bg-green-500/10 p-4 flex flex-col flex-1 gap-2 rounded-lg">
                        <div className="flex gap-2 items-center">
                            <div className="w-16 h-16 aspect-square flex justify-center items-center rounded-full bg-green-500/10 text-emerald-600">
                                <IconCarFilled size={50} />
                            </div>
                            <div>
                                <small className="font-medium text-emerald-950">
                                    Transporte
                                </small>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {emissions_per_categories.Transporte} kg CO
                                    <sub>2</sub>e
                                </p>
                                <small className="font-medium text-gray-600">
                                    {" "}
                                    {Number(
                                        (emissions_per_categories.Transporte /
                                            period.carbon_footprint
                                                .total_emissions) *
                                            100,
                                    ).toFixed(2)}
                                    % de tus emisiones
                                </small>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="w-16 h-16 aspect-square flex justify-center items-center rounded-full bg-blue-500/10 text-blue-600">
                                <IconBoltFilled size={50} />
                            </div>
                            <div>
                                <small className="font-medium text-blue-950">
                                    Energía
                                </small>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {emissions_per_categories.Energía} kg CO
                                    <sub>2</sub>e
                                </p>
                                <small className="font-medium text-gray-600">
                                    {Number(
                                        (emissions_per_categories.Energía /
                                            period.carbon_footprint
                                                .total_emissions) *
                                            100,
                                    ).toFixed(2)}
                                    % de tus emisiones
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-4 gap-2 bg-white rounded-lg border">
                <div className="flex items-center gap-2">
                    <List />
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-800">
                            Actividades registradas
                        </p>
                        <small className="text-gray-600">
                            Consulta las actividades que contribuyeron a tu
                            huella de carbono durante este período.
                        </small>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow
                            className={"text-gray-800 font-medium bg-gray-100 "}
                        >
                            <TableCell>Nombre</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Emisiones</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.data.length > 0 ? (
                            activities.data.map((activity) => {
                                const fechaFormateada = new Date(
                                    activity.activity_date.replaceAll("-", "/"),
                                ).toLocaleDateString("es-CO", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                });

                                return (
                                    <TableRow key={activity.id}>
                                        <TableCell
                                            className={
                                                "text-gray-600 font-medium"
                                            }
                                        >
                                            {activity.name}
                                        </TableCell>
                                        <TableCell className={"font-bold"}>
                                            {fechaFormateada}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`${activity.activity_category_id === 1 ? "text-green-800 bg-green-500/20" : "text-blue-800 bg-blue-500/20"} py-1 px-2 rounded-xl w-fit font-semibold  flex items-center `}
                                            >
                                                {activity.category.name}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {Number(activity.quantity).toFixed(
                                                2,
                                            )}
                                            {activity.measurement_unit.symbol}
                                        </TableCell>
                                        <TableCell>
                                            {Number(
                                                activity.carbon_footprint_item
                                                    .emissions,
                                            ).toFixed(3)}
                                            kg CO<sub>2</sub>e
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <p>Aun no tienes actividades registradas</p>
                        )}
                    </TableBody>
                </Table>
                <div className="flex flex-wrap items-center gap-2 justify-end">
                    {activities.links.map((link, index) => {
                        if (!link.url) {
                            return (
                                <span
                                    key={index}
                                    className="min-h-11 sm:min-h-0 inline-flex items-center px-3 py-1 rounded text-gray-400 bg-gray-50 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={link.url}
                                className={`min-h-11 sm:min-h-0 inline-flex items-center px-3 py-1 border rounded transition-colors shadow ${
                                    link.active
                                        ? "bg-emerald-800 text-white border-emerald-800 font-medium"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
