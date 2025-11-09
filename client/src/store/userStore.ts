import { IUser } from "@/features/shop/user-info/types/user.types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
    user: IUser | null | undefined;
    accessToken: string | null;
    setUser: (user: IUser | null, accessToken: string | null) => void;
    setAccessToken: (token: string | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    devtools((set) => ({
        user: null,
        accessToken: null,
        setUser: (user, accessToken) => set({ user, accessToken }),
        setAccessToken: (accessToken) => set({ accessToken }),
        clearUser: () => set({ user: null, accessToken: null }),
    }))
);
