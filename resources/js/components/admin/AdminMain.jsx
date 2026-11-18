import {
    IconCar4wdFilled,
    IconCarFilled,
    IconCircleCheckFilled,
    IconDotsVertical,
    IconLeafFilled,
} from "@tabler/icons-react";
import AdminCardInfo from "./AdminCardInfo";
import { Link, usePage } from "@inertiajs/react";
import {
    ArrowRight,
    Eye,
    PencilIcon,

} from "lucide-react";
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
import EmissionFactorsModal from "./modals/EmissionFactorsModal";

export default function AdminMain() {
    const {
        totalEmissionsFactor,
        totalEmissionsFactorActive,
        categoriasCubiertas,
        lastestEmissionFactors,
    } = usePage().props;

    const [actionEmission, setActionEmission] = useState({
        isOpen: false,
        emission: null,
        action: null,
    });

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Panel administrativo</h1>
                <p className="text-gray-700">
                    Administra los factores de emisión y consulta el uso de las
                    recomendaciones de sostenibilidad en Huellify.
                </p>
            </div>
            <div className="flex items-center gap-4">
                <AdminCardInfo
                    mainText={totalEmissionsFactor}
                    description={"Total de factores registrados"}
                    icon={IconLeafFilled}
                />
                <AdminCardInfo
                    mainText={totalEmissionsFactorActive}
                    description={"Factores activos"}
                    icon={IconCircleCheckFilled}
                />
                <AdminCardInfo
                    mainText={categoriasCubiertas.join(" y ")}
                    description={"Categorias cubiertas"}
                    icon={IconCarFilled}
                />
            </div>
            <div className="flex flex-col gap-4 p-4 bg-white border rounded-lg">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-[18px]">
                        Factores de emisión recientes
                    </h2>
                    <Link className="flex items-center gap-1 text-white font-medium p-2 bg-emerald-700 rounded-lg transition-colors hover:bg-emerald-800">
                        Gestionar factores <ArrowRight />
                    </Link>
                </div>

                <Table>
                    <TableHeader className={"bg-gray-100 font-semibold"}>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Tipo o fuente</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Unidad</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lastestEmissionFactors.map((emission) => {
                            return (
                                <TableRow
                                    key={emission.id}
                                    className={"text-gray-700 font-medium"}
                                >
                                    <TableCell>{emission.name}</TableCell>
                                    <TableCell>
                                        {emission.activity_category.name}
                                    </TableCell>
                                    <TableCell>
                                        {emission.category_id === 1
                                            ? emission.transport_emission_factor
                                                  .transport_type.name
                                            : emission.energy_emission_factor
                                                  .energy_source.name}
                                    </TableCell>
                                    <TableCell>
                                        {Number(emission.value).toFixed(4)}
                                    </TableCell>
                                    <TableCell>
                                        kg CO<sub>2</sub>e/
                                        {emission.measurement_unit.symbol}
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
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="cursor-pointer flex items-center justify-center focus:outline-none">
                                                    <IconDotsVertical />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className={"mr-2 w-fit"}
                                            >
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem>
                                                        <button className="flex items-center gap-2 cursor-pointer">
                                                            <Eye />
                                                            Ver detalles
                                                        </button>
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
            <EmissionFactorsModal
                actionEmission={actionEmission}
                setActionEmission={setActionEmission}
            />
        </div>
    );
}
