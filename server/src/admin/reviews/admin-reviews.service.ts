import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { AdminUpdateReviewDto } from "./dto/update-admin-review.dto";

@Injectable()
export class AdminReviewsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async getAllReviews() {
        try {
            const reviews = await this.prisma.review.findMany({
                include: {
                    orderItem: {
                        include: {
                            product: {
                                include: {
                                    category: {
                                        include: {
                                            collection: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            return reviews;
        } catch (error) {
            console.error("Error fetching reviews:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to fetch reviews");
        }
    }

    async approveReview(userId: string, reviewId: string) {
        try {
            const review = await this.prisma.review.findUnique({
                where: {
                    id: reviewId,
                },
                include: {
                    orderItem: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            if (!review) {
                throw new NotFoundException(`Review with ID ${reviewId} not found`);
            }

            if (review.isApproved) {
                throw new BadRequestException("Review is already approved");
            }

            await this.prisma.review.update({
                where: {
                    id: reviewId,
                },
                data: {
                    isApproved: true,
                },
            });

            await this.adminRecentActions.createAction(
                userId,
                `Review for product "${review.orderItem.product.name}" approved ${review.id}`
            );

            return {
                message: "Review successfully approved",
            };
        } catch (error: unknown) {
            console.error("Error approving review:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to approve review");
        }
    }

    async updateReview(
        userId: string,
        reviewId: string,
        adminUpdateReviewDto: AdminUpdateReviewDto
    ) {
        try {
            const review = await this.prisma.review.findUnique({
                where: { id: reviewId },
            });

            if (!review) {
                throw new NotFoundException(`Review with ID ${reviewId} not found`);
            }

            const updatedReview = await this.prisma.review.update({
                where: {
                    id: reviewId,
                },
                data: adminUpdateReviewDto,
            });

            await this.adminRecentActions.createAction(userId, `Edited review ${reviewId}`);

            return {
                message: "Review successfully updated",
                review: updatedReview,
            };
        } catch (error: unknown) {
            console.error("Error editing review:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to update review");
        }
    }
}
