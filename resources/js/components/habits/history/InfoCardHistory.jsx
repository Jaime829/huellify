import React from "react";

export default function InfoCardHistory({
    icon: Icon,
    value,
    description,
    colorBg,
    colorIcon,
}) {
    return (
        <div className={`flex gap-4 flex-1 ${colorBg}  p-4 rounded-lg border`}>
            <Icon color={colorIcon} size={35} />
            <div className="flex flex-col">
                <p className="font-semibold text-gray-800 text-[22px]">
                    {value !== "Invalid Date" ? value : "Sin registros"}
                </p>
                <small className="text-gray-500 font-medium">
                    {description}
                </small>
            </div>
        </div>
    );
}
