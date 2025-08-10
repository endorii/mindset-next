import { Injectable, BadRequestException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { OrderStatus } from "generated/prisma";

@Injectable()
export class ShopReviewsService {
    constructor(private readonly prisma: PrismaService) {}

    async createReview(userId: string, createReviewDto: CreateReviewDto) {
        const { content, rating, productId, senderEmail, senderName, orderItemId, images } =
            createReviewDto;

        if (!orderItemId) {
            throw new BadRequestException(
                "Не вказано orderItemId — неможливо перевірити існуючий відгук."
            );
        }

        const existingReviewForOrderItem = await this.prisma.review.findUnique({
            where: {
                orderItemId,
            },
        });

        if (existingReviewForOrderItem) {
            throw new BadRequestException("Ви вже залишили відгук для цього елемента замовлення.");
        }

        // Чи користувач дійсно купив цей товар (через orderItemId)
        const orderItem = await this.prisma.orderItem.findUnique({
            where: {
                id: orderItemId,
                productId,
                order: {
                    userId,

                    status: {
                        in: [OrderStatus.shipped, OrderStatus.delivered],
                    },
                },
            },

            include: {
                product: true,
                order: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!orderItem) {
            throw new ForbiddenException(
                "Ви не можете залишити відгук для цього товару, оскільки він не був придбаний або замовлення ще не завершене."
            );
        }

        try {
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
                message: "Відгук успішно створено!",
                review,
            };
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ForbiddenException) {
                throw error;
            }
            console.error("Помилка створення відгуку:", error);
            throw new BadRequestException("Не вдалося створити відгук через внутрішню помилку.");
        }
    }

    async toggleReviewVote(
        userId: string,
        reviewId: string,
        body: {
            isHelpful: boolean;
        }
    ) {
        const { isHelpful } = body;

        const existingVote = await this.prisma.reviewVote.findUnique({
            where: {
                userId_reviewId: {
                    userId,
                    reviewId,
                },
            },
        });

        if (!existingVote) {
            await this.prisma.reviewVote.create({
                data: { userId, reviewId, isHelpful },
            });

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
                where: {
                    userId_reviewId: {
                        userId,
                        reviewId,
                    },
                },
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
                where: {
                    userId_reviewId: {
                        userId,
                        reviewId,
                    },
                },
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
        try {
            const reviews = await this.prisma.review.findMany({
                where: { userId },
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

            if (!reviews) throw new Error("Відгуки відсутні");
            return reviews;
        } catch (error) {
            console.error("Помилка отримання відгуків:", error);
            throw new Error("Не вдалося отримати відгуки");
        }
    }

    async getReviewsByProductId(productId: string) {
        try {
            const reviews = await this.prisma.review.findMany({
                where: { productId, isApproved: true },
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

            if (!reviews) throw new Error("Відгуки відсутні");
            return reviews;
        } catch (error) {
            console.error("Помилка отримання відгуків:", error);
            throw new Error("Не вдалося отримати відгуки");
        }
    }

    async deleteReview(userId: string, reviewId: string) {
        try {
            const review = await this.prisma.review.findUnique({
                where: { id: reviewId, userId },
            });

            if (!review) throw new Error("Відгук не знайдено");

            await this.prisma.review.delete({
                where: {
                    id: reviewId,
                    userId,
                },
            });

            return {
                message: "Відгук успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення відгуку:", error);
            throw new Error("Не вдалося видалити відгук");
        }
    }
}
