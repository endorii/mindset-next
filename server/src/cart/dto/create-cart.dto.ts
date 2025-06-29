import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    size: string;

    @IsString()
    type: string;

    @IsString()
    color: string;
}
