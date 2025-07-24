import { IsString, IsNotEmpty, IsInt, IsEnum, Min } from "class-validator";

export enum CollectionStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export class CreateCollectionDto {
    @IsString()
    @IsNotEmpty({ message: "Назва колекції не може бути порожньою" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Шлях не може бути порожнім" })
    path: string;

    @IsString()
    @IsNotEmpty({ message: "Опис не може бути порожнім" })
    description: string;

    @IsString()
    @IsNotEmpty({ message: "Банер повинен бути вказаний" })
    banner: string;

    @IsInt({ message: "Кількість переглядів має бути цілим числом" })
    @Min(0, { message: "Кількість переглядів не може бути від’ємною" })
    views: number;

    @IsEnum(CollectionStatus, { message: "Статус повинен бути ACTIVE або INACTIVE" })
    status: CollectionStatus;
}
