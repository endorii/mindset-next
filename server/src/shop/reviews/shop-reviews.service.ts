import {
    Injectable,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
} from "@nestjs/common";
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
            where: { orderItemId },
        });

        if (existingReviewForOrderItem) {
            throw new BadRequestException("Ви вже залишили відгук для цього елемента замовлення.");
        }

        // Перевірка, що користувач дійсно купив цей товар та замовлення в потрібному статусі
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
            console.error("Помилка створення відгуку:", error);
            throw new InternalServerErrorException(
                "Не вдалося створити відгук через внутрішню помилку."
            );
        }
    }

    async toggleReviewVote(userId: string, reviewId: string, body: { isHelpful: boolean }) {
        const { isHelpful } = body;

        try {
            const existingVote = await this.prisma.reviewVote.findUnique({
                where: {
                    userId_reviewId: {
                        userId,
                        reviewId,
                    },
                },
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
        } catch (error) {
            console.error("Помилка голосування за відгук:", error);
            throw new InternalServerErrorException("Не вдалося оновити голосування за відгук");
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
                                        include: { collection: true },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            if (!reviews || reviews.length === 0) {
                throw new NotFoundException("Відгуки відсутні");
            }

            return reviews;
        } catch (error) {
            console.error("Помилка отримання відгуків:", error);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException("Не вдалося отримати відгуки");
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
                                        include: { collection: true },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            if (!reviews || reviews.length === 0) {
                throw new NotFoundException("Відгуки відсутні");
            }

            return reviews;
        } catch (error) {
            console.error("Помилка отримання відгуків:", error);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException("Не вдалося отримати відгуки");
        }
    }

    async deleteReview(userId: string, reviewId: string) {
        try {
            const review = await this.prisma.review.findUnique({
                where: { id: reviewId },
            });

            if (!review) {
                throw new NotFoundException("Відгук не знайдено");
            }

            if (review.userId !== userId) {
                throw new ForbiddenException("Ви не маєте права видаляти цей відгук");
            }

            await this.prisma.review.delete({
                where: { id: reviewId },
            });

            return { message: "Відгук успішно видалено" };
        } catch (error) {
            console.error("Помилка видалення відгуку:", error);
            if (error instanceof NotFoundException || error instanceof ForbiddenException)
                throw error;
            throw new InternalServerErrorException("Не вдалося видалити відгук");
        }
    }
}
