import { useQuery } from "@tanstack/react-query";
import { fetchShopSearchData } from "../api/shopSearch.api";

export function useShopSearch(searchValue: string) {
    return useQuery({
        queryKey: ["shop", "search", searchValue],
        queryFn: () => fetchShopSearchData(searchValue),
        enabled: !!searchValue.trim(),
    });
}
