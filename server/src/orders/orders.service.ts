import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
// import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) {}
    async createOrder(createOrderDto: CreateOrderDto) {
        try {
            const {
                fullName,
                phoneNumber,
                email,
                area,
                city,
                postDepartment,
                additionalInfo,
                total,
                userId,
                items,
            } = createOrderDto;

            const order = await this.prisma.order.create({
                data: {
                    fullName,
                    phoneNumber,
                    email: email || "",
                    area,
                    city,
                    postDepartment,
                    additionalInfo,
                    total,
                    userId,
                    items: {
                        create: items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            color: item.color,
                            size: item.size,
                            type: item.type,
                        })),
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            await this.prisma.cartItem.deleteMany({
                where: {
                    userId: createOrderDto.userId,
                },
            });

            return {
                message: "Замовлення успішно створено",
                order,
            };
        } catch (error) {
            console.error("Помилка створення замовлення:", error);
            throw error;
        }
    }

    findAll() {
        return `This action returns all orders`;
    }

    findOne(id: number) {
        return `This action returns a #${id} order`;
    }

    // update(id: number, updateOrderDto: UpdateOrderDto) {
    //     return `This action updates a #${id} order`;
    // }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }
}
