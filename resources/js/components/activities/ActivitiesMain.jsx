import {
    IconCarFilled,
    IconToolsKitchen2Filled,
    IconBoltFilled,
    IconTrash,
    IconShoppingCart,
} from "@tabler/icons-react";
import { ShoppingCart } from "lucide-react";
import ActivitiesResumen from "./ActivitiesResumen";
import LatestActivities from "./LatestActivities";
export default function ActivitiesMain() {
    return (
        <div className="py-4 border-t border-gray-200 flex flex-col gap-4">
            <nav className="flex items-center gap-3">
                <button className="bg-emerald-700 h-8 w-16 shadow rounded-md cursor-pointer font-medium text-[12px] text-white">
                    Todas
                </button>
                <button className="bg-white flex items-center justify-center gap-1 h-8 w-28 shadow rounded-md cursor-pointer font-medium text-[12px] text-gray-500">
                    <IconToolsKitchen2Filled size={18} />
                    Alimentación
                </button>
                <button className="bg-white flex items-center justify-center gap-1 h-8 w-28 shadow rounded-md cursor-pointer font-medium text-[12px] text-gray-500">
                    <IconCarFilled size={18} />
                    Transporte
                </button>
                <button className="bg-white flex items-center justify-center gap-1 h-8 w-28 shadow rounded-md cursor-pointer font-medium text-[12px] text-gray-500">
                    <IconBoltFilled size={18} />
                    Energía
                </button>
                <button className="bg-white flex items-center justify-center gap-1 h-8 w-28 shadow rounded-md cursor-pointer font-medium text-[12px] text-gray-500">
                    <IconTrash size={18} />
                    Residuos
                </button>
                <button className="bg-white flex items-center justify-center gap-1 h-8 w-28 shadow rounded-md cursor-pointer font-medium text-[12px] text-gray-500">
                    <IconShoppingCart size={18} />
                    Consumo
                </button>
            </nav>
            <ActivitiesResumen />
            <LatestActivities />
        </div>
    );
}
