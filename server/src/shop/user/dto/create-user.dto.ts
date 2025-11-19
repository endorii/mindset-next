import { Transform } from "class-transformer";
import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";

export class CreateUserDto {
    @IsString({ message: "Username is required" })
    @MinLength(3, { message: "Username must be at least 3 characters long" })
    @MaxLength(15, { message: "Username must not exceed 15 characters" })
    @Matches(/^[A-Za-z0-9]+$/, {
        message: "Username can contain only English letters or numbers",
    })
    userName: string;

    @IsEmail({}, { message: "Invalid email address" })
    email: string;

    @IsOptional()
    @Transform(({ value }: { value: string }) => (value === "" ? undefined : value))
    @Matches(/^\+?[\d\s-]{10,15}$/, {
        message: "Invalid phone number format",
    })
    phone?: string;

    @IsBoolean()
    isVerified: boolean;

    verificationToken?: string | null;

    verificationTokenExpires?: Date | null;

    @IsString({ message: "Password is required" })
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @MaxLength(32, { message: "Password must not exceed 32 characters" })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain both letters and numbers",
    })
    password: string;
}
