import React from "react";
import IconItemsDashboard from "../dashboard/IconItemsDashboard";

export default function HabitCard({ icon: Icon, title, value, text = null }) {
    return (
        <div className="bg-green-400/10 flex flex-1 gap-3 p-4 rounded-xl border">
            <div className="p-2 bg-emerald-600/10 w-15 h-15 flex items-center justify-center aspect-square rounded-full text-emerald-700">
                <Icon size={35} />
            </div>
            <div>
                <p className="font-semibold text-[14px]">{title}</p>
                <h3 className="font-bold text-4xl">{value}</h3>
                {text && (
                    <small className="text-gray-500 text-[14px]">{text}</small>
                )}
            </div>
        </div>
    );
}
