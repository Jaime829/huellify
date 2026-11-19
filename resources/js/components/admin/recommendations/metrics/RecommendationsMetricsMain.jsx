import { Link, router, usePage } from "@inertiajs/react";
import {
    IconBoltFilled,
    IconBulbFilled,
    IconCarFilled,
    IconChartBarPopular,
    IconChartPieFilled,
    IconCheckFilled,
    IconCircleCheckFilled,
    IconCircleFilled,
    IconStarFilled,
    IconUsersGroup,
} from "@tabler/icons-react";
import { ArrowLeft, Plus } from "lucide-react";
import { route } from "ziggy-js";
import AdminCardInfo from "../../AdminCardInfo";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const labels = {
    general: "General",
    transport: "Transporte",
    energy: "Energía",
};

const colors = {
    general: "#00523e",
    transport: "#1d8863",
    energy: "#b7efcf",
};

export default function RecommendationsMetricsMain() {
    const {
        totalRecommendations,
        totalAdoptions,
        totalUsuarios,
        recommendationsGraphic,
        categories,
        topRecommendations,
    } = usePage().props;
    console.log(topRecommendations);

    const chartData = Object.entries(recommendationsGraphic).map(
        ([key, val]) => ({
            name:
                `${labels[key]} (${val} ${val === 1 ? "adopcion" : "adopciones"}) ` ||
                `${key} (${val === 1 ? "adopcion" : "adopciones"}) `,
            value:
                totalAdoptions > 0
                    ? Number(((val / totalAdoptions) * 100).toFixed(1))
                    : 0,
            fill: colors[key] || "#27a66b", // <-- Color individual para cada barra
        }),
    );

    return (
        <div className="flex flex-col gap-4 px-4 pt-4 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">
                        Métricas de recomedaciones
                    </h1>
                    <p className="text-gray-700">
                        Analiza el uso y la adopción de las recomendaciones de
                        sostenibilidad por parte de los usuarios de Huellify.
                    </p>
                </div>
                <Link
                    href={route("admin.index")}
                    className="font-medium p-2 flex items-center gap-2 bg-white border border-emerald-600 text-[14px] w-fit h-fit rounded-lg transition-colors hover:bg-gray-100"
                >
                    <ArrowLeft color="#047857" />{" "}
                    <span>Volver al dashboard</span>
                </Link>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row lg:gap-2 gap-2">
                <AdminCardInfo
                    icon={IconBulbFilled}
                    title={"Total de recomendaciones"}
                    mainText={totalRecommendations}
                    description={
                        "Recomendaciones activas disponibles en Huellify."
                    }
                />
                <AdminCardInfo
                    icon={IconCircleCheckFilled}
                    title={"Total de adopciones"}
                    mainText={totalAdoptions}
                    description={"Recomendaciones marcadas como adoptadas."}
                />
                <AdminCardInfo
                    icon={IconUsersGroup}
                    title={"Usuarios que han adoptado recomendaciones"}
                    mainText={totalUsuarios}
                    description={
                        "Usuarios con al menos una recomendación adoptada."
                    }
                />
                <AdminCardInfo
                    icon={IconChartPieFilled}
                    title={"Porcentaje de adopción"}
                    mainText={`${Number(
                        (totalAdoptions / totalRecommendations) * 100,
                    ).toFixed(2)}%`}
                    description={
                        "Del total de recomendaciones han sido adoptadas."
                    }
                />
            </div>

            <div className="bg-white border p-4 rounded-lg h-80 w-full flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <p className="flex items-center gap-4 font-bold">
                        <IconChartBarPopular color="#00523e" stroke={2} />{" "}
                        <span>Adopcion por categoría</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                        {Object.entries(labels).map(([key, val]) => {
                            console.log(`${key}: ${val}`);
                            return (
                                <p
                                    className="flex items-center gap-2 text-[14px] font-medium"
                                    key={key}
                                >
                                    <IconCircleFilled
                                        size={15}
                                        color={colors[key]}
                                    />
                                    <span>{val}</span>
                                </p>
                            );
                        })}
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 8,
                            right: 8,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            stroke="#e8eef2"
                            vertical={false}
                            horizontal={true}
                        />

                        <XAxis
                            dataKey="name"
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                        />

                        <YAxis
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                            tickFormatter={(val) => `${val}%`}
                            tick={{ fill: "#64748b", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            width={40}
                        />

                        <Tooltip
                            cursor={{ fill: "#f1f5f9" }}
                            formatter={(valor) => [`${valor}%`, "Adopción"]}
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                fontSize: "12px",
                            }}
                        />

                        <Bar
                            dataKey="value"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={60}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-4 p-4 rounded-lg border bg-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <p className="flex items-center gap-4 font-bold">
                        <IconStarFilled color="#00523e" />{" "}
                        <span>Recomendaciones más adoptadas</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2">
                            <label className="text-[12px]" htmlFor="category">
                                Categoría:
                            </label>
                            <select
                                className="p-2 text-base sm:text-[14px] bg-white border rounded-lg"
                                name="category_id"
                                id="category"
                                onChange={(e) => {
                                    const params = new URLSearchParams(
                                        window.location.search,
                                    );

                                    if (e.target.value) {
                                        params.set(
                                            "category_id",
                                            e.target.value,
                                        );
                                    } else {
                                        params.delete("category_id");
                                    }

                                    router.get(
                                        window.location.pathname,
                                        Object.fromEntries(params.entries()),
                                        {
                                            preserveState: true,
                                            replace: true,
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                            >
                                <option value="all">Todas</option>
                                {categories.map((category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-[12px]" htmlFor="period">
                                Periodo:
                            </label>
                            <select
                                className="p-2 text-base sm:text-[14px] bg-white border rounded-lg"
                                name="period"
                                id="period"
                                onChange={(e) => {
                                    const params = new URLSearchParams(
                                        window.location.search,
                                    );

                                    if (e.target.value) {
                                        params.set("period", e.target.value);
                                    } else {
                                        params.delete("period");
                                    }

                                    router.get(
                                        window.location.pathname,
                                        Object.fromEntries(params.entries()),
                                        {
                                            preserveState: true,
                                            replace: true,
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                            >
                                <option value="all">Todos</option>
                                <option value="7d">Últimos 7 dias</option>
                                <option value="30d">Últimos 30 dias</option>
                                <option value="6m">Últimos 6 meses</option>
                                <option value="12m">Últimos 12 meses</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                    {topRecommendations.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow className={"font-semibold"}>
                                    <TableCell>#</TableCell>
                                    <TableCell>
                                        Nombre de la recomendacion
                                    </TableCell>
                                    <TableCell>Categoría</TableCell>
                                    <TableCell>
                                        Usuarios que la adoptaron
                                    </TableCell>
                                    <TableCell>
                                        Porcentaje de adopción
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topRecommendations.map(
                                    (recommendation, index) => {
                                        return (
                                            <TableRow key={recommendation.id}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell
                                                    className={
                                                        "flex items-center gap-2"
                                                    }
                                                >
                                                    <span
                                                        className="text-emerald-800"
                                                        dangerouslySetInnerHTML={{
                                                            __html: recommendation.icon,
                                                        }}
                                                    ></span>{" "}
                                                    {recommendation.title}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`${
                                                            recommendation.category_id
                                                                ? recommendation.category_id ===
                                                                  1
                                                                    ? "bg-emerald-500/10 text-emerald-800"
                                                                    : "bg-blue-500/10 text-blue-800"
                                                                : "bg-gray-200 text-gray-600"
                                                        } h-fit w-fit px-2 py-1 rounded-full flex items-center gap-2`}
                                                    >
                                                        {recommendation.category_id ? (
                                                            recommendation.category_id ===
                                                            1 ? (
                                                                <>
                                                                    <IconCarFilled />
                                                                    Transporte
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <IconBoltFilled />
                                                                    Energía
                                                                </>
                                                            )
                                                        ) : (
                                                            "General"
                                                        )}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        recommendation.total_adoptions
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {Number(
                                                        (recommendation.total_adoptions /
                                                            totalAdoptions) *
                                                            100,
                                                    ).toFixed(2)}
                                                    %
                                                </TableCell>
                                            </TableRow>
                                        );
                                    },
                                )}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="p-2 text-center">
                            No hay recomendaciones disponibles
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
