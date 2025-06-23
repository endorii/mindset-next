import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Username cannot be empty" })
    @IsString()
    username: string;

    @IsEmail({}, { message: "Invalid email format" })
    @IsNotEmpty({ message: "Email cannot be empty" })
    @IsString()
    email: string;

    @IsNotEmpty({ message: "Phone cannot be empty" })
    @IsString()
    phone: string;

    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @IsNotEmpty({ message: "Password cannot be empty" })
    @IsString()
    password: string;
}
