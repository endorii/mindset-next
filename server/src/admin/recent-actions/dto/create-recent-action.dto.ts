import { IsNotEmpty, IsString } from "class-validator";

export class CreateRecentActionDto {
    @IsString({ message: "Action must be a string." })
    @IsNotEmpty({ message: "Action cannot be empty." })
    action: string;
}
