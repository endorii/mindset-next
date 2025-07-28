import { Injectable, BadRequestException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { OrderStatus } from "generated/prisma";
import { AdminUpdateReviewDto } from "./dto/update-admin-review.dto";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Injectable()
export class ReviewsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly recentActions: RecentActionsService
    ) {}

    async createReview(userId: string, createReviewDto: CreateReviewDto) {
        const { content, rating, productId, orderItemId, images } = createReviewDto;

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

    async getReviewsByProductId(productId: string) {
        try {
            const reviews = await this.prisma.review.findMany({
                where: { productId },
            });

            if (!reviews) throw new Error("Відгуки відсутні");
            return reviews;
        } catch (error) {
            console.error("Помилка отримання відгуків:", error);
            throw new Error("Не вдалося отримати відгуки");
        }
    }

    async updateReviewByAdmin(
        userId: string,
        id: string,
        adminUpdateReviewDto: AdminUpdateReviewDto
    ) {
        try {
            const review = await this.prisma.review.update({
                where: {
                    id,
                },
                data: adminUpdateReviewDto,
            });

            await this.recentActions.createAction(userId, `Редаговано відгук ${review.id}`);

            return {
                message: "Відгук успішно оновлено",
                review,
            };
        } catch (error) {
            console.error("Помилка редагування відгуку:", error);
            throw new Error("Не вдалося оновити відгук");
        }
    }

    async deleteReview(userId: string, id: string) {
        try {
            const review = await this.prisma.review.findUnique({
                where: { id, userId },
            });

            if (!review) throw new Error("Відгук не знайдено");

            await this.prisma.review.delete({
                where: {
                    id,
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
