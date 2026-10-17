import { usePage } from "@inertiajs/react";

export function authUser() {
    const { auth } = usePage().props;
    return auth;
}
