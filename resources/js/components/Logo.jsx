import React from "react";

export default function Logo({ isHidden = false }) {
    let styleFather = "w-50 h-20 ";

    isHidden
        ? (styleFather = styleFather + "md:hidden")
        : (styleFather = styleFather);


    return (
        <div className={styleFather}>
            <img
                className="w-full h-full object-cover"
                src="/images/logo.png"
                alt="Logo Huellify"
            />
        </div>
    );
}
