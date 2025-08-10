import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { ShopReviewsService } from "./shop-reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";

@Controller("shop/reviews")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShopReviewsController {
    constructor(private readonly shopReviewsService: ShopReviewsService) {}

    @Post()
    @Roles(Role.ADMIN, Role.USER)
    createReview(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() createReviewDto: CreateReviewDto
    ) {
        return this.shopReviewsService.createReview(req.user.id, createReviewDto);
    }

    @Post(":reviewId/vote")
    @Roles(Role.ADMIN, Role.USER)
    toggleReviewVote(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("reviewId") reviewId: string,
        @Body()
        body: {
            isHelpful: boolean;
        }
    ) {
        return this.shopReviewsService.toggleReviewVote(req.user.id, reviewId, body);
    }

    @Get("user")
    @Public()
    async getReviewsByUserId(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        const reviews = await this.shopReviewsService.getReviewsByUserId(req.user.id);
        return reviews;
    }

    @Get("product/:productId")
    @Public()
    async getReviewsByProductId(@Param("productId") productId: string) {
        const reviews = await this.shopReviewsService.getReviewsByProductId(productId);
        return reviews;
    }

    @Delete(":reviewId")
    @Roles(Role.ADMIN, Role.USER)
    async deleteReview(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("reviewId") reviewId: string
    ) {
        return this.shopReviewsService.deleteReview(req.user.id, reviewId);
    }
}
