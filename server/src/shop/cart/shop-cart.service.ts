import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
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

    async addCartItemToUser(userId: string, dto: CreateCartDto) {
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
            include: {
                productColors: { include: { color: true } },
                productSizes: { include: { size: true } },
                productTypes: { include: { type: true } },
            },
        });

        if (!product) {
            throw new NotFoundException("Product not found");
        }

        if (!product.isAvailable) {
            throw new BadRequestException("This product is not available for purchase");
        }

        if (!product.isVisible) {
            throw new BadRequestException("Product cannot be added due to its status");
        }

        const hasColor = product.productColors.some((c) => c.color.name === dto.color);

        if (!hasColor) {
            throw new BadRequestException("Invalid color for this product");
        }

        const hasSize = product.productSizes.some((s) => s.size.name === dto.size);

        if (!hasSize) {
            throw new BadRequestException("Invalid size for this product");
        }

        const hasType = product.productTypes.some((t) => t.type.name === dto.type);

        if (!hasType) {
            throw new BadRequestException("Invalid type for this product");
        }

        const existingCartItem = await this.prisma.cartItem.findUnique({
            where: {
                userId_productId_size_type_color: {
                    userId,
                    productId: dto.productId,
                    size: dto.size,
                    type: dto.type,
                    color: dto.color,
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
                productId: dto.productId,
                size: dto.size,
                type: dto.type,
                color: dto.color,
                quantity: dto.quantity,
            },
        });

        return { message: "Product added to the cart" };
    }

    async removeCartItemFromUser(userId: string, cartItemId: string) {
        const existingItem = await this.prisma.cartItem.findFirst({
            where: { id: cartItemId, userId },
        });

        if (!existingItem) {
            throw new NotFoundException("Product in the cart not found");
        }

        await this.prisma.cartItem.delete({
            where: { id: existingItem.id },
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
