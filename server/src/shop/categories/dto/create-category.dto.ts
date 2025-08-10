import { IsString, IsNotEmpty, IsInt, IsEnum, Min } from "class-validator";

export enum EStatus {
    ACTIVE = "Активно",
    NOTACTIVE = "Не активно",
}

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({ message: "Назва категорії є обов'язковою" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Шлях є обов'язковим" })
    path: string;

    @IsString()
    @IsNotEmpty({ message: "Банер повинен бути вказаний" })
    banner: string;

    @IsString()
    @IsNotEmpty({ message: "Опис повинен бути вказаний" })
    description: string;

    @IsInt({ message: "Перегляди мають бути цілим числом" })
    @Min(0, { message: "Перегляди не можуть бути від’ємними" })
    views: number;

    @IsEnum(EStatus, { message: "Статус повинен бути Активно або Не активно" })
    status: EStatus;

    @IsString()
    collectionId: string;
}
