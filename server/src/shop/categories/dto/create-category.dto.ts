import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({ message: "Category name is required" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Path is required" })
    path: string;

    @IsString()
    @IsNotEmpty({ message: "Banner is required" })
    banner: string;

    @IsString()
    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @IsBoolean({ message: "Status must be true/false" })
    status: boolean;

    @IsString()
    @IsNotEmpty({ message: "Collection ID is required" })
    collectionId: string;
}
