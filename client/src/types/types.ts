export interface Props {
    children: React.ReactNode;
}

export interface ICollection {
    id: string;
    name: string;
    path: string;
    banner: string;
    categories: ICategory[];
    createdAt: string;
    updatedAt: string;
}

export interface ICategory {
    id: string;
    name: string;
    path: string;
    banner: string;
    products: IProduct[];
    collection?: ICollection;
    createdAt: string;
    updatedAt: string;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
    path: string;
    images: IProductImage[];
    available: boolean;
    description: string;
    composition: string;
    sizes: string[];
    types: string[];
    colors: IProductColor[];
    category?: ICategory;
    createdAt: string;
    updatedAt: string;
}

export interface IProductImage {
    id: string;
    url: string;
    productId: string;
}

export interface IProductColor {
    id: string;
    value: string;
    productId: string;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    shippingAddress: IUserShippingAdress;
    cart: ICartItem[];
    favorites: IFavoriteItem[];
    createdAt: string;
    updatedAt: string;
}

export interface IUserShippingAdress {
    recipient: string;
    country: string;
    region: string;
    city: string;
    postalCode: string;
    street: string;
    building: string;
    apartment: string;
}

export interface ICartItem {
    productPath: IProduct["path"];
    quantity: number;
    size: string;
    color: string;
}

export interface IFavoriteItem {
    productPath: IProduct["path"];
}

export interface IIconsProps {
    className?: string;
}
