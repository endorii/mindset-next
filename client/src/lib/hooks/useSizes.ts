import { useQuery } from "@tanstack/react-query";
import { fetchSizes } from "../api/sizes.api";

export function useSizes() {
    return useQuery({
        queryKey: ["sizes"],
        queryFn: () => fetchSizes(),
    });
}
