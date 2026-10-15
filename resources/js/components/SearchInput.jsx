import { IconSearch } from "@tabler/icons-react";

export default function SearchInput() {
    return (
        <div className="hidden sm:flex sm:gap-2 sm:p-2 sm:bg-gray-100/90 sm:rounded-md sm:items-center">
            <IconSearch className="size-5 text-gray-500" />
            <input
                className="appearance-none focus:outline-none"
                type="text"
                placeholder="Buscar..."
            />
        </div>
    );
}
