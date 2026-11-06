import ToastMessage from "../ToastMessage";
import HabitsContent from "./HabitsContent";
import HabitsHeader from "./HabitsHeader";

export default function HabitsMain() {
    return (
        <div className="p-4 pb-24 flex flex-col gap-4">
            <ToastMessage />
            <HabitsHeader />
            <HabitsContent />
        </div>
    );
}
