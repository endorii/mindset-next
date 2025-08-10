import { IsString, IsNotEmpty } from "class-validator";

export class CreateRecentActionDto {
    @IsString()
    @IsNotEmpty({ message: 'Поле "action" не може бути порожнім' })
    action: string;
}
