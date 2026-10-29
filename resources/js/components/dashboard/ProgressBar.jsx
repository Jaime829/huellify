export function ProgressBar({ porcentaje, color }) {
    return (
        <div className="font-sans">
            <div className="text-gray-500/80 text-xs mb-1">
                {Number(porcentaje || 0).toFixed()}% del total
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: `${porcentaje || 0}%` }}
                />
            </div>
        </div>
    );
}
