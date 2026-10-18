import { IconLeafFilled } from "@tabler/icons-react";
import PeriodoCard from "../dashboard/PeriodoCard";

export default function ActivitiesResumen() {
    return (
        <div className="bg-green-500/10 p-4 rounded-md flex justify-between items-center">
            <div className="flex gap-3">
                <div className="flex items-center justify-center rounded-full bg-green-600/10 text-emerald-800 w-12 h-12">
                    <IconLeafFilled size={30} />
                </div>
                <div>
                    <p className="text-emerald-800 font-medium">
                        Total de emisiones (este periodo)
                    </p>
                    <h2 className="text-emerald-900 font-bold text-2xl">
                        246.8{" "}
                        <span className="font-medium text-[18px]">
                            kg CO<sub>2</sub>e
                        </span>
                    </h2>
                </div>
            </div>
            <div>
                <p className="font-medium text-green-700">Estadistica aqui</p>
                <small className="text-gray-500">vs. periodo anterior</small>
            </div>
            <PeriodoCard isPrincipal={false} />
        </div>
    );
}
