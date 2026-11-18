import { useEffect, useState } from "react";
import ToastMessage from "../ToastMessage";
import ActivitiesHeader from "./ActivitiesHeader";
import ActivitiesMain from "./ActivitiesMain";
import LateralInformation from "./LateralInformation";

export default function ActivitiesContent() {
    const [isLg, setIsLg] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(min-width: 1024px)").matches
            : false,
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const handleChange = (e) => {
            setIsLg(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);
    return (
        <div className="flex-col flex lg:flex-row lg:gap-4 p-6  pb-6 lg:pb-4 w-full">
            <ToastMessage />
            <div className="flex flex-col w-full min-w-0 lg:w-[80%]">
                <ActivitiesHeader />
                <ActivitiesMain lateralController={isLg} />
            </div>
            {isLg && <LateralInformation />}
        </div>
    );
}
