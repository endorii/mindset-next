import { IsString, IsNotEmpty, IsInt, IsEnum, IsBoolean, IsArray } from "class-validator";

enum EStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    path: string;

    @IsString()
    banner: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    available: boolean;

    @IsString()
    // @IsNotEmpty()
    description: string;

    @IsString()
    // @IsNotEmpty()
    composition: string;

    @IsInt()
    views: number;

    @IsEnum(EStatus)
    status: EStatus;

    @IsString()
    categoryId: string;

    @IsArray()
    images: string[];
}
