export async function uploadImage(file: File): Promise<{ path: string }> {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("http://localhost:5000/api/upload/image", {
            method: "POST",
            body: formData,
        });
        if (!res.ok) throw new Error("Помилка завантаження зображення");
        return res.json();
    } catch (error) {
        console.error("Upload image error:", error);
        throw error;
    }
}

export async function uploadImages(files: File[]): Promise<{ paths: string[] }> {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        const res = await fetch("http://localhost:5000/api/upload/images", {
            method: "POST",
            body: formData,
        });
        if (!res.ok) throw new Error("Помилка завантаження зображення");
        return res.json();
    } catch (error) {
        console.error("Upload image error:", error);
        throw error;
    }
}
