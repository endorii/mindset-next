import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty({ message: "Review content cannot be empty." })
    content: string;

    @IsInt()
    @Min(1, { message: "Rating must be at least 1." })
    @Max(5, { message: "Rating cannot be more than 5." })
    @Type(() => Number)
    rating: number;

    @IsString()
    @IsNotEmpty({ message: "Email field cannot be empty." })
    senderEmail: string;

    @IsString()
    @IsNotEmpty({ message: "Sender name field cannot be empty." })
    senderName: string;

    @IsString({ message: "productId must be a string." })
    @IsNotEmpty({ message: "productId is required." })
    productId: string;

    @IsString({ message: "orderItemId must be a string." })
    @IsNotEmpty({ message: "orderItemId is required." })
    orderItemId: string;

    @IsOptional()
    @IsArray({ message: "Images must be an array." })
    @IsString({ each: true, message: "Each image must be a URL string." })
    @IsUrl({}, { each: true, message: "Each element in the images array must be a valid URL." })
    images?: string[];
}
