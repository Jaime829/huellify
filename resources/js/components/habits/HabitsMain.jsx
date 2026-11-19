import ToastMessage from "../ToastMessage";
import HabitsContent from "./HabitsContent";
import HabitsHeader from "./HabitsHeader";

export default function HabitsMain() {
    return (
        <div className="px-6 pt-6 pb-6 md:pb-24 xl:pb-6 flex flex-col gap-4">
            <ToastMessage />
            <HabitsHeader />
            <HabitsContent />
        </div>
    );
}
