import { IsHexColor, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateColorDto {
    @IsString({ message: "Color name must be a string." })
    @IsNotEmpty({ message: "Color name cannot be empty." })
    @MinLength(2, { message: "Color name must contain at least 2 characters." })
    @MaxLength(25, { message: "Color name cannot exceed 25 characters." })
    name: string;

    @IsString({ message: "HEX code must be a string." })
    @IsNotEmpty({ message: "HEX code cannot be empty." })
    @IsHexColor({ message: 'Invalid HEX color format. Example: "#FF0000" or "#FFF".' })
    hexCode: string;
}
