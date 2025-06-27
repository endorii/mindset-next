import { IType, ITypePayload } from "@/types/type/type.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchTypes(): Promise<IType[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/types`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання типів");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching types:", error);
        throw new Error("Помилка отримання типів");
    }
}

export async function createType(data: ITypePayload): Promise<IType> {
    try {
        const response = await fetch(`${API_BASE_URL}/types`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка створення типу");
        }

        const result = await response.json();
        console.log(result.message);
        return result.type;
    } catch (error) {
        console.error("Fetch error creating type:", error);
        throw new Error("Помилка створення типу");
    }
}

export async function editType(typeId: IType["id"], data: Partial<IType>): Promise<IType> {
    try {
        const response = await fetch(`${API_BASE_URL}/types/${typeId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося оновити тип");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error updating type:", error);
        throw new Error("Не вдалося оновити тип");
    }
}

export async function deleteType(typeId: IType["id"]): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/types/${typeId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося видалити тип");
        }
    } catch (error) {
        console.error("Fetch error deleting type:", error);
        throw new Error("Не вдалося видалити тип");
    }
}
