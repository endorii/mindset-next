import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { OrderStatus } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReviewDto } from "./dto/create-review.dto";

@Injectable()
export class ShopReviewsService {
    constructor(private readonly prisma: PrismaService) {}

    async createReview(userId: string, createReviewDto: CreateReviewDto) {
        const { content, rating, productId, senderEmail, senderName, orderItemId, images } =
            createReviewDto;

        if (!orderItemId) {
            throw new BadRequestException(
                "Order item ID not specified — cannot verify existing review."
            );
        }

        const existingReviewForOrderItem = await this.prisma.review.findUnique({
            where: { orderItemId },
        });

        if (existingReviewForOrderItem) {
            throw new BadRequestException("You have already left a review for this order item.");
        }

        const orderItem = await this.prisma.orderItem.findFirst({
            where: {
                id: orderItemId,
                productId,
                order: {
                    userId,
                    status: { in: [OrderStatus.shipped, OrderStatus.delivered] },
                },
            },
            include: {
                product: true,
                order: { include: { user: true } },
            },
        });

        if (!orderItem) {
            throw new ForbiddenException(
                "You cannot leave a review for this product because it was not purchased or the order is not completed."
            );
        }

        const review = await this.prisma.review.create({
            data: {
                content,
                rating,
                senderEmail,
                senderName,
                productId,
                orderItemId,
                userId,
                images,
            },
        });

        return {
            message: "Review successfully created!",
            data: review,
        };
    }

    async toggleReviewVote(userId: string, reviewId: string, body: { isHelpful: boolean }) {
        const { isHelpful } = body;

        const existingVote = await this.prisma.reviewVote.findUnique({
            where: { userId_reviewId: { userId, reviewId } },
        });

        if (!existingVote) {
            await this.prisma.reviewVote.create({ data: { userId, reviewId, isHelpful } });

            return this.prisma.review.update({
                where: { id: reviewId },
                data: {
                    isHelpful: { increment: isHelpful ? 1 : 0 },
                    isNotHelpful: { increment: !isHelpful ? 1 : 0 },
                },
            });
        }

        if (existingVote.isHelpful === isHelpful) {
            await this.prisma.reviewVote.delete({
                where: { userId_reviewId: { userId, reviewId } },
            });

            return this.prisma.review.update({
                where: { id: reviewId },
                data: {
                    isHelpful: { decrement: isHelpful ? 1 : 0 },
                    isNotHelpful: { decrement: !isHelpful ? 1 : 0 },
                },
            });
        } else {
            await this.prisma.reviewVote.update({
                where: { userId_reviewId: { userId, reviewId } },
                data: { isHelpful },
            });

            return this.prisma.review.update({
                where: { id: reviewId },
                data: {
                    isHelpful: { increment: isHelpful ? 1 : -1 },
                    isNotHelpful: { increment: !isHelpful ? 1 : -1 },
                },
            });
        }
    }

    async getReviewsByUserId(userId: string) {
        const reviews = await this.prisma.review.findMany({
            where: { userId },
            include: {
                orderItem: {
                    include: {
                        product: {
                            include: {
                                category: {
                                    include: { collection: true },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!reviews || reviews.length === 0) {
            throw new NotFoundException("No reviews found.");
        }

        return reviews;
    }

    async getReviewsByProductId(productId: string) {
        const reviews = await this.prisma.review.findMany({
            where: { productId, isApproved: true },
            include: {
                orderItem: {
                    include: {
                        product: {
                            include: {
                                category: {
                                    include: { collection: true },
                                },
                            },
                        },
                    },
                },
                reviewVotes: true,
            },
        });

        return reviews;
    }

    async deleteReview(userId: string, reviewId: string) {
        const review = await this.prisma.review.findUnique({
            where: { id: reviewId },
        });

        if (!review) {
            throw new NotFoundException("Review not found.");
        }

        if (review.userId !== userId) {
            throw new ForbiddenException("You do not have permission to delete this review.");
        }

        await this.prisma.review.delete({ where: { id: reviewId } });

        return { message: "Review successfully deleted." };
    }
}
