import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { DropdownMenuActions } from "./DropdownActions";
import { authUser } from "@/stores/user-store";
import { Link } from "@inertiajs/react";
import activityIcon from "../util/ActivityIcon";

export default function LatestActivities() {
    const data = authUser().activities;
    const activities = data.data.map((activity) => {
        const fecha = new Date(activity.updated_at);

        const opcionesFecha = {
            day: "numeric",
            month: "short",
            year: "numeric",
        };
        const opcionesHora = {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        };

        const formFecha = new Intl.DateTimeFormat(
            "es-ES",
            opcionesFecha,
        ).format(fecha);
        const formHora = new Intl.DateTimeFormat("es-ES", opcionesHora).format(
            fecha,
        );

        const resultadoFinal = `${formFecha} ${formHora}`;

        return {
            ...activity,
            updated_at: resultadoFinal,
        };
    });
    return (
        <div className="flex flex-col gap-2 p-2 shadow rounded-md">
            <h3 className="font-bold text-emerald-900">Últimas actividades</h3>
            <div className="shadow rounded-md">
                {activities.length > 0 ? (
                    <Table className={"bg-white rounded-md"}>
                        <TableBody>
                            {activities.map((activity) => {
                                const nombreActividad = activity.category_name
                                    .toLowerCase()
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "");
                                const Icon = activityIcon(nombreActividad);

                                return (
                                    <TableRow
                                        key={activity.id}
                                        className={
                                            "flex items-center gap-2 p-1"
                                        }
                                    >
                                        <TableCell className={"flex-1"}>
                                            <div className="flex gap-3 items-center">
                                                <div className="flex items-center justify-center rounded-full bg-green-600/10 text-emerald-800 w-12 h-12">
                                                    <Icon />
                                                </div>
                                                <div>
                                                    <p className="text-emerald-800 font-medium">
                                                        {activity.category_name}
                                                    </p>
                                                    <p className="text-gray-500">
                                                        {activity.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className={"flex-1"}>
                                            <p className="text-gray-500">
                                                {activity.updated_at}
                                            </p>
                                        </TableCell>
                                        <TableCell className={"flex-1"}>
                                            <p className="font-bold">
                                                {activity.emissions} Kg CO
                                                <sub>2</sub>e
                                            </p>
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
                                );
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="p-4 text-center font-medium">
                        Aun no tienes actividades en esta categoria
                    </p>
                )}
            </div>
            <div className="flex flex-wrap justify-end gap-1 mt-6">
                {data.links.map((link, index) => {
                    if (!link.url) {
                        return (
                            <span
                                key={index}
                                className="px-4 py-2 rounded text-gray-400 bg-gray-50 cursor-not-allowed"
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-4 py-2 border rounded transition-colors shadow ${
                                link.active
                                    ? "bg-emerald-800 text-white border-emerald-800 font-medium"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
