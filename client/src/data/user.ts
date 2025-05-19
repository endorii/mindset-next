import { IUser } from "@/types/types";

export const user: IUser = {
    username: "Петро Петренко",
    email: "user@example.com",
    password: "hashed_password_here",
    phone: "+380991234567",
    shippingAddress: {
        recipient: "Петро (Петрович) Петренко",
        country: "Україна",
        region: "Київська область",
        city: "Київ",
        postalCode: "01001",
        street: "вул. Хрещатик",
        building: "22",
        apartment: "15",
    },
    cart: [
        {
            productPath: "tshirt1",
            quantity: 2,
            size: "M",
            color: "чорний",
        },
        {
            productPath: "hoodie247_1",
            quantity: 1,
            size: "L",
            color: "білий",
        },
        {
            productPath: "tshirt1",
            quantity: 2,
            size: "M",
            color: "чорний",
        },
        {
            productPath: "hoodie247_1",
            quantity: 1,
            size: "L",
            color: "білий",
        },
    ],
    favorites: [
        {
            productPath: "zipout1",
        },
        {
            productPath: "tshirtmen2",
        },
    ],
};
