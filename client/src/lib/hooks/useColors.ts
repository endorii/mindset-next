import { useQuery } from "@tanstack/react-query";
import { fetchColors } from "../api/colors.api";

export function useColors() {
    return useQuery({
        queryKey: ["colors"],
        queryFn: () => fetchColors(),
    });
}
