import { IProduct } from "@/features/products/types/products.types";
import Link from "next/link";

export default function Breadcrumbs({ product }: { product: IProduct }) {
    return (
        <div className="flex gap-[7px] text-white/50 font-light text-sm">
            <Link
                href={`/${product.category?.collection?.path}`}
                className="hover:underline hover:text-white"
            >
                {product.category?.collection?.path}
            </Link>
            /
            <Link
                href={`/${product.category?.collection?.path}/${product.category?.path}`}
                className="hover:underline hover:text-white"
            >
                {product.category?.path}
            </Link>
            /
            <Link
                href={`/${product.category?.collection?.path}/${product.category?.path}/${product.path}`}
                className="hover:underline hover:text-white"
            >
                {product.path}
            </Link>
        </div>
    );
}
