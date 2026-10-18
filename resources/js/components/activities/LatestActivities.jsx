import { IconLeafFilled } from "@tabler/icons-react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { DropdownMenuActions } from "./DropdownActions";

export default function LatestActivities() {
    return (
        <div className="flex flex-col gap-2 p-2 shadow rounded-md">
            <h3 className="font-bold text-emerald-900">Últimas actividades</h3>
            <div className="shadow rounded-md">
                <Table>
                    <TableBody>
                        <TableRow className={"flex items-center gap-2 p-1"}>
                            <TableCell className={"flex-1"}>
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center rounded-full bg-green-600/10 text-emerald-800 w-12 h-12">
                                        <IconLeafFilled size={30} />
                                    </div>
                                    <div>
                                        <p className="text-emerald-800 font-medium">
                                            Categoria
                                        </p>
                                        <p className="text-gray-500">
                                            Actividad
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className={"flex-1"}>
                                <p className="text-gray-500">fecha</p>
                            </TableCell>
                            <TableCell className={"flex-1"}>
                                <p className="font-bold">dioxido de carbono</p>
                            </TableCell>
                            <TableCell className={"flex-1"}>
                                <p className="max-w-16 p-1 bg-green-500/20 text-center text-green-800 font-medium rounded-xl">
                                    Estado
                                </p>
                            </TableCell>
                            <TableCell className={"my-0 mx-auto"}>
                                <DropdownMenuActions />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
