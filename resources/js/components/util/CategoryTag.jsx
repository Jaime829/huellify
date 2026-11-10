import React from "react";

export default function CategoryTag({ categoryId, categoryName, size }) {
    return (
        <span
            className={`${categoryId == 1 ? "text-emerald-800 bg-green-500/20" : "text-blue-800 bg-blue-500/20"} px-2 py-0.5 rounded-xl w-fit flex items-center justify-center text-[${size}px] font-semibold`}
        >
            {categoryName}
        </span>
    );
}
