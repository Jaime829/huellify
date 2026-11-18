import ToastMessage from "@/components/ToastMessage";
import React from "react";
import UserHabitHistoryContent from "./UserHabitHistoryContent";

export default function UserHabitHistoryMain() {
    return (
        <div className="px-6 pt-6 pb-24 xl:pb-6 flex flex-col gap-4">
            <ToastMessage />
            <UserHabitHistoryContent />
        </div>
    );
}
