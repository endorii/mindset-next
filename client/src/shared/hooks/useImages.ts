import { useMutation } from "@tanstack/react-query";
import { uploadImage, uploadImages } from "../api/images.api";

export function useUploadImage() {
    return useMutation({
        mutationFn: uploadImage,
    });
}

export function useUploadImages() {
    return useMutation({
        mutationFn: uploadImages,
    });
}
