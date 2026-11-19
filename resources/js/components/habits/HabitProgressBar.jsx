import { Trophy } from "lucide-react";

export default function HabitProgressBar({
    color,
    value,
    total,
    measurementUnit = null,
}) {
    const percentage = Number((value / total) * 100).toFixed();
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-700">Progreso</p>
                <p className="font-semibold text-gray-900">
                    {value}/{total}{" "}
                    {measurementUnit ? measurementUnit : "veces"}
                </p>
            </div>
            <div className="w-full h-4 bg-gray-300 rounded-xl overflow-hidden">
                <div
                    className={`bg-${color} h-full rounded-xl transition-all delay-100 ease-out`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            {value >= total && (
                <p
                    className={`flex items-center gap-1 w-fit text-[12px] text-${color}`}
                >
                    <Trophy size={15} /> ¡Has alcanzado tu objetivo de esta
                    semana!
                </p>
            )}
        </div>
    );
}
