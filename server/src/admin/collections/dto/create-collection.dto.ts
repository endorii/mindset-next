import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

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

    @IsBoolean({ message: "Visibility must be true/false" })
    isVisible: boolean;
}
