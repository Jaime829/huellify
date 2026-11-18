import { Link, router, usePage } from "@inertiajs/react";
import { Plus, Search } from "lucide-react";
import { IconDotsVertical } from "@tabler/icons-react";
import { ArrowRight, Eye, PencilIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import EmissionFactorsModal from "../modals/EmissionFactorsModal";
import { route } from "ziggy-js";

export default function EmissionFactorsMain() {
    const { emissionFactors, activityCategories } = usePage().props;
    const [actionEmission, setActionEmission] = useState({
        isOpen: false,
        emission: null,
        action: null,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const [activeFilters, setActiveFilters] = useState({
        nameEmission: urlParams.get("nameEmission") || "",
        categoryEmission: urlParams.get("categoryEmission") || "",
    });

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Factores de emisión</h1>
                    <p className="text-gray-700">
                        Consulta y administra los factores utilizados para
                        calcular las emisiones de carbono.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setActionEmission({
                            isOpen: true,
                            action: "create",
                        });
                    }}
                    className="text-white font-medium p-2 flex items-center gap-2 bg-emerald-700 text-[14px] w-fit h-fit rounded-lg transition-colors hover:bg-emerald-800"
                >
                    <Plus /> <span>Nuevo factor</span>
                </button>
            </div>
            <div className="flex flex-col gap-4 p-4 ">
                <div className="flex items-center gap-4 ">
                    <div className="border bg-white rounded-lg flex items-center gap-2 p-2 text-gray-600">
                        <Search size={20} />
                        <input
                            value={activeFilters.nameEmission}
                            onChange={(e) => {
                                setActiveFilters({
                                    nameEmission: e.target.value,
                                });
                                const params = new URLSearchParams(
                                    window.location.search,
                                );

                                if (e.target.value) {
                                    params.set("nameEmission", e.target.value);
                                } else {
                                    params.delete("nameEmission");
                                }

                                router.get(
                                    window.location.pathname,
                                    Object.fromEntries(params.entries()),
                                    { preserveState: true, replace: true },
                                );
                            }}
                            type="text"
                            className="focus:outline-none text-[14px]"
                            placeholder="Buscar por nombre..."
                        />
                    </div>
                    <select
                        name=""
                        id=""
                        value={activeFilters.categoryEmission}
                        className="bg-white p-2 border rounded-lg text-[14px]"
                        onChange={(e) => {
                            setActiveFilters({
                                categoryEmission: e.target.value,
                            });
                            const params = new URLSearchParams(
                                window.location.search,
                            );

                            if (e.target.value) {
                                params.set("categoryEmission", e.target.value);
                            } else {
                                params.delete("categoryEmission");
                            }

                            router.get(
                                window.location.pathname,
                                Object.fromEntries(params.entries()),
                                { preserveState: true, replace: true },
                            );
                        }}
                    >
                        <option value="all">Todas las categorías</option>
                        {activityCategories.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {emissionFactors.data.length > 0 ? (
                    <>
                        <div className={"border rounded-lg overflow-hidden"}>
                            <Table>
                                <TableHeader
                                    className={"bg-gray-100 font-semibold"}
                                >
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Categoría</TableCell>
                                        <TableCell>Tipo o fuente</TableCell>
                                        <TableCell>Valor</TableCell>
                                        <TableCell>Unidad</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>
                                            Última actualización
                                        </TableCell>
                                        <TableCell>Acción</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className={"bg-white"}>
                                    {emissionFactors.data.map((emission) => {
                                        const dateFormat = emission.updated_at
                                            ? new Date(
                                                  emission.updated_at
                                                      .split("T")[0]
                                                      .replaceAll("-", "/"),
                                              ).toLocaleDateString("es-CO")
                                            : null;
                                        return (
                                            <TableRow
                                                key={emission.id}
                                                className={
                                                    "text-gray-700 font-medium h-14 text-[14px]"
                                                }
                                            >
                                                <TableCell>
                                                    {emission.name}
                                                </TableCell>
                                                <TableCell
                                                    className={"font-semibold"}
                                                >
                                                    {
                                                        emission
                                                            .activity_category
                                                            .name
                                                    }
                                                </TableCell>
                                                <TableCell
                                                    className={"font-semibold"}
                                                >
                                                    {emission.category_id === 1
                                                        ? emission
                                                              .transport_emission_factor
                                                              .transport_type
                                                              .name
                                                        : emission
                                                              .energy_emission_factor
                                                              .energy_source
                                                              .name}
                                                </TableCell>
                                                <TableCell>
                                                    {Number(
                                                        emission.value,
                                                    ).toFixed(4)}
                                                </TableCell>
                                                <TableCell>
                                                    kg CO<sub>2</sub>e/
                                                    {
                                                        emission
                                                            .measurement_unit
                                                            .symbol
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`${
                                                            emission.active
                                                                ? "bg-green-500/20 text-green-700"
                                                                : "bg-red-500/20 text-red-700"
                                                        } font-medium h-fit w-fit px-2 py-1 rounded-full`}
                                                    >
                                                        {emission.active
                                                            ? "Activo"
                                                            : "Inactivo"}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {dateFormat}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <button className="cursor-pointer flex items-center justify-center focus:outline-none">
                                                                <IconDotsVertical />
                                                            </button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            className={
                                                                "mr-2 w-fit"
                                                            }
                                                        >
                                                            <DropdownMenuGroup>
                                                                <DropdownMenuItem>
                                                                    <Link
                                                                        href={route(
                                                                            "admin.emissions.show", emission.id
                                                                        )}
                                                                        className="flex items-center gap-2 cursor-pointer"
                                                                    >
                                                                        <Eye />
                                                                        Ver
                                                                        detalles
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <button
                                                                        onClick={() =>
                                                                            setActionEmission(
                                                                                {
                                                                                    isOpen: true,
                                                                                    emission:
                                                                                        emission,
                                                                                    action: "edit",
                                                                                },
                                                                            )
                                                                        }
                                                                        className="flex items-center gap-2 cursor-pointer"
                                                                    >
                                                                        <PencilIcon />
                                                                        Editar
                                                                    </button>
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
                        </div>
                    </>
                ) : (
                    <p>No hay factores de emision disponibles.</p>
                )}
                <div className="flex items-center gap-2 justify-end">
                    {emissionFactors.links.map((link, index) => {
                        if (!link.url) {
                            return (
                                <span
                                    key={index}
                                    className="p-1 w-10 h-10 flex items-center justify-center bg-gray-200 font-medium rounded shadow border transition-all"
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
                                className={`${link.active ? "bg-emerald-700 text-white" : "bg-white"} transition-all p-1 w-10 h-10 flex items-center justify-center font-medium rounded shadow border`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <EmissionFactorsModal
                actionEmission={actionEmission}
                setActionEmission={setActionEmission}
            />
        </div>
    );
}
