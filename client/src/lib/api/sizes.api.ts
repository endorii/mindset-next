import { ISize, ISizePayload } from "@/types/size/size.types";

export async function fetchSizes(): Promise<ISize[]> {
    try {
        const res = await fetch(`http://localhost:5000/api/sizes`);
        if (!res.ok) throw new Error("Помилка отримання розмірів");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function createSize(data: ISizePayload): Promise<ISize> {
    try {
        const res = await fetch("http://localhost:5000/api/sizes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Помилка створення розміру");
        const response = await res.json();

        console.log(response.message);

        return response.collection;
    } catch (error) {
        console.error("Create collection error:", error);
        throw error;
    }
}

export async function deleteSize(sizeId: ISize["id"]) {
    const res = await fetch(`http://localhost:5000/api/sizes/${sizeId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Не вдалося видалити розмір");
    }

    return res.json();
}
