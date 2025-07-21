import { INovaPostDataObj } from "@/features/orders/types/orders.types";

const API_BASE_URL = "http://localhost:5000/api";
export async function fetchAreas(): Promise<INovaPostDataObj[]> {
    const res = await fetch(`${API_BASE_URL}/nova-post/areas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Не вдалося завантажити області");
    return res.json();
}

export async function fetchCities(areaRef: string): Promise<INovaPostDataObj[]> {
    const res = await fetch(`${API_BASE_URL}/nova-post/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ areaRef }),
    });
    if (!res.ok) throw new Error("Не вдалося завантажити міста");
    return res.json();
}

export async function fetchWarehouses(cityRef: string): Promise<INovaPostDataObj[]> {
    const res = await fetch(`${API_BASE_URL}/nova-post/warehouses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityRef }),
    });
    if (!res.ok) throw new Error("Не вдалося завантажити відділення");
    return res.json();
}
