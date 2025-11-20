import { CloseIcon } from "@/shared/icons";
import { ButtonWithTextAndIcon } from "@/shared/ui/buttons";
import Image from "next/image";
import Link from "next/link";
import { ICartItem } from "../types/cart.types";
import { InfoRow } from "./InfoRow";

interface CartItemProps {
    item: ICartItem;
    handleRemove: () => void;
}

export function CartItem({ item, handleRemove }: CartItemProps) {
    const product = item.product;
    const link =
        `${product?.category?.collection?.path ?? ""}/` +
        `${product?.category?.path ?? ""}/` +
        `${product?.path ?? ""}`;

    return (
        <div className="flex bg-white/5 backdrop-blur-[100px] border border-white/5">
            <Link href={link} className="relative max-w-[350px] w-full">
                <div
                    className="absolute inset-0 flex items-center justify-center 
                    opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl 
                    text-3xl uppercase font-thin transition-all duration-400"
                >
                    <div className="border-b border-white font-perandory">
                        View
                    </div>
                </div>

                <Image
                    src={product?.banner || ""}
                    alt={product?.name || ""}
                    width={300}
                    height={400}
                    className="object-cover w-full"
                />
            </Link>

            <div className="flex flex-col justify-between p-[20px] px-[30px] gap-[10px] w-full">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="font-perandory tracking-wider text-3xl">
                            {product?.name}
                        </div>
                        <div className="text-xl font-bold">
                            ${(product?.price || 0) * item.quantity}
                        </div>
                    </div>

                    <hr className="border-white/10 my-[8px]" />

                    <div className="flex flex-col gap-[3px] text-neutral-400 font-light">
                        <InfoRow label="Color" value={item.color} />
                        <InfoRow label="Size" value={item.size} />
                        <InfoRow label="Type" value={item.type} />
                        <InfoRow label="Quantity" value={item.quantity} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <ButtonWithTextAndIcon onClick={handleRemove}>
                        <CloseIcon className="w-[20px] stroke-white stroke-3 group-hover:stroke-black transition-all duration-300" />
                        <div className="font-perandory text-xl tracking-wider mt-1">
                            Remove
                        </div>
                    </ButtonWithTextAndIcon>
                </div>
            </div>
        </div>
    );
}
