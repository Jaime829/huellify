import { authUser } from "@/stores/user-store";
import { useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

// const datosPorPeriodo = {
//     3: [
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//     ],
//     6: [
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//     ],

//     12: [
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//         { mes: "Septiembre", emisiones: 300 },
//     ],
// };

export default function GraficoEmisiones({ size = 56 }) {
    const [periodo, setPeriodo] = useState(3);
    const datos = authUser().periodsGraphic[periodo];

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm col-span-3 lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-slate-800">
                    Evolución de tus emisiones
                </h2>

                <div className="flex overflow-hidden rounded-lg border border-slate-200">
                    {[3, 6, 12].map((meses) => (
                        <button
                            key={meses}
                            type="button"
                            onClick={() => setPeriodo(meses)}
                            className={`border-r border-slate-200 px-3 py-1.5 text-xs font-medium transition-colors last:border-r-0 ${
                                periodo === meses
                                    ? "bg-emerald-50 text-emerald-800"
                                    : "bg-white text-slate-500 hover:bg-slate-50"
                            }`}
                        >
                            {meses} meses
                        </button>
                    ))}
                </div>
            </div>

            {datos.length > 0 ? (
                <>
                    <div className={`h-${size} w-full`}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={datos}
                                margin={{
                                    top: 8,
                                    right: 8,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorEmisiones"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#27a66b"
                                            stopOpacity={0.18}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#27a66b"
                                            stopOpacity={0.02}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    stroke="#e8eef2"
                                    vertical={true}
                                    horizontal={true}
                                />

                                <XAxis
                                    dataKey="mes"
                                    tick={{ fill: "#64748b", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={10}
                                />

                                <YAxis
                                    domain={[0, 300]}
                                    ticks={[0, 50, 100, 150, 200, 250, 300]}
                                    tick={{ fill: "#64748b", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={35}
                                />

                                <Tooltip
                                    formatter={(valor) => [
                                        `${valor} kg CO₂e`,
                                        "Emisiones",
                                    ]}
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "1px solid #e2e8f0",
                                        fontSize: "12px",
                                    }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="emisiones"
                                    stroke="#27a66b"
                                    strokeWidth={2.5}
                                    fill="url(#colorEmisiones)"
                                    dot={{
                                        r: 4,
                                        fill: "#27a66b",
                                        stroke: "#27a66b",
                                    }}
                                    activeDot={{ r: 6 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </>
            ) : (
                <p className="flex justify-center items-center w-full h-full font-bold text-emerald-800">
                    Aun no tienes registros
                </p>
            )}
        </div>
    );
}
