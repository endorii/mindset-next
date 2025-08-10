import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminUpdateReviewDto } from "./dto/update-admin-review.dto";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

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

            if (!reviews) throw new Error("Відгуки відсутні");
            return reviews;
        } catch (error) {
            console.error("Помилка отримання відгуків:", error);
            throw new Error("Не вдалося отримати відгуки");
        }
    }

    async approveReview(userId: string, id: string) {
        try {
            const review = await this.prisma.review.findFirst({
                where: {
                    id,
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
                throw new BadRequestException("Відгук не знайдено");
            }

            const reviewToApprove = await this.prisma.review.update({
                where: {
                    id,
                },
                data: {
                    isApproved: true,
                },
            });

            await this.adminRecentActions.createAction(
                userId,
                `Відгук до товару "${review.orderItem.product.name}" погоджено ${review.id}`
            );

            return {
                message: "Відгук успішно оновлено",
                reviewToApprove,
            };
        } catch (error) {
            console.error("Помилка редагування відгуку:", error);
            throw new Error("Не вдалося оновити відгук");
        }
    }

    async updateReview(userId: string, id: string, adminUpdateReviewDto: AdminUpdateReviewDto) {
        try {
            const review = await this.prisma.review.update({
                where: {
                    id,
                },
                data: adminUpdateReviewDto,
            });

            await this.adminRecentActions.createAction(userId, `Редаговано відгук ${review.id}`);

            return {
                message: "Відгук успішно оновлено",
                review,
            };
        } catch (error) {
            console.error("Помилка редагування відгуку:", error);
            throw new Error("Не вдалося оновити відгук");
        }
    }
}
