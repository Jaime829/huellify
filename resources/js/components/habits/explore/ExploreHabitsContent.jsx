import { Search } from "lucide-react";

export default function ExploreHabitsContent() {
    return (
        <div className="p-4 bg-white border-t rounded-t-xl flex flex-col gap-4">
            <header className="flex justify-between">
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-white text-[14px] font-medium bg-emerald-800 rounded-xl cursor-pointer">
                        Todos
                    </button>
                    <button className="px-3 py-1 text-gray-500 text-[14px] font-medium bg-gray-100 rounded-xl cursor-pointer">
                        Energía
                    </button>
                    <button className="px-3 py-1 text-gray-500 text-[14px] font-medium bg-gray-100 rounded-xl cursor-pointer">
                        Transporte
                    </button>
                    <button className="px-3 py-1 text-gray-500 text-[14px] font-medium bg-gray-100 rounded-xl cursor-pointer">
                        Vida cotidiana
                    </button>
                </div>
                <div className="border rounded-xl flex px-2 py-1 items-center gap-2">
                    <label htmlFor="habit-search">
                        <Search size={20} className="text-gray-500" />
                    </label>
                    <input
                        type="text"
                        id="habit-search"
                        className="focus:outline-none text-gray-600 text-[14px]"
                        placeholder="Buscar hábitos..."
                    />
                </div>
            </header>
            <div></div>
        </div>
    );
}
