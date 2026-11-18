import { ArrowRight, Car, Lightbulb, Zap } from "lucide-react";
import Recomendacion from "./Recomendacion";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function RecomendacionesDestacadas() {
    const { recommendations_for_you } = usePage().props;

    return (
        <div className="p-4 bg-white shadow rounded-md h-full flex flex-col gap-2 order-4 col-start-3 col-end-4 row-start-2 row-end-3 lg:col-start-auto lg:col-end-auto lg:row-start-auto lg:row-end-auto">
            <header className="flex justify-between items-center flex-wrap">
                <div className="flex gap-2 items-center flex-wrap">
                    <Lightbulb />
                    <p className="font-bold text-[10px]">
                        Recomendaciones destacadas
                    </p>
                </div>
                <Link
                    className="flex items-center text-[10px] text-gray-500 transition-colors ease-in-out delay-100 hover:text-gray-700"
                    href={route("dashboard.recommendations")}
                >
                    <ArrowRight size={20} />
                </Link>
            </header>
            <div className="flex flex-col gap-2">
                {recommendations_for_you.map((recommendation) => {
                    console.log(recommendation);

                    return (
                        <Recomendacion
                            key={recommendation.id}
                            icon={recommendation.category_id === 1 ? Car : Zap}
                            bgIcon={
                                recommendation.category_id === 1
                                    ? "bg-emerald-600/10"
                                    : "bg-blue-600/10"
                            }
                            colorIcon={
                                recommendation.category_id === 1
                                    ? "text-emerald-900"
                                    : "text-blue-900"
                            }
                            recomendacion={recommendation.title}
                            descripcion={recommendation.description}
                            prioridad={recommendation.priority}
                        />
                    );
                })}
            </div>
        </div>
    );
}
