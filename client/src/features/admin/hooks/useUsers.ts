import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../api/users.api";

export function useAllUsers() {
    return useQuery({
        queryKey: ["allUsers"],
        queryFn: () => fetchAllUsers(),
        retry: false,
    });
}
