import { authUser } from "@/stores/user-store";
import { IconEmailStamp, IconUserFilled } from "@tabler/icons-react";
import { Calendar, Mail, User, UserRound } from "lucide-react";
import PersonalInformationField from "./PersonalInformationField";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

export default function PersonalInformation() {
    const user = authUser().user;

    const fecha = new Date(user.created_at);
    const opcionesFecha = { day: "2-digit", month: "short", year: "numeric" };

    return (
        <div className="col-span-1 lg:col-span-3 rounded-md flex flex-col gap-2 bg-white shadow p-4">
            <div className="flex gap-2 items-center">
                <div className="w-10 h-10 rounded-full bg-green-600/10 flex items-center justify-center text-emerald-800">
                    <IconUserFilled />
                </div>
                <p className="font-bold">Información personal</p>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <PersonalInformationField
                        field={"Nombre completo"}
                        value={user.name}
                        icon={User}
                    />
                    <PersonalInformationField
                        field={"Correo electrónico"}
                        value={user.email}
                        icon={Mail}
                    />
                    <PersonalInformationField
                        field={"Rol"}
                        value={user.rol === "user" ? "Usuario" : "Admin"}
                        icon={UserRound}
                    />
                    <PersonalInformationField
                        field={"Fecha de registro"}
                        value={fecha.toLocaleDateString("es-ES", opcionesFecha)}
                        icon={Calendar}
                    />
                </TableBody>
            </Table>
        </div>
    );
}
