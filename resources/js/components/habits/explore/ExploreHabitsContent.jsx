import SafeDBIcon from "@/components/util/SafeDBIcon";
import { router, useForm, usePage } from "@inertiajs/react";
import { ArrowRight, Check, Search } from "lucide-react";
import {
    DialogHeader,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { DialogClose } from "radix-ui/dialog";
import { useState } from "react";
import { route } from "ziggy-js";

export default function ExploreHabitsContent() {
    const { habits, habitCategories } = usePage().props;

    console.log(habits);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const { post, data, setData, errors, processing } = useForm({
        weekly_target: null,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const activeFilter = urlParams.get("habit_category") || "all";

    const filtrarPorTipo = (tipo) => {
        const params = new URLSearchParams(window.location.search);
        params.set("habit_category", tipo);
        router.get(
            window.location.pathname,
            Object.fromEntries(params.entries()),
            { preserveState: true, preserveFocus: true, replace: true },
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedHabit) return;

        post(route("dashboard.habits.adopt", selectedHabit), {
            onSuccess: () => {
                setSelectedHabit(null);
            },
            preserveScroll: true,
        });
    };

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
                                    <button
                                        onClick={() => {
                                            setSelectedHabit(habit);
                                            setData(
                                                "weekly_target",
                                                habit.recommended_weekly_target,
                                            );
                                        }}
                                        className="flex items-center gap-0.5 bg-emerald-700 text-white font-medium rounded-lg p-2 text-[12px] transition-colors ease-in-out delay-75 hover:bg-emerald-800 cursor-pointer"
                                    >
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
                {selectedHabit && (
                    <Dialog
                        open={!!selectedHabit}
                        onOpenChange={(open) => {
                            if (!open) setSelectedHabit(null);
                        }}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle
                                    className={
                                        "flex items-center gap-2 font-bold text-[18px]"
                                    }
                                >
                                    <div className="h-14 w-14 aspect-square bg-green-500/20 rounded-full flex items-center justify-center text-emerald-800">
                                        <SafeDBIcon
                                            svgRawString={selectedHabit.icon}
                                            className="stroke-2"
                                        />
                                    </div>
                                    Adoptar hábito
                                </DialogTitle>
                                <DialogDescription
                                    className={"flex flex-col gap-1"}
                                >
                                    <span className="font-bold text-black text-[16px]">
                                        {selectedHabit.name}
                                    </span>
                                    <span className="py-1 bg-green-400/20 max-w-20 text-center rounded-xl text-emerald-700 font-medium">
                                        {selectedHabit.habit_category_name}
                                    </span>
                                    <span>{selectedHabit.instructions}</span>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-between bg-green-500/15 p-2 rounded-lg">
                                <div className="flex">
                                    <div></div>
                                    <div>
                                        <p className="font-bold text-emerald-800">
                                            Configura tu objetivo semanal
                                        </p>
                                        <small className="font-light text-gray-700">
                                            Huellify recomienda realizar este
                                            hábito:
                                        </small>
                                    </div>
                                </div>
                                <div className="bg-green-500/20 p-2 flex items-center gap-2 rounded-lg">
                                    <p className="text-emerald-900 font-black text-[24px]">
                                        {Number(
                                            selectedHabit.recommended_weekly_target,
                                        )}
                                    </p>
                                    <div>
                                        <p className="font-bold text-emerald-900 leading-[1.1] text-[18px]">
                                            veces
                                        </p>
                                        <p className="leading-[1.1] font-light">
                                            por semana
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="hidden"
                                    name="_token"
                                    value={document
                                        .querySelector(
                                            'meta[name="csrf-token"]',
                                        )
                                        ?.getAttribute("content")}
                                />
                                <div className="flex flex-col gap-1">
                                    <label
                                        className="font-bold"
                                        htmlFor="weekly_target"
                                    >
                                        Tu objetivo semanal
                                    </label>
                                    <div className="border px-2 py-1 rounded-md flex items-center">
                                        <input
                                            className="focus:outline-none flex-1 text-center shrink"
                                            name="weekly_target"
                                            id="weekly_target"
                                            type="number"
                                            value={Number(data.weekly_target)}
                                            min={1}
                                            onChange={(e) => {
                                                setData(
                                                    "weekly_target",
                                                    e.target.value,
                                                );
                                            }}
                                        />
                                        <span className="text-[10px] ">
                                            Veces por semana
                                        </span>
                                    </div>
                                </div>
                                <DialogFooter className={"mt-6"}>
                                    <DialogClose asChild>
                                        <Button
                                            className={"cursor-pointer"}
                                            variant="outline"
                                        >
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                    <button
                                        className={
                                            "cursor-pointer bg-emerald-700 text-white hover:bg-emerald-900 h-8 gap-1.5 px-2.5 rounded-md flex items-center"
                                        }
                                        disabled={processing}
                                        type="submit"
                                    >
                                        {processing ? (
                                            <>
                                                Guardando adopción
                                                <Spinner />
                                            </>
                                        ) : (
                                            <>
                                                <Check size={15} />
                                                Guardar adopción
                                            </>
                                        )}
                                    </button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}
