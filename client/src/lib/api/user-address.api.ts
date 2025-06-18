import { IUser, IUserShippingAdress } from "@/types/user/user.types";

export async function createUserAddress(data: IUserShippingAdress) {
    try {
        const res = await fetch(`http://localhost:5000/api/user-address`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Помилка створення адреси доставки");

        return res.json();
    } catch (error) {
        console.error("Create collection error:", error);
        throw error;
    }
}

export async function editUserAddress(userId: IUser["id"], data: Partial<IUserShippingAdress>) {
    const res = await fetch(`http://localhost:5000/api/user-address/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Не вдалося оновити адресу доставки");
    }

    return res.json();
}
