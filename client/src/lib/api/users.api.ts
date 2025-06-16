import { IUser } from "@/types/user/user.types";

export async function fetchUser(email: string): Promise<IUser> {
    try {
        const res = await fetch(`http://localhost:5000/api/users/${email}`);
        if (!res.ok) throw new Error("Помилка отримання колекції");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
