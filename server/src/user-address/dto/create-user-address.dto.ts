import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserAddressDto {
    @IsString()
    @IsNotEmpty({ message: "Назва не може бути порожньою." })
    userId: string;

    @IsString({ message: "Назва повинна бути рядком." })
    @IsNotEmpty({ message: "Назва не може бути порожньою." })
    recipient: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    region: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5, { message: "Поштовий індекс не може перевищувати 5 символів." })
    postalCode: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    building: string;

    @IsString()
    @IsNotEmpty()
    apartment: string;
}
