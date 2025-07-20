import { Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    async addCartItemToUser(userId: string, createCartDto: CreateCartDto) {
        return this.prisma.cartItem.create({
            data: {
                userId,
                ...createCartDto,
            },
        });
    }

    async getAllCartItemsFromUser(userId: string) {
        try {
            const cartItems = this.prisma.cartItem.findMany({
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
                where: {
                    userId,
                },
            });

            return cartItems;
        } catch (error) {
            console.log(error);
        }
    }

    async removeCartItemFromUser(userId: string, productId: string) {
        return this.prisma.cartItem.deleteMany({
            where: {
                userId,
                productId,
            },
        });
    }

    async removeCartFromUser(userId: string) {
        return this.prisma.cartItem.deleteMany({
            where: {
                userId,
            },
        });
    }
}
