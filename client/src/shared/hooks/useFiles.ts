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
            const listMap = {
                collection: ["collections"],
                category: ["categories", variables.includedIn],
                product: ["products", variables.includedIn],
            };

            const adminListKey = ["admin", ...listMap[variables.type]];
            const shopListKey = ["shop", ...listMap[variables.type]];

            // invalidate списки
            queryClient.invalidateQueries({ queryKey: adminListKey });
            queryClient.invalidateQueries({ queryKey: shopListKey });

            // invalidate детальну сторінку
            queryClient.invalidateQueries({
                queryKey: ["admin", variables.type, variables.entityId],
            });
            queryClient.invalidateQueries({
                queryKey: ["shop", variables.type, variables.entityId],
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
            // invalidate детальні сторінки
            queryClient.invalidateQueries({
                queryKey: ["admin", variables.type, variables.entityId],
            });
            queryClient.invalidateQueries({
                queryKey: ["shop", variables.type, variables.entityId],
            });
        },
    });
}
