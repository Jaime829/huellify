import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { authUser } from "@/stores/user-store";

Chart.register(ArcElement, Tooltip, Legend);

const activityColors = {
    Transporte: "bg-emerald-600",
    Energía: "bg-blue-400",
};

export default function TortaPeriod({ emissions_per_categories, size = 20 }) {
    const datos = emissions_per_categories
        ? {
              labels: Object.keys(emissions_per_categories),
              datasets: [
                  {
                      label: "Total emisiones",
                      data: Object.values(emissions_per_categories),
                      backgroundColor: [
                          "rgba(64, 168, 109, 1)", // Verde
                          "rgba(96, 165, 250, 1)", // Azul
                          "rgba(192, 132, 252, 1)", // morado
                          "rgba(75, 85, 99, 1)", // gris
                      ],
                      borderColor: ["#166534", "#1e40af", "#6b21a8", "#1f2937"],
                      borderWidth: 1,
                  },
              ],
          }
        : {};

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
        <div className={`flex flex-col`}>
            {emissions_per_categories ? (
                <>
                    <div className={`flex items-center `}>
                        <div
                            className={` my-0 mx-auto w-${size * 2} h-${size}`}
                        >
                            <Doughnut data={datos} options={opciones} />
                        </div>
                        <div className="w-[50%] flex flex-col">
                            {Object.entries(emissions_per_categories).map(
                                ([key, value]) => {
                                    return (
                                        <div
                                            key={key}
                                            className={`flex gap-1 py-2`}
                                        >
                                            <div className="flex gap-2">
                                                <div
                                                    className={`w-4 h-4 rounded-full ${activityColors[key]}`}
                                                ></div>
                                                <p className="text-gray-500 text-[10px]">
                                                    {key}
                                                </p>
                                            </div>

                                            <p className="text-gray-700 text-[10px] font-bold">
                                                {Number(value || 0).toFixed(2)}{" "}
                                                kg CO<sub>2</sub>e
                                            </p>
                                        </div>
                                    );
                                },
                            )}
                        </div>
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
