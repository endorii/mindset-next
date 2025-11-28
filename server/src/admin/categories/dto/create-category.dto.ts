import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({ message: "Category name is required" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Path is required" })
    path: string;

    @IsString()
    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @IsBoolean({ message: "Visibility must be true/false" })
    isVisible: boolean;

    @IsString()
    collectionId: string;
}
