import { IsString, IsNotEmpty, IsInt, IsEnum } from "class-validator";

enum CollectionStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export class CreateCollectionDto {
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

    @IsEnum(CollectionStatus)
    status: CollectionStatus;
}
