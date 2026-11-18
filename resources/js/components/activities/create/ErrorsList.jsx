import React from "react";

export default function ErrorsList({ errors }) {
    const listadoErrores = Object.values(errors || {});

    return (
        listadoErrores.length > 0 && (
            <div className="fixed top-20 left-2 right-2 sm:left-auto sm:right-8 z-[1000]">
                <ul className="flex flex-col gap-2">
                    {listadoErrores.map((error, index) => (
                        <li
                            key={index}
                            className="flex items-center animate-wobble text-white gap-1 h-auto text-xs max-w-full sm:max-w-46 bg-red-500/70 p-2 rounded-xl"
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                    <path d="M12 8v4" />
                                    <path d="M12 16h.01" />
                                </svg>
                            </span>
                            {error}
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
}
