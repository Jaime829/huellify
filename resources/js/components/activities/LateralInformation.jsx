import MostFrequentActivity from "./MostFrequentActivity";
import ResumenPeriodoActivities from "./ResumenPeriodoActivities";

export default function LateralInformation() {
    return (
        <div className="flex flex-col gap-4 w-full lg:w-[20%]">
            <ResumenPeriodoActivities />

            <MostFrequentActivity />
        </div>
    );
}
