import RecommendationsContent from "./RecommendationsContent";

export default function RecommendationsMain() {
    return (
        <div className="px-6 pt-6 pb-24 xl:pb-6 flex flex-col gap-4">
            <div className="pb-4 border-b">
                <h1 className="text-emerald-950 font-semibold text-2xl">
                    Recomendaciones
                </h1>
                <p className="text-gray-700">
                    Descubre acciones que puedes incorporar a tu rutina para
                    reducir tu impacto ambiental.
                </p>
            </div>
            <RecommendationsContent />
        </div>
    );
}
