import { Link, usePage } from "@inertiajs/react";
import {
    IconBoltFilled,
    IconBook,
    IconCarFilled,
    IconCheck,
    IconCircleFilled,
    IconExternalLinkFilled,
    IconInfoCircleFilled,
    IconLetterT,
    IconPencilFilled,
    IconScaleFilled,
    IconSettings,
    IconSettingsFilled,
} from "@tabler/icons-react";
import {
    ArrowLeft,
    Calculator,
    Calendar,
    ChevronRight,
    Grid2X2,
    History,
} from "lucide-react";
import React, { useState } from "react";
import { route } from "ziggy-js";
import EmissionFactorsModal from "../../modals/EmissionFactorsModal";

export default function ShowFactorMain() {
    const { emissionFactor } = usePage().props;

    const [actionEmission, setActionEmission] = useState({
        isOpen: false,
        emission: null,
        action: null,
    });

    const indiceUrl = emissionFactor.source.indexOf("https");

    let citaApa = emissionFactor.source;
    let enlaceFuente = "";

    if (indiceUrl !== -1) {
        citaApa = emissionFactor.source.slice(0, indiceUrl).trim();
        enlaceFuente = emissionFactor.source.slice(indiceUrl).trim();
    }

    return (
        <div className="flex flex-col gap-4 px-4 pt-4 pb-8">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <p className="flex items-center gap-1 text-[14px]">
                        <Link
                            className="text-emerald-600"
                            href={route("admin.emissions.index")}
                        >
                            Factores de emisión
                        </Link>
                        <ChevronRight size={20} />
                        <span>Detalle del factor</span>
                    </p>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">
                            Detalle del factor de emisión
                        </h1>
                        <p className="text-gray-700">
                            Consulta la informacion técnica, el valor y la
                            fuente del factor utilizado en los cálculos de
                            huella de carbono.
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Link
                        href={route("admin.emissions.index")}
                        className="p-2 border border-emerald-500 bg-white rounded-lg w-fit h-fit flex items-center font-medium gap-1 text-[14px] transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft size={20} /> <span>Volver a factores</span>
                    </Link>
                    <button
                        onClick={() =>
                            setActionEmission({
                                isOpen: true,
                                emission: emissionFactor,
                                action: "edit",
                            })
                        }
                        className="cursor-pointer p-2 border border-emerald-400 bg-emerald-700 rounded-lg w-fit h-fit flex items-center font-medium gap-1 text-[14px] text-white transition-colors hover:bg-emerald-800"
                    >
                        <IconPencilFilled size={20} />
                        <span>Editar factor</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div
                    className={`flex justify-between items-center p-4 ${emissionFactor.category_id === 1 ? "bg-green-400/10 border-emerald-200" : "bg-blue-500/10 border-blue-200"}  rounded-lg border `}
                >
                    <div
                        className={`${emissionFactor.category_id === 1 ? "bg-green-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} h-20 w-20 rounded-full flex items-center justify-center`}
                    >
                        {emissionFactor.category_id === 1 ? (
                            <IconCarFilled size={55} />
                        ) : (
                            <IconBoltFilled size={55} />
                        )}
                    </div>
                    <div className={`flex flex-col gap-1`}>
                        <p className="font-bold">{emissionFactor.name}</p>
                        <span
                            className={`${emissionFactor.category_id === 1 ? "bg-green-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} w-fit h-fit px-2 py-1 flex items-center rounded-full text-[12px] gap-1`}
                        >
                            {emissionFactor.category_id === 1 ? (
                                <>
                                    <IconCarFilled size={20} />
                                    {emissionFactor.activity_category.name}
                                </>
                            ) : (
                                <>
                                    <IconBoltFilled size={20} />
                                    {emissionFactor.activity_category.name}
                                </>
                            )}
                        </span>
                        <p className="font-semibold text-[12px]">
                            Tipo de actividad:{" "}
                            <small className="text-[12px] font-normal">
                                {emissionFactor.category_id === 1
                                    ? emissionFactor.transport_emission_factor
                                          .transport_type.name
                                    : emissionFactor.energy_emission_factor
                                          .energy_source.name}
                            </small>
                        </p>
                    </div>
                    <div>
                        <p className="font-bold text-4xl text-gray-800">
                            {emissionFactor.value}
                        </p>
                        <small className="font-semibold text-[16px]">
                            kg CO<sub>2</sub>e/
                            {emissionFactor.measurement_unit.symbol}
                        </small>
                    </div>
                    <span
                        className={`${emissionFactor.active ? "bg-green-500/20 text-emerald-700" : "bg-red-500/20 text-red-700"} flex items-center gap-2 text-[18px] h-fit w-fit px-2 py-1 rounded-full`}
                    >
                        {" "}
                        <IconCircleFilled size={15} />
                        {emissionFactor.active ? "Activo" : "Inactivo"}
                    </span>
                </div>
                <div className="p-4 border rounded-lg bg-white flex flex-col gap-4">
                    <p className="font-semibold flex items-center gap-1 text-[18px]">
                        <IconInfoCircleFilled
                            size={30}
                            color={
                                emissionFactor.category_id === 1
                                    ? "#007A55"
                                    : "#1447e6"
                            }
                        />
                        Información general
                    </p>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2">
                                <div
                                    className={`${emissionFactor.category_id === 1 ? "bg-emerald-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} h-10 w-10 rounded-full flex items-center justify-center`}
                                >
                                    <IconLetterT />
                                </div>
                                <div className="flex flex-col">
                                    <small className="text-gray-600 font-medium">
                                        Nombre del factor
                                    </small>
                                    <p className="text-[14px] font-medium">
                                        {emissionFactor.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div
                                    className={`${emissionFactor.category_id === 1 ? "bg-emerald-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} h-10 w-10 rounded-full flex items-center justify-center`}
                                >
                                    <Grid2X2 />
                                </div>
                                <div className="flex flex-col">
                                    <small className="text-gray-600 font-medium">
                                        Categoría
                                    </small>
                                    <p className="text-[14px] font-medium">
                                        {emissionFactor.activity_category.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div
                                    className={`${emissionFactor.category_id === 1 ? "bg-emerald-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} h-10 w-10 rounded-full flex items-center justify-center`}
                                >
                                    <IconSettingsFilled />
                                </div>
                                <div className="flex flex-col">
                                    <small className="text-gray-600 font-medium">
                                        Tipo de actividad o fuente
                                    </small>
                                    <p className="text-[14px] font-medium">
                                        {emissionFactor.category_id === 1
                                            ? emissionFactor
                                                  .transport_emission_factor
                                                  .transport_type.name
                                            : emissionFactor
                                                  .energy_emission_factor
                                                  .energy_source.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div
                                    className={`${emissionFactor.category_id === 1 ? "bg-emerald-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} h-10 w-10 rounded-full flex items-center justify-center`}
                                >
                                    <IconScaleFilled />
                                </div>
                                <div className="flex flex-col">
                                    <small className="text-gray-600 font-medium">
                                        Unidad de medida
                                    </small>
                                    <p className="text-[14px] font-medium">
                                        kg CO<sub>2</sub>e/
                                        {emissionFactor.measurement_unit.symbol}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2">
                                <div
                                    className={`${emissionFactor.category_id === 1 ? "bg-emerald-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} h-10 w-10 rounded-full flex items-center justify-center`}
                                >
                                    <Calculator />
                                </div>
                                <div className="flex flex-col">
                                    <small className="text-gray-600 font-medium">
                                        Valor de emisión
                                    </small>
                                    <p className="text-[14px] font-medium">
                                        {emissionFactor.value}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div
                                    className={`${emissionFactor.category_id === 1 ? "bg-emerald-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} h-10 w-10 rounded-full flex items-center justify-center`}
                                >
                                    <IconCheck />
                                </div>
                                <div className="flex flex-col">
                                    <small className="text-gray-600 font-medium">
                                        Estado
                                    </small>
                                    <p
                                        className={`${emissionFactor.active ? "bg-green-500/20 text-emerald-700" : "bg-red-500/20 text-red-700"} flex items-center gap-1 h-fit w-fit px-1 text-[14px] rounded-full`}
                                    >
                                        <IconCircleFilled size={15} />
                                        {emissionFactor.active
                                            ? "Activo"
                                            : "Inactivo"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div
                                    className={`${emissionFactor.category_id === 1 ? "bg-emerald-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} h-10 w-10 rounded-full flex items-center justify-center`}
                                >
                                    <Calendar />
                                </div>
                                <div className="flex flex-col">
                                    <small className="text-gray-600 font-medium">
                                        Fecha de creación
                                    </small>
                                    <p className="text-[14px] font-medium">
                                        {emissionFactor.created_at
                                            ? new Date(
                                                  emissionFactor.created_at
                                                      .split("T")[0]
                                                      .replaceAll("-", "/"),
                                              ).toLocaleDateString("es-CO")
                                            : ""}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div
                                    className={`${emissionFactor.category_id === 1 ? "bg-emerald-500/20 text-emerald-700" : "bg-blue-500/20 text-blue-700"} h-10 w-10 rounded-full flex items-center justify-center`}
                                >
                                    <History />
                                </div>
                                <div className="flex flex-col">
                                    <small className="text-gray-600 font-medium">
                                        Última actualización
                                    </small>
                                    <p className="text-[14px] font-medium">
                                        {emissionFactor.updated_at
                                            ? new Date(
                                                  emissionFactor.updated_at
                                                      .split("T")[0]
                                                      .replaceAll("-", "/"),
                                              ).toLocaleDateString("es-CO")
                                            : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-4 gap-4 bg-white border rounded-lg">
                    <p className="font-semibold flex items-center gap-1 text-[18px]">
                        <IconBook
                            size={30}
                            color={
                                emissionFactor.category_id === 1
                                    ? "#007A55"
                                    : "#1447e6"
                            }
                        />
                        Fuente
                    </p>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Fuente bibliográfica</p>
                        <p className="text-gray-700 text-[14px]">{citaApa}</p>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={enlaceFuente}
                            className="flex items-center gap-2 text-emerald-700 w-fit"
                        >
                            <IconExternalLinkFilled />
                            <span className="underline">
                                Consultar fuente original
                            </span>
                        </a>
                    </div>
                </div>

                <div className="p-4 flex items-center gap-4 text-blue-800 bg-blue-500/10 rounded-lg border border-blue-400">
                    <IconInfoCircleFilled size={35} />
                    <p className="font-medium text-[14px]">
                        Este factor se utiliza en los nuevos cálculos de huella
                        de carbono mientras permanezca activo. <br /> Los
                        resultados históricos conservan los valores con los que
                        fueron calculados.
                    </p>
                </div>
            </div>
            <EmissionFactorsModal
                actionEmission={actionEmission}
                setActionEmission={setActionEmission}
            />
        </div>
    );
}
