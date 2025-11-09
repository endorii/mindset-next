import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";

export class CreateUserDto {
    @IsString({ message: "Ім'я користувача обов'язкове" })
    @MinLength(3, { message: "Мінімальна довжина імені — 3 символи" })
    @MaxLength(15, { message: "Максимальна довжина імені — 15 символів" })
    @Matches(/^[A-Za-z0-9]+$/, {
        message: "Нікнейм має містити англійські літери або цифри",
    })
    userName: string;

    @IsEmail({}, { message: "Некоректна електронна адреса" })
    email: string;

    @IsOptional()
    @IsPhoneNumber()
    @Matches(/^\+?[\d\s-]{10,15}$/, {
        message: "Некоректний формат телефону",
    })
    phone?: string;

    @IsBoolean()
    isVerified: boolean;

    verificationToken?: string | null;

    verificationTokenExpires?: Date | null;

    @IsString({ message: "Пароль обов'язковий" })
    @MinLength(8, { message: "Пароль повинен містити щонайменше 8 символів" })
    @MaxLength(32, { message: "Пароль не повинен перевищувати 32 символи" })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
        message: "Пароль має містити літери та цифри",
    })
    password: string;
}
