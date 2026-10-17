import { usePage } from "@inertiajs/react";

export function authUser() {
    const { user } = usePage().props;
    return user;
}
