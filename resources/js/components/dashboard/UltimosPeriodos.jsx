import { ArrowDown, ArrowRight, ArrowUp, Clock } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { authUser } from "@/stores/user-store";

export default function UltimosPeriodos() {
    const limitedPeriods = authUser().periods.slice(0, 3);

    return (
        <div className="p-4 lg:col-span-2 col-span-3 h-full bg-white shadow rounded-md flex flex-col gap-2">
            <header className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Clock />
                    <p className="font-bold text-[14px]">Últimos períodos</p>
                </div>
                <a
                    className="flex items-center text-[12px] text-gray-500 transition-colors ease-in-out delay-100 hover:text-gray-700"
                    href="#"
                >
                    <ArrowRight size={20} />
                </a>
            </header>
            <Table>
                <TableHeader>
                    <TableRow className={"text-gray-500"}>
                        <TableCell>Periodo</TableCell>
                        <TableCell>
                            Total KgCO<sub>2</sub>e
                        </TableCell>
                        <TableCell>Variacion</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {limitedPeriods.map((period) => {
                        return (
                            <TableRow key={period.id}>
                                <TableCell
                                    className={"text-gray-600 font-medium"}
                                >
                                    {period.name}
                                </TableCell>
                                <TableCell className={"font-bold"}>
                                    {Number(period.total_emissions).toFixed(2)}
                                </TableCell>
                                <TableCell
                                    className={`font-semibold text-green-800 flex items-center ${Number(period.variation_percentage) > 0 ? "text-red-600" : "text-emerald-700"} `}
                                >
                                    {period.variation_percentage}%
                                    {Number(period.variation_percentage) > 0 ? (
                                        <ArrowUp size={15} />
                                    ) : (
                                        <ArrowDown size={15} />
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
