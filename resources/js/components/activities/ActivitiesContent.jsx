import ActivitiesHeader from "./ActivitiesHeader";
import ActivitiesMain from "./ActivitiesMain";

export default function ActivitiesContent() {
    return (
        <div className="flex p-4">
            <div className="flex flex-col flex-1">
                <ActivitiesHeader />
                <ActivitiesMain />
            </div>
            <div className="flex flex-col"></div>
        </div>
    );
}
