import { create } from "zustand";


export const userStore = create((set) => ({
    userSaved: null,

    userSave: (user) =>
        set({
            userSaved: user,
        }),

    reiniciarEstado: () =>
        set({
            userSaved: null,
        }),
}));
