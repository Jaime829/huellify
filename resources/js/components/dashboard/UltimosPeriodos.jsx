import { ArrowRight, Clock } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function UltimosPeriodos() {
    return (
        <section className="p-4 col-span-2 bg-white shadow rounded-md flex flex-col gap-2">
            <header className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Clock />
                    <p className="font-bold text-[14px]">Últimos períodos</p>
                </div>
                <a
                    className="flex items-center text-[12px] text-gray-500 transition-colors ease-in-out delay-100 hover:text-gray-700"
                    href="#"
                >
                    Ver historial <ArrowRight size={15} />
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
                    <TableRow>
                        <TableCell className={"text-gray-600 font-medium"}>
                            Septiembre 2026
                        </TableCell>
                        <TableCell className={"font-bold"}>245.8</TableCell>
                        <TableCell className={"font-semibold text-green-800"}>
                            12%
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    );
}
