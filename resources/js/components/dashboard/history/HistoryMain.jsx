import HistoryContent from "./HistoryContent";

export default function HistoryMain() {
    return (
        <div className="px-6 pt-6 pb-24 xl:pb-6 flex flex-col gap-4">
            <div>
                <h1 className="text-emerald-950 font-semibold text-2xl">
                    Historial de huella de carbono
                </h1>
                <p className="text-gray-700">
                    Consulta tus resultados anteriores y conoce cómo ha
                    evolucionado tu impacto ambiental.
                </p>
            </div>
            <HistoryContent />
        </div>
    );
}
