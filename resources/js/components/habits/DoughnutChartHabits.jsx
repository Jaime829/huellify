import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChartHabits({ value, total, colorRGBA }) {
    const porcentajeActual = Math.round((value / total) * 100);
    const porcentajeRestante = 100 - porcentajeActual;

    const data = {
        labels: [
            `Progreso (${porcentajeActual}%)`,
            `Restante (${porcentajeRestante}%)`,
        ],
        datasets: [
            {
                data: [porcentajeActual, porcentajeRestante],
                backgroundColor: [
                    colorRGBA, // Color para el valor a destacar (Verde/Azul)
                    "rgba(201, 203, 207, 0.4)", // Color gris neutro para el fondo/resto
                ],
                borderColor: [colorRGBA, "rgba(201, 203, 207, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },

        // Controla el tamaño del agujero central (grosor de la dona)
        cutout: "70%",
    };

    return (
        <div className="w-16 relative">
            <Doughnut className="z-5" data={data} options={options} />
            <p className="absolute -z-1 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-emerald-800 font-bold text-[18px]">
                {porcentajeActual}%
            </p>
        </div>
    );
}
