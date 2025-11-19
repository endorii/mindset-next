import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserAddressDto {
    @IsString({ message: "User ID must be a string." })
    @IsNotEmpty({ message: "User ID cannot be empty." })
    userId: string;

    @IsString({ message: "Recipient name must be a string." })
    @IsNotEmpty({ message: "Recipient name cannot be empty." })
    recipient: string;

    @IsString({ message: "Country must be a string." })
    @IsNotEmpty({ message: "Country cannot be empty." })
    country: string;

    @IsString({ message: "Region must be a string." })
    @IsNotEmpty({ message: "Region cannot be empty." })
    region: string;

    @IsString({ message: "City must be a string." })
    @IsNotEmpty({ message: "City cannot be empty." })
    city: string;

    @IsString({ message: "Postal code must be a string." })
    @IsNotEmpty({ message: "Postal code cannot be empty." })
    @Matches(/^\d{5}$/, {
        message: "Postal code must be exactly 5 digits.",
    })
    postalCode: string;

    @IsString({ message: "Street must be a string." })
    @IsNotEmpty({ message: "Street cannot be empty." })
    street: string;

    @IsString({ message: "Building number must be a string." })
    @IsNotEmpty({ message: "Building number cannot be empty." })
    building: string;

    @IsString({ message: "Apartment number must be a string." })
    @IsNotEmpty({ message: "Apartment number cannot be empty." })
    apartment: string;
}
