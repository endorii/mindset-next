import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../api/images.api";

export function useUploadImage() {
    return useMutation({
        mutationFn: uploadImage,
    });
}
