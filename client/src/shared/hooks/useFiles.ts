import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadBanner, uploadImages } from "../api/files.api";
import { BannerEntity, ImagesEntity } from "../types/types";

export function useUploadBanner() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            type,
            entityId,
            banner,
            includedIn,
        }: {
            type: BannerEntity;
            entityId: string;
            banner: File;
            includedIn: string | null;
        }) => uploadBanner(type, entityId, banner),
        onSuccess: (_, variables) => {
            const keyMap: Record<string, string> = {
                collection: "collections",
                category: "categories",
                product: "products",
            };

            queryClient.invalidateQueries({
                queryKey: [keyMap[variables.type], variables.includedIn],
            });
        },
    });
}

export function useUploadImages() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            type,
            entityId,
            images,
        }: {
            type: ImagesEntity;
            entityId: string;
            images: File[];
        }) => uploadImages(type, entityId, images),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [variables.type, variables.entityId],
            });
        },
    });
}
