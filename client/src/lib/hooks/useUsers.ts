import { IUser } from "@/types/user/user.types";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/users.api";

export function useUser(email: IUser["email"]) {
    return useQuery({
        queryKey: ["users", email],
        queryFn: () => fetchUser(email),
    });
}
