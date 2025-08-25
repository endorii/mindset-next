import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../api/users.api";

export function useAllUsers() {
    return useSuspenseQuery({
        queryKey: ["allUsers"],
        queryFn: () => fetchAllUsers(),
    });
}
