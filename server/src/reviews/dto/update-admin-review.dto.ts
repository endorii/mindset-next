// src/reviews/dto/admin-update-review.dto.ts
import {
    IsString,
    IsInt,
    Min,
    Max,
    IsOptional,
    IsArray,
    IsUrl,
    IsBoolean,
    IsDateString,
} from "class-validator";
import { Type } from "class-transformer";

export class AdminUpdateReviewDto {
    @IsString()
    @IsOptional()
    content?: string;

    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    @Type(() => Number)
    rating?: number;

    @IsOptional()
    @IsArray()
    @IsUrl({}, { each: true })
    images?: string[];

    @IsBoolean()
    @IsOptional()
    isApproved?: boolean;

    @IsInt()
    @Min(0)
    @IsOptional()
    isHelpful?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    isNotHelpful?: number;

    @IsString()
    @IsOptional()
    adminReply?: string;

    @IsDateString()
    @IsOptional()
    adminReplyAt?: string;
}
