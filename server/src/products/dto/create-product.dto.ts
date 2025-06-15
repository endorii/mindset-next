import {
    IsString,
    IsNotEmpty,
    IsInt,
    IsEnum,
    IsBoolean,
    IsArray,
    IsOptional,
    IsDefined,
} from "class-validator";

export enum EStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export class CreateProductDto {
    @IsString({ message: "Назва повинна бути рядком." })
    @IsNotEmpty({ message: "Назва не може бути порожньою." })
    name: string;

    @IsString({ message: "Шлях повинен бути рядком." })
    @IsNotEmpty({ message: "Шлях не може бути порожнім." })
    path: string;

    @IsString({ message: "Банер повинен бути рядком." })
    @IsNotEmpty({ message: "Банер не може бути порожнім." })
    banner: string;

    @IsInt({ message: "Ціна повинна бути цілим числом." })
    @IsDefined({ message: "Ціна повинна бути визначена." })
    price: number;

    @IsBoolean({ message: "Доступність повинна бути логічним значенням." })
    @IsDefined({ message: "Доступність повинна бути визначена." })
    available: boolean;

    @IsString({ message: "Опис повинен бути рядком." })
    @IsNotEmpty({ message: "Опис не може бути порожнім." })
    description: string;

    @IsString({ message: "Склад повинен бути рядком." })
    @IsNotEmpty({ message: "Склад не може бути порожнім." })
    composition: string;

    @IsInt({ message: "Перегляди повинні бути цілим числом." })
    @IsDefined({ message: "Перегляди повинні бути визначені." })
    views: number;

    @IsEnum(EStatus, { message: "Недійсний статус продукту." })
    status: EStatus;

    @IsString({ message: "ID категорії повинен бути рядком." })
    @IsNotEmpty({ message: "ID категорії не може бути порожнім." })
    categoryId: string;

    @IsArray({ message: "Зображення повинні бути масивом." })
    @IsString({ each: true, message: "Кожен елемент у масиві зображень повинен бути рядком." })
    images: string[];

    @IsOptional()
    @IsArray({ message: "Кольори повинні бути масивом ID." })
    @IsString({ each: true, message: "Кожен ID кольору повинен бути рядком." })
    colorIds?: string[];

    @IsOptional()
    @IsArray({ message: "Розміри повинні бути масивом ID." })
    @IsString({ each: true, message: "Кожен ID розміру повинен бути рядком." })
    sizeIds?: string[];

    @IsOptional()
    @IsArray({ message: "Типи повинні бути масивом ID." })
    @IsString({ each: true, message: "Кожен ID типу повинен бути рядком." })
    typeIds?: string[];
}
