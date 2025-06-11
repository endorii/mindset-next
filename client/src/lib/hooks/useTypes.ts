import { useQuery } from "@tanstack/react-query";
import { fetchTypes } from "../api/types.api";

export function useTypes() {
    return useQuery({
        queryKey: ["types"],
        queryFn: () => fetchTypes(),
    });
}
