import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    size: string;

    @IsString()
    type: string;

    @IsString()
    color: string;
}
