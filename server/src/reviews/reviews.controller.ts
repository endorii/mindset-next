import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AdminUpdateReviewDto } from "./dto/update-admin-review.dto";

@Controller("reviews")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    @Roles(Role.ADMIN, Role.USER)
    createReview(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() createReviewDto: CreateReviewDto
    ) {
        return this.reviewsService.createReview(req.user.id, createReviewDto);
    }

    @Post(":id/vote")
    @Roles(Role.ADMIN, Role.USER)
    toggleReviewVote(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("id") reviewId: string,
        @Body()
        body: {
            isHelpful: boolean;
        }
    ) {
        return this.reviewsService.toggleReviewVote(req.user.id, reviewId, body);
    }

    @Get("")
    @Roles(Role.ADMIN)
    async getAllReviews() {
        const reviews = await this.reviewsService.getAllReviews();
        return reviews;
    }

    @Get("user")
    @Public()
    async getReviewsByUserId(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        const reviews = await this.reviewsService.getReviewsByUserId(req.user.id);
        return reviews;
    }

    @Get("product/:productId")
    @Public()
    async getReviewsByProductId(@Param("productId") productId: string) {
        const reviews = await this.reviewsService.getReviewsByProductId(productId);
        return reviews;
    }

    @Patch(":id")
    @Roles(Role.ADMIN)
    async approveReview(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("id") id: string
    ) {
        return this.reviewsService.approveReview(req.user.id, id);
    }

    @Patch("admin/:id")
    @Roles(Role.ADMIN)
    async updateReviewByAdmin(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("id") id: string,
        @Body() adminUpdateReviewDto: AdminUpdateReviewDto
    ) {
        return this.reviewsService.updateReviewByAdmin(req.user.id, id, adminUpdateReviewDto);
    }

    @Delete(":id")
    @Roles(Role.ADMIN, Role.USER)
    async deleteReview(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("id") id: string
    ) {
        return this.reviewsService.deleteReview(req.user.id, id);
    }
}
