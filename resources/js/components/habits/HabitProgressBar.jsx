export default function HabitProgressBar({
    color,
    value,
    total,
    measurementUnit = null,
}) {
    const percentage = Number((value / total) * 100).toFixed();
    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-700">Progreso</p>
                <p className="font-semibold text-gray-900">
                    {value}/{total}{" "}
                    {measurementUnit ? measurementUnit : "veces"}
                </p>
            </div>
            <div className="w-full h-4 bg-gray-300 rounded-xl overflow-hidden">
                <div
                    className={`${color} h-full rounded-xl transition-all delay-100 ease-out`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}
