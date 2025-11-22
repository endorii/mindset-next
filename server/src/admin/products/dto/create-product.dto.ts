import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";

export class CreateProductDto {
    @IsString({ message: "Name must be a string." })
    @IsNotEmpty({ message: "Name cannot be empty." })
    name: string;

    @IsString({ message: "Path must be a string." })
    @IsNotEmpty({ message: "Path cannot be empty." })
    path: string;

    @IsInt({ message: "Price must be an integer." })
    @IsDefined({ message: "Price must be defined." })
    price: number;

    @IsInt({ message: "Old price must be an integer." })
    @IsDefined({ message: "Old price must be defined." })
    oldPrice: number;

    @IsBoolean({ message: "Availability must be true/false." })
    available: boolean;

    @IsString({ message: "Description must be a string." })
    @IsNotEmpty({ message: "Description cannot be empty." })
    description: string;

    @IsString({ message: "Composition must be a string." })
    @IsNotEmpty({ message: "Composition cannot be empty." })
    composition: string;

    @IsBoolean({ message: "Status must be true/false." })
    status: boolean;

    @IsString({ message: "Category ID must be a string." })
    @IsNotEmpty({ message: "Category ID cannot be empty." })
    categoryId: string;

    @IsOptional()
    @IsArray({ message: "Colors must be an array of IDs." })
    @IsString({ each: true, message: "Each color ID must be a string." })
    colorIds?: string[];

    @IsOptional()
    @IsArray({ message: "Sizes must be an array of IDs." })
    @IsString({ each: true, message: "Each size ID must be a string." })
    sizeIds?: string[];

    @IsOptional()
    @IsArray({ message: "Types must be an array of IDs." })
    @IsString({ each: true, message: "Each type ID must be a string." })
    typeIds?: string[];
}
