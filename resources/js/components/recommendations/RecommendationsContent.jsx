import { Link, useForm, usePage } from "@inertiajs/react";
import {
    IconCircleCheck,
    IconCircleCheckFilled,
    IconCircleFilled,
    IconClockFilled,
    IconLeafFilled,
} from "@tabler/icons-react";
import { route } from "ziggy-js";
import { Spinner } from "../ui/spinner";
import { useState } from "react";

export default function RecommendationsContent() {
    const { general_recommendations, recommendations_for_you } =
        usePage().props;

    const [processingId, setProcessingId] = useState(null);
    const { patch, processing } = useForm();

    const handleAdopt = (recommendationId) => {
        setProcessingId(recommendationId);
        patch(
            route("dashboard.recommendations.updateStatus", recommendationId),
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessingId(null);
                },
            },
        );
    };

    return (
        <div className="flex flex-col gap-6 pb-6">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <IconLeafFilled size={35} color="#00a63e" />
                    <div className="flex flex-col">
                        <h2 className="font-semibold text-[18px]">
                            Recomendaciones generales
                        </h2>
                        <p className="text-[14px] text-gray-600 font-medium">
                            Pequeñas acciones sostenibles que puedes aplicar a
                            tu día a día.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {general_recommendations.data.map((recommendation) => {
                        const isThisLoading =
                            processing && processingId === recommendation.id;

                        return (
                            <div
                                key={recommendation.id}
                                className="flex flex-1 min-w-0 w-full basis-full md:basis-auto lg:min-w-[28rem] gap-2 bg-white rounded-lg border p-4 transition-all"
                            >
                                <div
                                    className={`h-16 w-16 aspect-square rounded-full flex items-center justify-center bg-green-500/20 text-green-700`}
                                >
                                    <span
                                        className="scale-150"
                                        dangerouslySetInnerHTML={{
                                            __html: recommendation.icon,
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col justify-between gap-2 min-w-0 flex-1">
                                    <span
                                        className={`${recommendation.priority === "low" && "bg-green-500/20 text-emerald-800"} ${
                                            recommendation.priority ===
                                                "medium" &&
                                            "bg-orange-500/15 text-orange-500"
                                        } ${
                                            recommendation.priority ===
                                                "high" &&
                                            "bg-red-500/20 text-red-700"
                                        } w-fit px-2 py-1 font-medium rounded-xl flex items-center gap-1 text-[14px]`}
                                    >
                                        <IconCircleFilled size={15} />
                                        {recommendation.priority === "low" &&
                                            "Baja"}
                                        {recommendation.priority === "medium" &&
                                            "Media"}
                                        {recommendation.priority === "high" &&
                                            "Alta"}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-[14px] text-gray-800">
                                            {recommendation.title}
                                        </p>
                                        <small className="text-gray-600 font-medium">
                                            {recommendation.description}
                                        </small>
                                    </div>

                                    {recommendation.user_status ? (
                                        <>
                                            <>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span
                                                        className={`${
                                                            recommendation.user_status ===
                                                            "adopted"
                                                                ? "bg-green-500/20 text-emerald-600"
                                                                : "bg-gray-200 text-gray-500"
                                                        } flex flex-wrap items-center gap-2 px-4 py-2  text-[13px]  border border-gray-200 rounded-full w-fit h-fit font-semibold whitespace-normal sm:whitespace-nowrap`}
                                                    >
                                                        {recommendation.user_status ===
                                                        "adopted" ? (
                                                            <>
                                                                <IconCircleCheckFilled />
                                                                Adoptada
                                                            </>
                                                        ) : (
                                                            <>
                                                                <IconClockFilled />
                                                                Pendiente
                                                            </>
                                                        )}
                                                    </span>
                                                    <button
                                                        disabled={isThisLoading}
                                                        onClick={() =>
                                                            handleAdopt(
                                                                recommendation.id,
                                                            )
                                                        }
                                                        className="flex flex-wrap items-center gap-2 px-4 py-2 bg-white text-[13px] text-emerald-900 border border-gray-200 rounded-full w-fit h-fit font-semibold whitespace-normal sm:whitespace-nowrap shadow-2xs cursor-pointer transition-colors hover:bg-emerald-50/60"
                                                    >
                                                        {isThisLoading ? (
                                                            <>
                                                                <Spinner />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <IconCircleCheck
                                                                    size={18}
                                                                    stroke={2}
                                                                    className="text-emerald-800 shrink-0"
                                                                />
                                                                <span>
                                                                    {recommendation.user_status ===
                                                                    "adopted"
                                                                        ? "Marcar como pendiente"
                                                                        : "Marcar como adoptada"}
                                                                </span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                disabled={isThisLoading}
                                                onClick={() =>
                                                    handleAdopt(
                                                        recommendation.id,
                                                    )
                                                }
                                                className="flex flex-wrap items-center gap-2 px-4 py-2 bg-green-500/20 text-[13px] text-emerald-900 border border-gray-200 rounded-full w-fit h-fit font-semibold whitespace-normal sm:whitespace-nowrap shadow-2xs cursor-pointer transition-colors hover:bg-green-500/30"
                                            >
                                                {isThisLoading ? (
                                                    <>
                                                        Adoptando <Spinner />
                                                    </>
                                                ) : (
                                                    <>
                                                        <IconCircleCheck
                                                            size={18}
                                                            stroke={2}
                                                            className="text-emerald-800 shrink-0"
                                                        />
                                                        <span>
                                                            Marcar como adoptada
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-wrap items-center gap-2 justify-end">
                    {general_recommendations.links.map((link, index) => {
                        if (!link.url) {
                            return (
                                <span
                                    key={index}
                                    className="min-h-11 min-w-11 sm:min-h-10 sm:min-w-10 p-2 h-10 w-10 text-center rounded text-gray-400 bg-gray-50 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            );
                        }

                        return (
                            <Link
                                preserveScroll
                                key={index}
                                href={link.url}
                                className={`min-h-11 min-w-11 sm:min-h-10 sm:min-w-10 p-2 h-10 w-10 text-center border rounded transition-colors shadow ${
                                    link.active
                                        ? "bg-emerald-800 text-white border-emerald-800 font-medium"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <IconLeafFilled size={35} color="#00a63e" />
                    <div className="flex flex-col">
                        <h2 className="font-semibold text-[18px]">
                            Recomendaciones para ti
                        </h2>
                        <p className="text-[14px] text-gray-600 font-medium">
                            Pequeñas acciones sostenibles que puedes aplicar a
                            tu día a día.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 w-full">
                    {recommendations_for_you.data.length > 0 ? (
                        <>
                            {recommendations_for_you.data.map(
                                (recommendation) => {
                                    const isThisLoading =
                                        processing &&
                                        processingId === recommendation.id;

                                    return (
                                        <div
                                            key={recommendation.id}
                                            className="flex flex-1 min-w-0 w-full basis-full md:basis-auto lg:min-w-[28rem] gap-2 bg-white rounded-lg border p-4 transition-all"
                                        >
                                            <div
                                                className={`h-16 w-16 aspect-square rounded-full flex items-center justify-center bg-green-500/20 text-green-700`}
                                            >
                                                <span
                                                    className="scale-150"
                                                    dangerouslySetInnerHTML={{
                                                        __html: recommendation.icon,
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col justify-between gap-2 min-w-0 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className={`${recommendation.category_id === 1 ? "bg-green-500/10 text-emerald-700" : "bg-blue-500/10 text-blue-700"} w-fit px-2 py-1 font-medium rounded-xl flex items-center gap-1 text-[14px]`}
                                                    >
                                                        {
                                                            recommendation.category_name
                                                        }
                                                    </span>
                                                    <span
                                                        className={`${recommendation.priority === "low" && "bg-green-500/20 text-emerald-800"} ${
                                                            recommendation.priority ===
                                                                "medium" &&
                                                            "bg-orange-500/15 text-orange-500"
                                                        } ${
                                                            recommendation.priority ===
                                                                "high" &&
                                                            "bg-red-500/20 text-red-700"
                                                        } w-fit px-2 py-1 font-medium rounded-xl flex items-center gap-1 text-[14px]`}
                                                    >
                                                        <IconCircleFilled
                                                            size={15}
                                                        />
                                                        {recommendation.priority ===
                                                            "low" && "Baja"}
                                                        {recommendation.priority ===
                                                            "medium" && "Media"}
                                                        {recommendation.priority ===
                                                            "high" && "Alta"}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1 gap-2">
                                                    <div className="flex flex-col w-fit min-w-0">
                                                        <p className="font-semibold text-[14px] text-gray-800 w-fit">
                                                            {
                                                                recommendation.title
                                                            }
                                                        </p>
                                                        <small className="text-gray-600 font-medium w-fit">
                                                            {
                                                                recommendation.description
                                                            }
                                                        </small>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {recommendation.user_status ? (
                                                            <>
                                                                <>
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <span
                                                                            className={`${
                                                                                recommendation.user_status ===
                                                                                "adopted"
                                                                                    ? "bg-green-500/20 text-emerald-600"
                                                                                    : "bg-gray-200 text-gray-500"
                                                                            } flex flex-wrap items-center gap-2 px-4 py-2  text-[13px]  border border-gray-200 rounded-full w-fit h-fit font-semibold whitespace-normal sm:whitespace-nowrap`}
                                                                        >
                                                                            {recommendation.user_status ===
                                                                            "adopted" ? (
                                                                                <>
                                                                                    <IconCircleCheckFilled />
                                                                                    Adoptada
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <IconClockFilled />
                                                                                    Pendiente
                                                                                </>
                                                                            )}
                                                                        </span>
                                                                        <button
                                                                            disabled={
                                                                                isThisLoading
                                                                            }
                                                                            onClick={() =>
                                                                                handleAdopt(
                                                                                    recommendation.id,
                                                                                )
                                                                            }
                                                                            className="flex flex-wrap items-center gap-2 px-4 py-2 bg-white text-[13px] text-emerald-900 border border-gray-200 rounded-full w-fit h-fit font-semibold whitespace-normal sm:whitespace-nowrap shadow-2xs cursor-pointer transition-colors hover:bg-emerald-50/60"
                                                                        >
                                                                            {isThisLoading ? (
                                                                                <>
                                                                                    <Spinner />
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <IconCircleCheck
                                                                                        size={
                                                                                            18
                                                                                        }
                                                                                        stroke={
                                                                                            2
                                                                                        }
                                                                                        className="text-emerald-800 shrink-0"
                                                                                    />
                                                                                    <span>
                                                                                        {recommendation.user_status ===
                                                                                        "adopted"
                                                                                            ? "Marcar como pendiente"
                                                                                            : "Marcar como adoptada"}
                                                                                    </span>
                                                                                </>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    disabled={
                                                                        isThisLoading
                                                                    }
                                                                    onClick={() =>
                                                                        handleAdopt(
                                                                            recommendation.id,
                                                                        )
                                                                    }
                                                                    className="flex flex-wrap items-center gap-2 px-4 py-2 bg-green-500/20 text-[13px] text-emerald-900 border border-gray-200 rounded-full w-fit h-fit font-semibold whitespace-normal sm:whitespace-nowrap shadow-2xs cursor-pointer transition-colors hover:bg-green-500/30"
                                                                >
                                                                    {isThisLoading ? (
                                                                        <>
                                                                            Adoptando{" "}
                                                                            <Spinner />
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <IconCircleCheck
                                                                                size={
                                                                                    18
                                                                                }
                                                                                stroke={
                                                                                    2
                                                                                }
                                                                                className="text-emerald-800 shrink-0"
                                                                            />
                                                                            <span>
                                                                                Marcar
                                                                                como
                                                                                adoptada
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                            <div className="flex flex-wrap items-center gap-2 justify-end col-span-full">
                                {recommendations_for_you.links.map(
                                    (link, index) => {
                                        if (!link.url) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="min-h-11 min-w-11 sm:min-h-10 sm:min-w-10 p-2 h-10 w-10 text-center rounded text-gray-400 bg-gray-50 cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            );
                                        }

                                        return (
                                            <Link
                                                preserveScroll
                                                key={index}
                                                href={link.url}
                                                className={`min-h-11 min-w-11 sm:min-h-10 sm:min-w-10 p-2 h-10 w-10 text-center border rounded transition-colors shadow ${
                                                    link.active
                                                        ? "bg-emerald-800 text-white border-emerald-800 font-medium"
                                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        );
                                    },
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="font-semibold text-[14px] text-center col-span-full mt-2">
                            Aún no tienes recomendaciones personalizadas.
                            Calcula tu huella de carbono para descubrir consejos
                            hechos a tu medida.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
