import React from "react";

export default function FormActivityLabel({
    children,
    htmlFor = "",
    className = null,
    isRequired = false,
}) {
    return (
        <label
            htmlFor={htmlFor}
            className={`${className ? className : "text-gray-500 font-medium"} w-fit `}
        >
            {children} {isRequired && <span className="text-red-500">*</span>}
        </label>
    );
}
