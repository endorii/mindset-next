import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ShopReviewsService } from "./shop-reviews.service";

@Controller("shop/reviews")
@UseGuards(JwtAccessGuard, RolesGuard)
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
