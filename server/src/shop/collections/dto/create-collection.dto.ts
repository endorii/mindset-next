import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum CollectionStatus {
    ACTIVE = "Active",
    NOTACTIVE = "Not Active",
}

export class CreateCollectionDto {
    @IsString()
    @IsNotEmpty({ message: "Collection name cannot be empty" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Path cannot be empty" })
    path: string;

    @IsString()
    @IsNotEmpty({ message: "Description cannot be empty" })
    description: string;

    @IsString()
    @IsNotEmpty({ message: "Banner must be provided" })
    banner: string;

    @IsEnum(CollectionStatus, { message: "Status must be 'Active' or 'Not Active'" })
    status: CollectionStatus;
}
