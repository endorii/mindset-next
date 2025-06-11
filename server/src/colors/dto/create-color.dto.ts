import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsHexColor,
    MaxLength,
    MinLength,
} from "class-validator";

export class CreateColorDto {
    @IsString({ message: "Назва кольору повинна бути рядком." })
    @IsNotEmpty({ message: "Назва кольору не може бути порожньою." })
    @MinLength(2, { message: "Назва кольору повинна містити щонайменше 2 символи." })
    @MaxLength(50, { message: "Назва кольору не може перевищувати 50 символів." })
    name: string;

    @IsOptional()
    @IsString({ message: "HEX-код повинен бути рядком." })
    @IsHexColor({ message: 'Недійсний формат HEX-коду кольору. Приклад: "#FF0000" або "#FFF".' })
    hexCode?: string;
}
