import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ICategory, ICollection } from "@/types/types";
import { fetchCategory } from "../api/categories.api";

export function useCategory(collectionPath: ICollection["path"], categoryPath: ICategory["path"]) {
    return useQuery({
        queryKey: ["collections", collectionPath, "categories", categoryPath],
        queryFn: () => fetchCategory(collectionPath, categoryPath),
    });
}
