import { IsString, IsInt, Min, Max, IsOptional, IsArray, IsUrl, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty({ message: "Текст відгуку не може бути порожнім." })
    content: string;

    @IsInt()
    @Min(1, { message: "Рейтинг має бути не менше 1." })
    @Max(5, { message: "Рейтинг має бути не більше 5." })
    @Type(() => Number)
    rating: number;

    @IsString()
    @IsNotEmpty({ message: "Поле електронної пошти не може бути пустим" })
    senderEmail: string;

    @IsString()
    @IsNotEmpty({ message: "Поле імені та прізвища відправника не може бути пустим" })
    senderName: string;

    @IsString({ message: "productId має бути рядком." })
    @IsNotEmpty({ message: "productId є обовʼязковим." })
    productId: string;

    @IsString({ message: "orderItemId має бути рядком." })
    @IsNotEmpty({ message: "orderItemId є обовʼязковим." })
    orderItemId: string;

    @IsOptional()
    @IsArray({ message: "Зображення повинні бути масивом." })
    @IsString({ each: true, message: "Кожне зображення має бути рядком URL." })
    @IsUrl(
        {},
        { each: true, message: "Кожен елемент у масиві зображень має бути валідною URL-адресою." }
    )
    images?: string[];
}
