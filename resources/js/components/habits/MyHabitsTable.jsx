import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import { IconLeafFilled } from "@tabler/icons-react";
import { router } from "@inertiajs/react";

export default function MyHabitsTable() {
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
                            className={`${activeFilter === "all" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-400"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                            onClick={filtrarPorTipo("all")}
                        >
                            Todos
                        </button>
                        <button
                            className={`${activeFilter === "active" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-400"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                            onClick={filtrarPorTipo("active")}
                        >
                            Activos
                        </button>
                        <button
                            className={`${activeFilter === "paused" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-400"} py-1 px-2 rounded-xl font-medium cursor-pointer`}
                            onClick={filtrarPorTipo("paused")}
                        >
                            Pausados
                        </button>
                    </TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow></TableRow>
            </TableBody>
        </Table>
    );
}
