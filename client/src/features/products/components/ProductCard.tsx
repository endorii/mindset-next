import Image from "next/image";
import Link from "next/link";
import { IProduct } from "../types/products.types";
import { ProductCardColors } from "./ProductCardColors";

export function ProductCard({
    product,
    path,
}: {
    product: IProduct;
    path: string;
}) {
    return (
        <Link href={path} className="relative flex flex-col gap-[10px]">
            <div className="relative">
                <Image
                    width={400}
                    height={400}
                    src={product.banner}
                    alt={product.name}
                    className="relative w-full h-[400px] object-cover"
                />
                <ProductCardColors productId={product.id} />
            </div>

            <div className="flex flex-col gap-[3px] flex-grow px-[10px]">
                <div className="text-white text-3xl md:text-2xl sm:text-xl xs:text-lg xxs:text-base font-perandory tracking-wider truncate">
                    {product.name}
                </div>

                <div className="flex gap-[10px] justify-between items-end">
                    <div className="flex gap-[10px] text-xl md:text-lg xs:text-base">
                        <div className="text-white font-bold">
                            ${product.price}
                        </div>
                        {product.oldPrice && (
                            <div className="line-through text-base text-neutral-200">
                                ${product.oldPrice}
                            </div>
                        )}
                    </div>
                    <div
                        className={`font-perandory tracking-wider font-semibold text-xl md:text-lg xs:text-base ${
                            product.isAvailable
                                ? "text-green-600"
                                : "text-red-700"
                        }`}
                    >
                        {product.isAvailable ? "In stock" : "Out of stock"}
                    </div>
                </div>
            </div>
            <div className="absolute opacity-0 top-0 left-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                <div className="border-b border-white font-perandory">View</div>
            </div>
        </Link>
    );
}
