import IconItemsDashboard from "./IconItemsDashboard";
import { ProgressBar } from "./ProgressBar";

export default function CardInfo({
    icon: Icon,
    bgIcon,
    colorIcon,
    colorBar,
    sectionName,
    value,
    isPrincipal = false,
}) {
    return (
        <div className="shadow p-4 rounded-md flex flex-col justify-between gap-1 h-40 max-h-48 bg-white">
            <IconItemsDashboard icon={Icon} colorIcon={colorIcon} bg={bgIcon} />
            <div className="flex flex-col gap-1">
                <p
                    className={`${isPrincipal ? "font-semibold" : "font-medium"}`}
                >
                    {sectionName}
                </p>
                <p className={`font-bold ${isPrincipal ? "text-xl" : ""}`}>
                    {value}{" "}
                    <span
                        className={`${isPrincipal ? "text-[16px]" : "font-medium text-gray-600 text-sm"}`}
                    >
                        Kg CO<sub>2</sub>E
                    </span>
                </p>

                {!isPrincipal ? (
                    <ProgressBar porcentaje={value} color={colorBar} />
                ) : (
                    <p className="text-[10px]"> 12% menos que el mes anterior</p>
                )}
            </div>
        </div>
    );
}
