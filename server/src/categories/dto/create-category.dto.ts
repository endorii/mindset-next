import { IsString, IsNotEmpty, IsInt, IsEnum, Min } from "class-validator";

export enum EStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
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

    @IsInt({ message: "Перегляди мають бути цілим числом" })
    @Min(0, { message: "Перегляди не можуть бути від’ємними" })
    views: number;

    @IsEnum(EStatus, { message: "Статус повинен бути ACTIVE або INACTIVE" })
    status: EStatus;

    @IsString()
    collectionId: string;
}
