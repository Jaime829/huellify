import ExploreHabitsContent from "./ExploreHabitsContent";
import ExploreHabitsHeader from "./ExploreHabitsHeader";

export default function ExploreHabitsMain() {
    return (
        <div className="pb-24 lg:pb-0 flex flex-col bg-green-100">
            <ExploreHabitsHeader />
            <ExploreHabitsContent />
        </div>
    );
}
