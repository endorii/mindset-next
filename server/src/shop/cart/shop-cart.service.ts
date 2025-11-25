import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartDto } from "./dto/create-cart.dto";

@Injectable()
export class ShopCartService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllCartItemsFromUser(userId: string) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: { userId },
        });

        return cartItems;
    }

    async addCartItemToUser(userId: string, createCartDto: CreateCartDto) {
        const existingCartItem = await this.prisma.cartItem.findUnique({
            where: {
                userId_productId_size_type_color: {
                    userId,
                    productId: createCartDto.productId,
                    size: createCartDto.size,
                    type: createCartDto.type,
                    color: createCartDto.color,
                },
            },
        });

        if (existingCartItem) {
            throw new ConflictException(
                "Product with these parameters is already added to the cart"
            );
        }

        await this.prisma.cartItem.create({
            data: {
                userId,
                productId: createCartDto.productId,
                size: createCartDto.size,
                type: createCartDto.type,
                color: createCartDto.color,
                quantity: createCartDto.quantity,
            },
        });

        return {
            message: "Product added to the cart",
        };
    }

    async removeCartItemFromUser(userId: string, cartItemId: string) {
        const existingItem = await this.prisma.cartItem.findUnique({
            where: { userId, id: cartItemId },
        });

        if (!existingItem) {
            throw new NotFoundException("Product in the cart not found");
        }

        await this.prisma.cartItem.delete({
            where: { userId, id: cartItemId },
        });

        return { message: "Product removed from the cart" };
    }

    async removeCartFromUser(userId: string) {
        const cart = await this.prisma.cartItem.deleteMany({
            where: { userId },
        });

        if (!cart) {
            throw new NotFoundException("No products found in the cart");
        }

        return { message: "Cart cleared", cart };
    }
}
