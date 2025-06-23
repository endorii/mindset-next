import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsEmail({}, { message: "Invalid email format" })
    @IsNotEmpty({ message: "Email cannot be empty" })
    @IsString()
    email: string;

    @IsNotEmpty({ message: "Password cannot be empty" })
    @IsString()
    password: string;
}
