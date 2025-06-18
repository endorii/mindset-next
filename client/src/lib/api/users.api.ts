import { IUser } from "@/types/user/user.types";

export async function fetchUser(email: string): Promise<IUser> {
    try {
        const res = await fetch(`http://localhost:5000/api/users/${email}`);
        if (!res.ok) throw new Error("Помилка отримання юзера");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function editUser(id: string, data: Partial<IUser>): Promise<IUser> {
    try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Не вдалося оновити дані про юзера");
        }
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
