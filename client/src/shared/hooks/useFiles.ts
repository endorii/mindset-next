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
            includedIn?: string;
        }) => uploadBanner(type, entityId, banner),

        onSuccess: (_, variables) => {
            const { type, entityId, includedIn } = variables;

            if (type === "collection") {
                queryClient.invalidateQueries({ queryKey: ["shop", "collections"] });
                queryClient.invalidateQueries({ queryKey: ["admin", "collections"] });
                queryClient.invalidateQueries({
                    queryKey: ["admin", "collections", entityId],
                });
            }

            if (type === "category") {
                queryClient.invalidateQueries({
                    queryKey: ["admin", "categories", entityId],
                });

                if (includedIn) {
                    queryClient.invalidateQueries({
                        queryKey: ["admin", "collections", includedIn, "categories"],
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["admin", "collections", includedIn],
                    });
                }
            }

            if (type === "product") {
                queryClient.invalidateQueries({
                    queryKey: ["admin", "products", entityId],
                });

                if (includedIn) {
                    queryClient.invalidateQueries({
                        queryKey: ["admin", "categories", includedIn, "products"],
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["admin", "categories", includedIn],
                    });
                }
            }
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
            includedIn,
        }: {
            type: ImagesEntity;
            entityId: string;
            images: File[];
            includedIn?: string;
        }) => uploadImages(type, entityId, images),

        onSuccess: (_, variables) => {
            // invalidate детальні сторінки
            queryClient.invalidateQueries({
                queryKey: ["admin", "categories", variables.includedIn, "products"],
            });
            queryClient.invalidateQueries({
                queryKey: ["admin", "categories", variables.includedIn],
            });
        },
    });
}
