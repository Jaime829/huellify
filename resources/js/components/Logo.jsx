import React from "react";

export default function Logo({ isHidden = false }) {
    let styleFather = "w-30 h-12 sm:w-44 sm:h-[4.4rem] md:w-50 md:h-20 ";

    isHidden
        ? (styleFather = styleFather + "md:hidden")
        : (styleFather = styleFather);


    return (
        <div className={styleFather}>
            <img
                className="w-full h-full object-cover"
                src="/images/logo.webp"
                alt="Logo Huellify"
            />
        </div>
    );
}
