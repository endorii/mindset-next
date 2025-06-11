import { ISize } from "@/types/types";

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
