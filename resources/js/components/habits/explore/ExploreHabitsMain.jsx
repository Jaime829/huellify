import ToastMessage from "@/components/ToastMessage";
import ExploreHabitsContent from "./ExploreHabitsContent";
import ExploreHabitsHeader from "./ExploreHabitsHeader";

export default function ExploreHabitsMain() {
    return (
        <div className="pb-6 lg:pb-0 flex flex-col bg-green-100">
            <ToastMessage />
            <ExploreHabitsHeader />
            <ExploreHabitsContent />
        </div>
    );
}
