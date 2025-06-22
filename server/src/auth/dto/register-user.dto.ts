import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty({ message: "Username cannot be empty" })
    username: string;

    @IsEmail({}, { message: "Invalid email format" })
    @IsNotEmpty({ message: "Email cannot be empty" })
    email: string;

    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @IsNotEmpty({ message: "Password cannot be empty" })
    password: string;

    @IsNotEmpty({ message: "Phone cannot be empty" })
    phone: string;
}
