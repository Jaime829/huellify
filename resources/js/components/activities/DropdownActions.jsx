import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Acciones</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"mr-2"}>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <PencilIcon />
                        Editar
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                        <TrashIcon />
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
