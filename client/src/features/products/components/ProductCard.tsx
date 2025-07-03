import Image from "next/image";
import Link from "next/link";
import { IProduct } from "../types/products.types";

interface IProductCardProps {
    collectionPath: string;
    categoryPath: string;
    item: IProduct;
    i: number;
}

function ProductCard({
    collectionPath,
    categoryPath,
    item,
    i,
}: IProductCardProps) {
    console.log(i);

    return (
        <li key={i}>
            <Link
                href={`/${collectionPath}/${categoryPath}/${item.path}`}
                className="relative flex flex-col gap-[15px] group rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px]"
            >
                <Image
                    className="relative rounded-xl"
                    width={450}
                    height={450}
                    src={`http://localhost:5000/${item.banner}`}
                    alt={item.name}
                />
                <ul className="absolute top-[380px] left-[30px] flex gap-[5px] rounded-[50px] bg-white/5 backdrop-blur-lg border border-white/20 p-[5px]">
                    {item.productColors.map((color) => (
                        <li
                            key={color.color.hexCode}
                            className="rounded-[50px] w-[20px] h-[20px]"
                            style={{
                                backgroundColor: color.color.hexCode,
                            }}
                        ></li>
                    ))}
                </ul>
                <div className="flex flex-col gap-[7px]">
                    <div className="flex justify-between items-end">
                        <div className="text-white text-3xl font-thin">
                            {item.name}
                        </div>
                        <div className="flex gap-[10px]">
                            <div className="text-xl text-white font-semibold">
                                {item.price} грн.
                            </div>
                            <div className="font-semibold line-through text-lg text-gray-500">
                                999 грн.
                            </div>
                        </div>
                    </div>
                    <hr className="border-top border-white/10 mt-[5px]" />
                    <div className="flex gap-[15px] text-white justify-between">
                        <ul className="flex gap-[5px]">
                            {item.productSizes.map((size) => (
                                <li
                                    key={size.size.name}
                                    className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm"
                                >
                                    <div>{size.size.name}</div>
                                </li>
                            ))}
                        </ul>
                        <ul className="flex gap-[5px]">
                            {item.productTypes.map((type) => (
                                <li
                                    key={type.type.name}
                                    className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm"
                                >
                                    <div>{type.type.name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default ProductCard;
