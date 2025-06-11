import { IColor } from "@/types/types";

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
