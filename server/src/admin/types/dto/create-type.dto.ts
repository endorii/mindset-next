import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTypeDto {
    @IsString({ message: "Назва повинна бути рядком." })
    @IsNotEmpty({ message: "Назва не може бути порожньою." })
    @MaxLength(25, { message: "Назва не може перевищувати 25 символів." })
    name: string;
}
