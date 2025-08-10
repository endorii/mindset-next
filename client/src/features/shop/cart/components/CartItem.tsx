import { CloseIcon, HeartIcon } from "@/shared/icons";
import { ButtonWithTextAndIcon } from "@/shared/ui/buttons";
import Image from "next/image";
import Link from "next/link";
import { ICartItem } from "../types/cart.types";

interface CartItemProps {
    item: ICartItem;
    handleRemove: () => void;
    handleFavoriteToggle: (productId: string) => void;
    isFavorite: boolean;
}

function CartItem({
    item,
    handleRemove,
    handleFavoriteToggle,
    isFavorite,
}: CartItemProps) {
    return (
        <div className="flex border-b pb-[30px] rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[20px] ">
            <Link
                href={`${item.product.category?.collection?.path}/${item.product.category?.path}/${item.product.path}`}
                className="relative min-w-[300px] "
            >
                <div className="absolute flex top-0 left-0 opacity-0 hover:opacity-100 bg-black/85 w-full h-full text-3xl uppercase font-thin items-center justify-center transition-all duration-400 rounded-lg border border-white/5">
                    Переглянути
                </div>
                <Image
                    src={`http://localhost:5000/${item.product.banner}`}
                    alt={item.product.name}
                    width={300}
                    height={300}
                    className="rounded-xl"
                />
            </Link>
            <div className="px-[30px] flex gap-[10px] flex-col justify-between w-full">
                <div className="flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <div className="text-[30px] font-thin">
                            {item.product.name}
                        </div>
                        <div className="text-lg font-bold">
                            {item.product.price} грн.
                        </div>
                    </div>
                    <hr className="border-t border-white/10 my-[8px]" />
                    <div className="flex flex-col items-start gap-[7px] text-white/60">
                        <div className="flex gap-[7px] items-center">
                            <div className="text-sm">Колір: </div>
                            <div className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm">
                                {item.color}
                            </div>
                        </div>
                        <div className="flex gap-[7px] items-center">
                            <div className="text-sm">Розмір: </div>
                            <div className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm">
                                {item.size}
                            </div>
                        </div>
                        <div className="flex gap-[7px] items-center">
                            <div className="text-sm">Тип: </div>
                            <div className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm">
                                {item.type}
                            </div>
                        </div>
                        <div className="flex gap-[7px] items-center">
                            <div className="text-sm">Кількість: </div>
                            <div className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm">
                                {item.quantity}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-[10px]">
                    <ButtonWithTextAndIcon
                        onClick={() => {
                            handleRemove();
                        }}
                    >
                        <CloseIcon className="w-[20px] stroke-white group-hover:stroke-black transition-all duration-300" />
                        <div>Видалити</div>
                    </ButtonWithTextAndIcon>
                    <ButtonWithTextAndIcon
                        onClick={() => {
                            handleFavoriteToggle(item.product.id);
                        }}
                    >
                        <HeartIcon
                            className={`w-[22px] transition-all group-hover:stroke-black duration-300 stroke-white fill-none`}
                        />
                        <div>
                            {isFavorite
                                ? "Видалити з Вподобаного"
                                : "Додати до Вподобаного"}
                        </div>
                    </ButtonWithTextAndIcon>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
