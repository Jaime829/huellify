import ToastMessage from "../ToastMessage";
import ActivitiesHeader from "./ActivitiesHeader";
import ActivitiesMain from "./ActivitiesMain";
import LateralInformation from "./LateralInformation";

export default function ActivitiesContent() {
    return (
        <div className="flex p-4 gap-4">
            <ToastMessage />
            <div className="flex flex-col w-[80%]">
                <ActivitiesHeader />
                <ActivitiesMain />
            </div>
            <LateralInformation />
        </div>
    );
}
