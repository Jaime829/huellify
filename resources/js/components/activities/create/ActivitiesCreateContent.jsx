import ActivitiesCreateHeader from "./ActivitiesCreateHeader";
import ActivitiesCreateMain from "./ActivitiesCreateMain";

export default function ActivitiesCreateContent() {
    return (
        <div className="flex p-4 gap-4">
            <div className="flex flex-col gap-2 w-[80%]">
                <ActivitiesCreateHeader />
                <ActivitiesCreateMain />
            </div>
            <div className="flex flex-col w-[20%]"></div>
        </div>
    );
}
