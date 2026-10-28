import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { authUser } from "@/stores/user-store";

Chart.register(ArcElement, Tooltip, Legend);

const activityColors = {
    transport: "bg-green-600",
    energy: "bg-blue-400",
    food: "bg-purple-400",
    waste: "bg-gray-600",
};

export default function CardTorta({ wrap = false }) {
    const footPrint = authUser().last_footprint?.total_emissions ?? 0;
    const emissions_per_categories = authUser()?.emissions_per_categories;

    const datos = emissions_per_categories
        ? {
              labels: Object.keys(emissions_per_categories),
              datasets: [
                  {
                      label: "Total emisiones",
                      data: Object.values(emissions_per_categories),
                      backgroundColor: [
                          "rgba(22, 163, 74, 1)", // Verde
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
        <div
            className={` ${wrap ? "flex-row" : "h-full shadow col-span-2 p-4 gap-4 rounded-md bg-white"}  flex flex-col`}
        >
            {!wrap && <p className="font-bold">Emisiones por categoria</p>}

            {emissions_per_categories ? (
                <>
                    <div
                        className={`flex items-center  ${wrap ? "w-full justify-between lg:flex-wrap  gap-2" : ""}`}
                    >
                        <div
                            className={`${wrap ? "w-32 h-32" : "w-56 h-56"} my-0 mx-auto relative`}
                        >
                            <Doughnut data={datos} options={opciones} />
                            <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center justify-center">
                                <p className="text-[10px] font-bold">
                                    {Number(footPrint).toFixed(2) || 0}
                                </p>
                                <span className="text-[8px] text-gray-500">
                                    kg CO<sub>2</sub>E
                                </span>
                            </div>
                        </div>
                        <div className="w-[50%] flex flex-col">
                            {Object.entries(emissions_per_categories).map(
                                ([key, value]) => {
                                    return (
                                        <div
                                            key={key}
                                            className={`flex ${wrap ? "gap-2" : "justify-between border-b border-gray-400"}   py-2`}
                                        >
                                            <div className="flex gap-2">
                                                <div
                                                    className={`w-4 h-4 rounded-full ${activityColors[key]}`}
                                                ></div>
                                                <p className="text-gray-500 text-[10px]">
                                                    {key}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="text-gray-700 text-[10px] font-bold">
                                                    {(
                                                        (value / footPrint) *
                                                            100 || 0
                                                    ).toFixed()}
                                                    %
                                                </p>
                                            </div>
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
