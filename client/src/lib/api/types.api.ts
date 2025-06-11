import { IType } from "@/types/types";

export async function fetchTypes(): Promise<IType[]> {
    try {
        const res = await fetch(`http://localhost:5000/api/types`);
        if (!res.ok) throw new Error("Помилка отримання типів");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
