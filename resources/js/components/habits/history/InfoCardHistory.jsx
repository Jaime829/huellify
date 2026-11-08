import React from "react";

export default function InfoCardHistory({ icon: Icon, value, description }) {
    return (
        <div className="flex gap-4 flex-1 bg-green-200/10  p-4 rounded-lg border">
            <Icon color="#008F3F" size={35} />
            <div className="flex flex-col">
                <p className="font-semibold text-gray-800 text-[22px]">
                    {value}
                </p>
                <small className="text-gray-500 font-medium">
                    {description}
                </small>
            </div>
        </div>
    );
}
