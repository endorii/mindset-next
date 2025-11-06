import { Body, Controller, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { AdminReviewsService } from "./admin-reviews.service";
import { AdminUpdateReviewDto } from "./dto/update-admin-review.dto";

@Controller("admin/reviews")
@UseGuards(JwtAccessGuard, RolesGuard)
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
