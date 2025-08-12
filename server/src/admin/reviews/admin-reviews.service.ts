import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    HttpException,
    NotFoundException,
} from "@nestjs/common";
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
            return reviews;
        } catch (error) {
            console.error("Помилка отримання відгуків:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати відгуки");
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
                throw new NotFoundException("Відгуку з таким ID не знайдено");
            }

            if (review.isApproved) {
                throw new BadRequestException("Відгук вже погоджено");
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
                `Відгук до товару "${review.orderItem.product.name}" погоджено ${review.id}`
            );

            return {
                message: "Відгук успішно погоджено",
            };
        } catch (error: unknown) {
            console.error("Помилка погодження відгуку:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося погодити відгук");
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
                throw new NotFoundException("Відгуку з таким ID не знайдено");
            }

            const updatedReview = await this.prisma.review.update({
                where: {
                    id: reviewId,
                },
                data: adminUpdateReviewDto,
            });

            await this.adminRecentActions.createAction(userId, `Редаговано відгук ${reviewId}`);

            return {
                message: "Відгук успішно оновлено",
                review: updatedReview,
            };
        } catch (error: unknown) {
            console.error("Помилка редагування відгуку:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося оновити відгук");
        }
    }
}
