import { TableCell, TableRow } from "../ui/table";

export default function PersonalInformationField({ field, value, icon: Icon }) {
    return (
        <>
            <TableRow>
                <TableCell className={"text-gray-500"}>
                    <Icon />
                </TableCell>
                <TableCell className={"text-[14px] text-gray-500 font-medium"}>
                    {field}
                </TableCell>
                <TableCell className={"font-medium break-all"}>{value}</TableCell>
            </TableRow>
        </>
    );
}
