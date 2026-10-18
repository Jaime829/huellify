import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function CardTorta({ wrap = false }) {
    const datos = {
        labels: ["1", "2", "3"],
        datasets: [
            {
                label: "Inventario disponible",
                data: [1, 2, 3],
                backgroundColor: [
                    "rgba(59, 130, 246, 0.7)", // Azul
                    "rgba(16, 185, 129, 0.7)", // Verde
                    "rgba(245, 158, 11, 0.7)", // Amarillo/Naranja
                ],
                borderColor: ["#3b82f6", "#10b981", "#f59e0b"],
                borderWidth: 1,
            },
        ],
    };

    const opciones = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        cutout: "70%", //controla el grosor del anillo cambiando el radio interno
    };

    return (
        <div
            className={` ${wrap ? "" : "h-full shadow col-span-2 p-4 gap-4 rounded-md bg-white"}  flex flex-col`}
        >
            {!wrap && <p className="font-bold">Emisiones por categoria</p>}

            <div
                className={`flex items-center ${wrap ? "flex-wrap gap-2" : ""}`}
            >
                <div
                    className={`${wrap ? "w-32 h-32" : "w-56 h-56"} my-0 mx-auto relative`}
                >
                    <Doughnut data={datos} options={opciones} />
                    <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold">Valor total</p>
                        <span className="text-[8px] text-gray-500">
                            kg CO<sub>2</sub>E
                        </span>
                    </div>
                </div>
                <div className="w-[50%]">
                    <div
                        className={`flex ${wrap ? "gap-2" : "justify-evenly border-b border-gray-400"}   py-2`}
                    >
                        <div className="flex gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                            <p className="text-gray-500 text-[10px]">
                                Transporte
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-gray-700 text-[10px] font-bold">
                                61%
                            </p>
                            <p className="text-gray-400 text-[10px]">150.3kg</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
