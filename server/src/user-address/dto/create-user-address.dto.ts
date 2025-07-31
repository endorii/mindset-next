import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserAddressDto {
    @IsString({ message: "ID користувача повинен бути рядком." })
    @IsNotEmpty({ message: "ID користувача не може бути порожнім." })
    userId: string;

    @IsString({ message: "Ім'я отримувача повинно бути рядком." })
    @IsNotEmpty({ message: "Ім'я отримувача не може бути порожнім." })
    recipient: string;

    @IsString({ message: "Країна повинна бути рядком." })
    @IsNotEmpty({ message: "Країна не може бути порожньою." })
    country: string;

    @IsString({ message: "Область повинна бути рядком." })
    @IsNotEmpty({ message: "Область не може бути порожньою." })
    region: string;

    @IsString({ message: "Місто повинно бути рядком." })
    @IsNotEmpty({ message: "Місто не може бути порожнім." })
    city: string;

    @IsString({ message: "Поштовий індекс повинен бути рядком." })
    @IsNotEmpty({ message: "Поштовий індекс не може бути порожнім." })
    @Matches(/^\d{5}$/, {
        message: "Поштовий індекс повинен містити рівно 5 цифр.",
    })
    postalCode: string;

    @IsString({ message: "Вулиця повинна бути рядком." })
    @IsNotEmpty({ message: "Вулиця не може бути порожньою." })
    street: string;

    @IsString({ message: "Номер будинку повинен бути рядком." })
    @IsNotEmpty({ message: "Номер будинку не може бути порожнім." })
    building: string;

    @IsString({ message: "Номер квартири повинен бути рядком." })
    @IsNotEmpty({ message: "Номер квартири не може бути порожнім." })
    apartment: string;
}
