import IconItemsDashboard from "./IconItemsDashboard";
import { ProgressBar } from "./ProgressBar";

export default function CardInfo({
    icon: Icon,
    bgIcon,
    colorIcon,
    colorBar,
    sectionName,
    value,
    percentage,
    isPrincipal = false,
}) {
    return (
        <div className="shadow p-4 rounded-md flex flex-col gap-2 h-full lg:h-40 max-h-48 bg-white">
            <IconItemsDashboard icon={Icon} colorIcon={colorIcon} bg={bgIcon} />
            <div className="flex flex-col gap-1">
                <p
                    className={`${isPrincipal ? "font-semibold" : "font-medium"}`}
                >
                    {sectionName}
                </p>
                <p className={`font-bold ${isPrincipal ? "text-xl" : ""}`}>
                    {Number(value).toFixed(!isPrincipal ? 2 : 0)}{" "}
                    {!isPrincipal && (
                        <span
                            className={`${isPrincipal ? "text-[16px]" : "font-medium text-gray-600 text-sm"}`}
                        >
                            Kg CO<sub>2</sub>E
                        </span>
                    )}
                </p>

                {!isPrincipal && (
                    <ProgressBar porcentaje={percentage} color={colorBar} />
                )}
            </div>
        </div>
    );
}
