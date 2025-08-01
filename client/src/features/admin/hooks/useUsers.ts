import { useQuery } from "@tanstack/react-query";

import { fetchAllUsers } from "../api/users.api";

export function useUsers() {
    return useQuery({
        queryKey: ["allUsers"],
        queryFn: () => fetchAllUsers(),
    });
}
