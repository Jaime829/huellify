import SafeDBIcon from "@/components/util/SafeDBIcon";
import { router, usePage } from "@inertiajs/react";
import { ArrowRight, Search } from "lucide-react";

export default function ExploreHabitsContent() {
    const { props } = usePage();
    const habits = props.habits;
    const habitCategories = props.habitCategories;

    const urlParams = new URLSearchParams(window.location.search);
    const activeFilter = urlParams.get("habit_category") || "all";

    const filtrarPorTipo = (tipo) => {
        const params = new URLSearchParams(window.location.search);
        params.set("habit_category", tipo);
        router.get(
            window.location.pathname,
            Object.fromEntries(params.entries()),
            { preserveState: true, replace: true },
        );
    };

    console.log(habits);
    return (
        <div className="p-4 bg-white border-t rounded-t-xl flex flex-col gap-4 h-full">
            <header className="flex justify-between">
                <div className="flex gap-2">
                    <button
                        className={`${activeFilter === "all" ? "bg-emerald-700 text-white" : "bg-gray-100 text text-gray-600"} flex items-center justify-center px-2 py-1 shadow rounded-md cursor-pointer font-medium text-[12px] transition-colors ease-in-out delay-75`}
                        onClick={() => filtrarPorTipo("all")}
                    >
                        Todos
                    </button>
                    {habitCategories.map((category) => {
                        return (
                            <button
                                className={`${activeFilter == category.id ? "bg-emerald-700 text-white" : "bg-gray-100 text text-gray-600"} flex items-center justify-center gap-1 bg-emerald-700 px-2 py-1 rounded-md cursor-pointer font-medium text-[12px] transition-colors ease-in-out delay-75`}
                                key={category.id}
                                onClick={() => filtrarPorTipo(category.id)}
                            >
                                {category.name}
                            </button>
                        );
                    })}
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
                        onChange={(e) => {
                            const params = new URLSearchParams(
                                window.location.search,
                            );

                            if (e.target.value) {
                                params.set("habit_name", e.target.value);
                            } else {
                                params.delete("habit_name");
                            }

                            router.get(
                                window.location.pathname,
                                Object.fromEntries(params.entries()),
                                { preserveState: true, replace: true },
                            );
                        }}
                    />
                </div>
            </header>
            <div className="grid grid-cols-2 gap-4">
                {habits.length > 0 ? (
                    habits.map((habit) => {
                        return (
                            <div
                                key={habit.id}
                                className="shadow-md rounded-xl px-3 py-4 border flex flex-col gap-2"
                            >
                                <div className="flex gap-2 max-w-[60%]">
                                    <div className="h-14 w-14 aspect-square bg-green-500/20 rounded-full flex items-center justify-center text-emerald-800">
                                        <SafeDBIcon
                                            svgRawString={habit.icon}
                                            className="stroke-2"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">
                                            {habit.name}
                                        </p>
                                        <p className="leading-[1.4] font-semibold text-gray-500 text-[12px]">
                                            {habit.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        <p className="px-2 py-1 font-medium text-[10px] text-emerald-800 bg-green-500/10 rounded-xl">
                                            {habit.habit_category_name}
                                        </p>
                                        <p className="px-2 py-1 font-medium text-[10px] text-emerald-800 bg-green-500/10 rounded-xl">
                                            {Number(
                                                habit.recommended_weekly_target,
                                            )}{" "}
                                            {Number(
                                                habit.recommended_weekly_target,
                                            ) > 1
                                                ? "veces"
                                                : "vez"}{" "}
                                            por semana
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-0.5 bg-emerald-700 text-white font-medium rounded-lg p-2 text-[12px] transition-colors ease-in-out delay-75 hover:bg-emerald-800 cursor-pointer">
                                        Adoptar hábito <ArrowRight size={15} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="font-medium text-emerald-900">
                        No hay hábitos disponibles
                    </p>
                )}
            </div>
        </div>
    );
}
