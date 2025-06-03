import { IsString, IsNotEmpty, IsInt, IsEnum } from "class-validator";

enum EStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    path: string;

    @IsString()
    @IsNotEmpty()
    banner: string;

    @IsInt()
    views: number;

    @IsEnum(EStatus)
    status: EStatus;

    @IsString()
    collectionId: string;
}
