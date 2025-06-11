export interface Props {
    children: React.ReactNode;
}

export type ModalType = "add" | "edit" | "delete" | "info" | null;

export type TStatus = "ACTIVE" | "INACTIVE";

export interface ICollection {
    id: string;
    name: string;
    path: string;
    banner: string;
    views: number;
    status: TStatus;
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
    status: TStatus;
    products: IProduct[];
    collection?: ICollection;
    collectionId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISize {
    id: string;
    name: string;
}

export interface IColor {
    id: string;
    name: string;
    hexCode?: string;
}

export interface IType {
    id: string;
    name: string;
}

export interface IProductToColor {
    colorId: string;
    productId: string;
    color: IColor;
    product: IProduct;
}

export interface IProductToType {
    typeId: string;
    productId: string;
    type: IType;
    product: IProduct;
}

export interface IProductToSize {
    sizeId: string;
    productId: string;
    size: ISize;
    product: IProduct;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
    path: string;
    views: number;
    banner: string;
    status: TStatus;
    images: string[];
    available: boolean;
    description: string;
    composition: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;

    // ОБОВ'ЯЗКОВО ПОВИННІ БУТИ ЦІ ПОЛЯ ДЛЯ ВІДОБРАЖЕННЯ ЗВ'ЯЗКІВ
    productColors: IProductToColor[];
    productTypes: IProductToType[];
    productSizes: IProductToSize[];

    category?: ICategory;

    // cartItems?: ICartItem[];
    // favorites?: IFavoriteItem[];
}
export interface ICreateProductPayload {
    name: string;
    path: string;
    price: number;
    available: boolean;
    description: string;
    composition: string;
    categoryId: string;
    status: TStatus;
    views: number;
    banner: string;
    images: string[];

    colorIds?: string[];
    sizeIds?: string[];
    typeIds?: string[];
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
}

export interface IFavoriteItem {
    productPath: IProduct["path"];
}

export interface IIconsProps {
    className?: string;
}
