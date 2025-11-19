import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSizeDto {
    @IsString({ message: "Name must be a string." })
    @IsNotEmpty({ message: "Name cannot be empty." })
    @MaxLength(25, { message: "Name cannot exceed 25 characters." })
    name: string;
}
