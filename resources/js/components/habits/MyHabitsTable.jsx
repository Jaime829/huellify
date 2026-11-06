import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import { IconDotsVertical, IconLeafFilled, IconPlayerPause } from "@tabler/icons-react";
import { usePage } from "@inertiajs/react";
import SafeDBIcon from "../util/SafeDBIcon";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, TrashIcon } from "lucide-react";

export default function MyHabitsTable() {
    const { props } = usePage();

    const userHabits = props.userHabits;
    console.log(userHabits);

    const urlParams = new URLSearchParams(window.location.search);
    const activeFilter = urlParams.get("state") || "all";

    const filtrarPorTipo = (tipo) => {
        // router.get(
        //     window.location.pathname,
        //     { state: tipo },
        //     { preserveState: true, replace: true },
        // );
    };

    return (
        <>
            {userHabits.length > 0 ? (
                <Table className={"bg-white rounded-md"}>
                    <TableHeader>
                        <TableRow className={"flex justify-between"}>
                            <TableCell className={"flex items-center gap-1"}>
                                <IconLeafFilled
                                    className="text-emerald-700"
                                    size={30}
                                />
                                <h2 className="font-semibold text-[20px]">
                                    Mis hábitos
                                </h2>
                            </TableCell>
                            <TableCell className={"flex gap-2"}>
                                <button
                                    className={`${activeFilter === "all" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-500"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                                    onClick={filtrarPorTipo("all")}
                                >
                                    Todos
                                </button>
                                <button
                                    className={`${activeFilter === "active" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-500"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                                    onClick={filtrarPorTipo("active")}
                                >
                                    Activos
                                </button>
                                <button
                                    className={`${activeFilter === "paused" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-500"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                                    onClick={filtrarPorTipo("paused")}
                                >
                                    Pausados
                                </button>
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userHabits.map((habit) => {
                            return (
                                <TableRow
                                    className={"flex items-center gap-4"}
                                    key={habit.id}
                                >
                                    <TableCell
                                        className={"flex items-center gap-2"}
                                    >
                                        <div className="bg-green-600/10 w-12 h-12 aspect-square rounded-full flex items-center justify-center text-emerald-700">
                                            <SafeDBIcon
                                                svgRawString={habit.icon}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                {habit.name}
                                            </p>
                                            <p className="text-gray-500 text-[12px]">
                                                {habit.instructions}
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 bg-green-600/10 rounded-lg text-emerald-700 font-medium">
                                            {habit.habit_category.name}
                                        </span>
                                    </TableCell>
                                    <TableCell
                                        className={"flex items-center gap-2"}
                                    >
                                        <p>aca iria progress bar</p>
                                    </TableCell>

                                    <TableCell>
                                        <span
                                            className={`${habit.pivot.paused_at ? "bg-gray-100 text-gray-600" : "bg-green-600/10 text-emerald-700"} font-medium px-2 py-1 rounded-lg text-[16px]`}
                                        >
                                            {habit.pivot.paused_at
                                                ? "Pausado"
                                                : "Activo"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="focus:outline-none flex items-center justify-center cursor-pointer">
                                                    <IconDotsVertical
                                                        stroke={2}
                                                    />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className={"mr-2"}
                                            >
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem>
                                                        <PencilIcon />
                                                        Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <IconPlayerPause stroke={2} />
                                                        Pausar
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem variant="destructive">
                                                        <TrashIcon />
                                                        Eliminar
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            ) : (
                <p>Aun no tienes hábitos disponibles</p>
            )}
        </>
    );
}
