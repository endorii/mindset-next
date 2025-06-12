import { IColor, IColorPayload } from "@/types/color/color.types";

export async function fetchColors(): Promise<IColor[]> {
    try {
        const res = await fetch(`http://localhost:5000/api/colors`);
        if (!res.ok) throw new Error("Помилка отримання кольорів");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function createColor(data: IColorPayload): Promise<IColor> {
    try {
        const res = await fetch("http://localhost:5000/api/colors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Помилка створення кольору");
        const response = await res.json();

        console.log(response.message);

        return response.collection;
    } catch (error) {
        console.error("Create collection error:", error);
        throw error;
    }
}

export async function deleteColor(colorId: IColor["id"]) {
    const res = await fetch(`http://localhost:5000/api/colors/${colorId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Не вдалося видалити колір");
    }

    return res.json();
}
