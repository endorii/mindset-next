import { Controller, Get, Body, Patch, Param, Req, UseGuards } from "@nestjs/common";
import { AdminReviewsService } from "./admin-reviews.service";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AdminUpdateReviewDto } from "./dto/update-admin-review.dto";

@Controller("admin/reviews")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminReviewsController {
    constructor(private readonly adminReviewsService: AdminReviewsService) {}

    @Get()
    @Roles(Role.ADMIN)
    async getAllReviews() {
        const reviews = await this.adminReviewsService.getAllReviews();
        return reviews;
    }

    @Patch(":reviewId")
    @Roles(Role.ADMIN)
    async approveReview(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("reviewId") reviewId: string
    ) {
        return this.adminReviewsService.approveReview(req.user.id, reviewId);
    }

    @Patch("admin-reply/:reviewId")
    @Roles(Role.ADMIN)
    async updateReview(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("reviewId") reviewId: string,
        @Body() adminUpdateReviewDto: AdminUpdateReviewDto
    ) {
        return this.adminReviewsService.updateReview(req.user.id, reviewId, adminUpdateReviewDto);
    }
}
