import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSizeDto {
    @IsString({ message: "Назва повинна бути рядком." })
    @IsNotEmpty({ message: "Назва не може бути порожньою." })
    @MaxLength(10, { message: "Назва не може перевищувати 10 символів." })
    name: string;
}
