export interface Props {
    children: React.ReactNode;
}

export type TStatus = "ACTIVE" | "INACTIVE";

export interface ICollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ICollection | null;
}

export interface ICategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ICategory | null;
}

export interface IProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: IProduct | null;
}

export interface ICollection {
    id: string;
    name: string;
    path: string;
    banner: string;
    views: number;
    status: "ACTIVE" | "INACTIVE";
    categories: ICategory[];
    createdAt: string;
    updatedAt: string;
}

export interface ICategory {
    id: string;
    name: string;
    path: string;
    banner: string;
    views: number;
    status: "ACTIVE" | "INACTIVE";
    products: IProduct[];
    collection?: ICollection;
    collectionId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
    path: string;
    views: number;
    status: "ACTIVE" | "INACTIVE";
    images: IProductImage[];
    available: boolean;
    description: string;
    composition: string;
    sizes: string[];
    types: string[];
    colors: IProductColor[];
    category?: ICategory;
    categoryId: string;
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
