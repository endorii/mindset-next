import { IType, ITypePayload } from "@/types/type/type.types";

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

export async function createType(data: ITypePayload): Promise<IType> {
    try {
        const res = await fetch("http://localhost:5000/api/types", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Помилка створення типу");
        const response = await res.json();

        console.log(response.message);

        return response.collection;
    } catch (error) {
        console.error("Create collection error:", error);
        throw error;
    }
}

export async function editType(typeId: IType["id"], data: Partial<IType>) {
    const res = await fetch(`http://localhost:5000/api/types/${typeId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Не вдалося оновити тип");
    }

    return res.json();
}

export async function deleteType(typeId: IType["id"]) {
    const res = await fetch(`http://localhost:5000/api/types/${typeId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Не вдалося видалити тип");
    }

    return res.json();
}
