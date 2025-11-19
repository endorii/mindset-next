import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export enum EStatus {
    ACTIVE = "Active",
    NOTACTIVE = "Not active",
}

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({ message: "Category name is required" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Path is required" })
    path: string;

    // @IsString()
    // @IsNotEmpty({ message: "Banner must be provided" })
    // banner: string;

    @IsString()
    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @IsInt({ message: "Views must be an integer" })
    @Min(0, { message: "Views cannot be negative" })
    views: number;

    @IsEnum(EStatus, { message: "Status must be Active or Not active" })
    status: EStatus;

    @IsString()
    collectionId: string;
}
