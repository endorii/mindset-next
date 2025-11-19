import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export enum CollectionStatus {
    ACTIVE = "Active",
    NOTACTIVE = "Not active",
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

    // @IsString()
    // @IsNotEmpty({ message: "Banner must be provided" })
    // banner: string;

    @IsInt({ message: "Views count must be an integer" })
    @Min(0, { message: "Views count cannot be negative" })
    views: number;

    @IsEnum(CollectionStatus, { message: "Status must be Active or Not active" })
    status: CollectionStatus;
}
