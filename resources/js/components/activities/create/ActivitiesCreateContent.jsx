import ActivitiesCreateHeader from "./ActivitiesCreateHeader";
import ActivitiesCreateMain from "./ActivitiesCreateMain";
import DatoCurioso from "./DatoCurioso";

export default function ActivitiesCreateContent() {
    return (
        <div className="flex p-6 gap-4 justify-center">
            <div className="flex flex-col gap-4 w-full">
                <ActivitiesCreateHeader />
                <ActivitiesCreateMain />
            </div>
        </div>
    );
}
