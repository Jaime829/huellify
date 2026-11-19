import {
    DialogHeader,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "radix-ui/dialog";
import { useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { IconInfoCircle } from "@tabler/icons-react";
import FormActivityLabel from "@/components/util/FormActivityLabel";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function EmissionFactorsModal({
    actionEmission,
    setActionEmission,
}) {
    const {
        activityCategories,
        energySource,
        transportType,
        fuelType,
        measurementUnits,
    } = usePage().props;

    const [categorySelected, setCategorySelected] = useState(1);

    const { put, processing, errors, setData, data, post } = useForm({
        category_id: 1,
        name: "",
        measurement_unit_id: 1,
        value: 0,
        source: "",
        valid_from: "",
        valid_until: "",
        active: true,
        transport_type_id: 1,
        fuel_type_id: 1,
        energy_source_id: 1,
    });

    console.log(actionEmission.emission);

    useEffect(() => {
        if (actionEmission.emission) {
            const catId = actionEmission.emission.category_id ?? 1;
            setCategorySelected(catId);

            setData({
                category_id: catId,
                name: actionEmission.emission.name ?? "",
                measurement_unit_id:
                    actionEmission.emission.measurement_unit_id ?? "",
                value: actionEmission.emission.value ?? 0,
                source: actionEmission.emission.source ?? "",
                valid_from: actionEmission.emission.valid_from ?? "",
                valid_until: actionEmission.emission.valid_until ?? "",
                active: Boolean(actionEmission.emission.active ?? true),
                transport_type_id:
                    actionEmission.emission.transport_emission_factor
                        ?.transport_type?.id ?? 1,
                fuel_type_id:
                    actionEmission.emission.transport_emission_factor
                        ?.fuel_type_id ?? 1,
                energy_source_id:
                    actionEmission.emission.energy_emission_factor
                        ?.energy_source_id ?? 1,
            });
        }
    }, [actionEmission.emission]);
    const measurementUnitsFormateado = categorySelected
        ? categorySelected == 1
            ? measurementUnits.filter(
                  (measurementUnit) =>
                      measurementUnit.measurement_type === "distance",
              )
            : measurementUnits.filter(
                  (measurementUnit) =>
                      measurementUnit.measurement_type === "energy",
              )
        : null;

    if (actionEmission.action === "edit") {
        if (!actionEmission.emission) return null;

        const handleUpdate = (e) => {
            e.preventDefault();

            put(route("admin.emissions.update", actionEmission.emission.id), {
                onSuccess: () => {
                    setActionEmission({
                        isOpen: false,
                        emission: null,
                        action: null,
                    });
                },
            });
        };

        return (
            <Dialog
                open={actionEmission.isOpen && actionEmission.action}
                onOpenChange={(open) => {
                    if (!open)
                        setActionEmission({
                            isOpen: false,
                            emission: null,
                            action: null,
                        });
                }}
            >
                <DialogContent className={"p-6 w-full sm:w-fit sm:max-w-3xl"}>
                    <DialogHeader className={"flex flex-col gap-4"}>
                        <DialogTitle
                            className={
                                "flex items-center gap-2 font-bold text-[18px]"
                            }
                        >
                            Editar factor de emisión
                        </DialogTitle>
                        <DialogDescription
                            className={
                                "flex flex-col gap-1 bg-cyan-300/25 p-2 rounded-lg"
                            }
                        >
                            <span className="flex items-center gap-2 text-cyan-400">
                                <IconInfoCircle stroke={2} />{" "}
                                <span>Ten en cuenta</span>
                            </span>
                            <small className="text-cyan-800">
                                Los cambios realizados en este factor se
                                aplicarán únicamente a los nuevos cálculos de
                                huella de carbono. Los resultados históricos
                                conservarán los valores con los que fueron
                                calculados.
                            </small>
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdate}>
                        <input
                            type="hidden"
                            name="_token"
                            value={document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content")}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <FormActivityLabel
                                    htmlFor="name"
                                    isRequired={true}
                                >
                                    Nombre del factor
                                </FormActivityLabel>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="p-2 border rounded-lg focus:outline-emerald-600"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Nombre del factor"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormActivityLabel
                                    htmlFor="category_id"
                                    isRequired={true}
                                >
                                    Categoría
                                </FormActivityLabel>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    type="text"
                                    className="p-2 border rounded-lg focus:outline-emerald-600"
                                    value={data.category_id}
                                    onChange={(e) => {
                                        setData("category_id", e.target.value);
                                        setCategorySelected(e.target.value);
                                    }}
                                >
                                    {activityCategories.map((category) => {
                                        return (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormActivityLabel
                                    htmlFor={
                                        categorySelected == 1
                                            ? "transport_type_id"
                                            : "energy_source_id"
                                    }
                                    isRequired={true}
                                >
                                    Tipo de actividad o fuente
                                </FormActivityLabel>
                                <select
                                    id={
                                        categorySelected == 1
                                            ? "transport_type_id"
                                            : "energy_source_id"
                                    }
                                    name={
                                        categorySelected == 1
                                            ? "transport_type_id"
                                            : "energy_source_id"
                                    }
                                    value={
                                        categorySelected == 1
                                            ? data.transport_type_id
                                            : data.energy_source_id
                                    }
                                    onChange={(e) => {
                                        categorySelected == 1
                                            ? setData(
                                                  "transport_type_id",
                                                  e.target.value,
                                              )
                                            : setData(
                                                  "energy_source_id",
                                                  e.target.value,
                                              );
                                    }}
                                    className="p-2 border rounded-lg focus:outline-emerald-600"
                                >
                                    {categorySelected == 1 &&
                                        transportType.map((transport) => {
                                            return (
                                                <option
                                                    key={transport.id}
                                                    value={transport.id}
                                                >
                                                    {transport.name}
                                                </option>
                                            );
                                        })}
                                    {categorySelected == 2 &&
                                        energySource.map((energy) => {
                                            return (
                                                <option
                                                    key={energy.id}
                                                    value={energy.id}
                                                >
                                                    {energy.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>

                            {categorySelected == 1 && (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <FormActivityLabel
                                            htmlFor="fuel_type_id"
                                            isRequired={true}
                                        >
                                            Tipo de combustible
                                        </FormActivityLabel>
                                        <select
                                            id="fuel_type_id"
                                            name="fuel_type_id"
                                            type="text"
                                            className="p-2 border rounded-lg focus:outline-emerald-600"
                                            onChange={(e) => {
                                                setData(
                                                    "fuel_type_id",
                                                    e.target.value,
                                                );
                                            }}
                                            value={data.fuel_type_id}
                                        >
                                            {fuelType.map((fuel) => {
                                                return (
                                                    <option
                                                        key={fuel.id}
                                                        value={fuel.id}
                                                    >
                                                        {fuel.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="flex flex-col gap-2">
                                <FormActivityLabel
                                    htmlFor="measurement_unit_id"
                                    isRequired={true}
                                >
                                    Unidad de medida
                                </FormActivityLabel>
                                <select
                                    id="measurement_unit_id"
                                    name="measurement_unit_id"
                                    type="text"
                                    className="p-2 border rounded-lg focus:outline-emerald-600"
                                    onChange={(e) => {
                                        setData(
                                            "measurement_unit_id",
                                            e.target.value,
                                        );
                                    }}
                                >
                                    {measurementUnitsFormateado ? (
                                        measurementUnitsFormateado.map(
                                            (measurementUnit) => {
                                                return (
                                                    <option
                                                        key={measurementUnit.id}
                                                        value={
                                                            measurementUnit.id
                                                        }
                                                    >
                                                        kg CO₂e/
                                                        {measurementUnit.symbol}
                                                    </option>
                                                );
                                            },
                                        )
                                    ) : (
                                        <option>
                                            Sin unidades de medida disponibles
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormActivityLabel
                                    htmlFor="value"
                                    isRequired={true}
                                >
                                    Valor de emisión
                                </FormActivityLabel>
                                <input
                                    type="number"
                                    min={0}
                                    step={0.000001}
                                    className="p-2 border rounded-lg focus:outline-emerald-600"
                                    value={data.value}
                                    onChange={(e) =>
                                        setData("value", e.target.value)
                                    }
                                    name="value"
                                    id="value"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormActivityLabel
                                    htmlFor="valid_from"
                                    isRequired={true}
                                >
                                    Valido desde
                                </FormActivityLabel>
                                <input
                                    type="date"
                                    className="resize-none p-2 border rounded-lg focus:outline-emerald-600"
                                    name="valid_from"
                                    id="valid_from"
                                    min="1930-01-01"
                                    value={data.valid_from}
                                    onChange={(e) =>
                                        setData("valid_from", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormActivityLabel htmlFor="valid_until">
                                    Valido hasta
                                </FormActivityLabel>
                                <input
                                    type="date"
                                    className="resize-none p-2 border rounded-lg focus:outline-emerald-600"
                                    name="valid_until"
                                    id="valid_until"
                                    min="1930-01-01"
                                    value={data.valid_until ?? ""}
                                    onChange={(e) =>
                                        setData("valid_until", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-full">
                                <FormActivityLabel
                                    htmlFor="source"
                                    isRequired={true}
                                >
                                    Fuente bibliográfica
                                </FormActivityLabel>
                                <input
                                    type="text"
                                    className="p-2 border rounded-lg focus:outline-emerald-600"
                                    name="source"
                                    id="source"
                                    value={data.source}
                                    onChange={(e) =>
                                        setData("source", e.target.value)
                                    }
                                    placeholder="Ej. UPME, 2024"
                                />
                            </div>
                        </div>

                        <DialogFooter
                            className={"mt-6 items-center sm:justify-between"}
                        >
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={data.active}
                                    onCheckedChange={(checked) =>
                                        setData("active", checked)
                                    }
                                    className="data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-slate-300"
                                    id={"active"}
                                />
                                <FormActivityLabel
                                    htmlFor="active"
                                    className="transition-all"
                                >
                                    {" "}
                                    {data.active ? "Activo" : "Inactivo"}
                                </FormActivityLabel>
                            </div>

                            <div className="flex gap-2 items-center">
                                <DialogClose asChild>
                                    <Button
                                        className={
                                            "cursor-pointer p-2 text-[14px] h-full"
                                        }
                                        variant="outline"
                                    >
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <button
                                    className="p-2 text-white h-full bg-emerald-700 font-medium text-[14px] rounded-lg cursor-pointer transition-colors hover:bg-emerald-800"
                                    type="submit"
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
    console.log(data);
    const handleCrete = (e) => {
        e.preventDefault();
        post(route("admin.emissions.store"), {
            onSuccess: () => {
                setActionEmission({
                    open: false,
                    action: null,
                });
            },
        });
    };

    return (
        <Dialog
            open={actionEmission.isOpen && actionEmission.action}
            onOpenChange={(open) => {
                if (!open)
                    setActionEmission({
                        isOpen: false,
                        emission: null,
                        action: null,
                    });
            }}
        >
            <DialogContent className={"p-6 w-full sm:w-fit sm:max-w-3xl"}>
                <DialogHeader className={"flex flex-col gap-4"}>
                    <DialogTitle
                        className={
                            "flex items-center gap-2 font-bold text-[18px]"
                        }
                    >
                        Crear factor de emisión
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleCrete}>
                    <input
                        type="hidden"
                        name="_token"
                        value={document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content")}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <FormActivityLabel htmlFor="name" isRequired={true}>
                                Nombre del factor
                            </FormActivityLabel>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="p-2 border rounded-lg focus:outline-emerald-600"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Nombre del factor"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormActivityLabel
                                htmlFor="category_id"
                                isRequired={true}
                            >
                                Categoría
                            </FormActivityLabel>
                            <select
                                id="category_id"
                                name="category_id"
                                type="text"
                                className="p-2 border rounded-lg focus:outline-emerald-600"
                                value={data.category_id}
                                onChange={(e) => {
                                    setData("category_id", e.target.value);
                                    setCategorySelected(e.target.value);
                                }}
                            >
                                {activityCategories.map((category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormActivityLabel
                                htmlFor={
                                    categorySelected == 1
                                        ? "transport_type_id"
                                        : "energy_source_id"
                                }
                                isRequired={true}
                            >
                                Tipo de actividad o fuente
                            </FormActivityLabel>
                            <select
                                id={
                                    categorySelected == 1
                                        ? "transport_type_id"
                                        : "energy_source_id"
                                }
                                name={
                                    categorySelected == 1
                                        ? "transport_type_id"
                                        : "energy_source_id"
                                }
                                value={
                                    categorySelected == 1
                                        ? data.transport_type_id
                                        : data.energy_source_id
                                }
                                onChange={(e) => {
                                    categorySelected == 1
                                        ? setData(
                                              "transport_type_id",
                                              e.target.value,
                                          )
                                        : setData(
                                              "energy_source_id",
                                              e.target.value,
                                          );
                                }}
                                className="p-2 border rounded-lg focus:outline-emerald-600"
                            >
                                {categorySelected == 1 &&
                                    transportType.map((transport) => {
                                        return (
                                            <option
                                                key={transport.id}
                                                value={transport.id}
                                            >
                                                {transport.name}
                                            </option>
                                        );
                                    })}
                                {categorySelected == 2 &&
                                    energySource.map((energy) => {
                                        return (
                                            <option
                                                key={energy.id}
                                                value={energy.id}
                                            >
                                                {energy.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>

                        {categorySelected == 1 && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <FormActivityLabel
                                        htmlFor="fuel_type_id"
                                        isRequired={true}
                                    >
                                        Tipo de combustible
                                    </FormActivityLabel>
                                    <select
                                        id="fuel_type_id"
                                        name="fuel_type_id"
                                        type="text"
                                        className="p-2 border rounded-lg focus:outline-emerald-600"
                                        onChange={(e) => {
                                            setData(
                                                "fuel_type_id",
                                                e.target.value,
                                            );
                                        }}
                                        value={data.fuel_type_id}
                                    >
                                        {fuelType.map((fuel) => {
                                            return (
                                                <option
                                                    key={fuel.id}
                                                    value={fuel.id}
                                                >
                                                    {fuel.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="flex flex-col gap-2">
                            <FormActivityLabel
                                htmlFor="measurement_unit_id"
                                isRequired={true}
                            >
                                Unidad de medida
                            </FormActivityLabel>
                            <select
                                id="measurement_unit_id"
                                name="measurement_unit_id"
                                type="text"
                                className="p-2 border rounded-lg focus:outline-emerald-600"
                                onChange={(e) => {
                                    setData(
                                        "measurement_unit_id",
                                        e.target.value,
                                    );
                                }}
                            >
                                {measurementUnitsFormateado ? (
                                    measurementUnitsFormateado.map(
                                        (measurementUnit) => {
                                            return (
                                                <option
                                                    key={measurementUnit.id}
                                                    value={measurementUnit.id}
                                                >
                                                    kg CO₂e/
                                                    {measurementUnit.symbol}
                                                </option>
                                            );
                                        },
                                    )
                                ) : (
                                    <option>
                                        Sin unidades de medida disponibles
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormActivityLabel
                                htmlFor="value"
                                isRequired={true}
                            >
                                Valor de emisión
                            </FormActivityLabel>
                            <input
                                type="number"
                                min={0}
                                step={0.000001}
                                className="p-2 border rounded-lg focus:outline-emerald-600"
                                value={data.value}
                                onChange={(e) =>
                                    setData("value", e.target.value)
                                }
                                name="value"
                                id="value"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormActivityLabel
                                htmlFor="valid_from"
                                isRequired={true}
                            >
                                Valido desde
                            </FormActivityLabel>
                            <input
                                type="date"
                                className="resize-none p-2 border rounded-lg focus:outline-emerald-600"
                                name="valid_from"
                                id="valid_from"
                                min="1930-01-01"
                                value={data.valid_from}
                                onChange={(e) =>
                                    setData("valid_from", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormActivityLabel htmlFor="valid_until">
                                Valido hasta
                            </FormActivityLabel>
                            <input
                                type="date"
                                className="resize-none p-2 border rounded-lg focus:outline-emerald-600"
                                name="valid_until"
                                id="valid_until"
                                min="1930-01-01"
                                value={data.valid_until ?? ""}
                                onChange={(e) =>
                                    setData("valid_until", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2 col-span-full">
                            <FormActivityLabel
                                htmlFor="source"
                                isRequired={true}
                            >
                                Fuente bibliográfica
                            </FormActivityLabel>
                            <input
                                type="text"
                                className="p-2 border rounded-lg focus:outline-emerald-600"
                                name="source"
                                id="source"
                                value={data.source}
                                onChange={(e) =>
                                    setData("source", e.target.value)
                                }
                                placeholder="Ej. UPME, 2024"
                            />
                        </div>
                    </div>

                    <DialogFooter
                        className={"mt-6 items-center sm:justify-between"}
                    >
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={data.active}
                                onCheckedChange={(checked) =>
                                    setData("active", checked)
                                }
                                className="data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-slate-300"
                                id={"active"}
                            />
                            <FormActivityLabel
                                htmlFor="active"
                                className="transition-all"
                            >
                                {" "}
                                {data.active ? "Activo" : "Inactivo"}
                            </FormActivityLabel>
                        </div>

                        <div className="flex gap-2 items-center">
                            <DialogClose asChild>
                                <Button
                                    className={
                                        "cursor-pointer p-2 text-[14px] h-full"
                                    }
                                    variant="outline"
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <button
                                className="p-2 text-white h-full bg-emerald-700 font-medium text-[14px] rounded-lg cursor-pointer transition-colors hover:bg-emerald-800"
                                type="submit"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
