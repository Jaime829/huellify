import ToastMessage from "@/components/ToastMessage";
import React from "react";
import UserHabitHistoryContent from "./UserHabitHistoryContent";

export default function UserHabitHistoryMain() {
    return (
        <div className="p-4 pb-24 flex flex-col gap-4">
            <ToastMessage />
            <UserHabitHistoryContent />
        </div>
    );
}
