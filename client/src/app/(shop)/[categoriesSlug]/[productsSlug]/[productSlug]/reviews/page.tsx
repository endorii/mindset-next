"use client";

import { useProduct } from "@/features/products/hooks/useProducts";
import {
    AvgRatingStat,
    ProductReviewsList,
} from "@/features/reviews/components";
import { useReviewByProductId } from "@/features/reviews/hooks/useReviews";
import { BackIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function Reviews() {
    const pathname = usePathname();
    const router = useRouter();

    const [collectionPath, categoryPath, productPath] = pathname
        .split("/")
        .filter(Boolean);

    const { data: product, isLoading: isProductLoading } = useProduct(
        collectionPath,
        categoryPath,
        productPath
    );

    const {
        data: reviews,
        isLoading: isReviewsLoading,
        isError,
    } = useReviewByProductId(product?.id ?? "");

    if (isProductLoading || !product) {
        return (
            <div className="pt-[130px] text-center text-[50px]">
                {isProductLoading ? "Завантаження..." : "Товар не знайдено 😞"}
            </div>
        );
    }

    if (isProductLoading || !product) {
        return (
            <div className="pt-[130px] text-center text-[50px]">
                {isProductLoading ? "Завантаження..." : "Товар не знайдено 😞"}
            </div>
        );
    }

    if (isReviewsLoading) return <div>Завантаження відгуків...</div>;
    if (isError) return <div>Помилка при завантаженні відгуків</div>;
    if (!reviews) return <div>Немає відгуків</div>;

    return (
        <div className="flex flex-col gap-[20px] px-[30px] py-[10px]  text-white/70 text-sm">
            <div className="flex gap-[7px]">
                <Link
                    className="hover:underline hover:text-white"
                    href={`/${product.category?.collection?.path}`}
                >
                    {product.category?.collection?.path}
                </Link>
                /
                <Link
                    className="hover:underline hover:text-white"
                    href={`/${product.category?.collection?.path}/${product.category?.path}`}
                >
                    {product.category?.path}
                </Link>
                /
                <Link
                    className="hover:underline hover:text-white"
                    href={`/${product.category?.collection?.path}/${product.category?.path}/${product.path}`}
                >
                    {product.path}
                </Link>
            </div>
            <div>
                <MonoButton onClick={() => router.back()}>
                    <BackIcon className="w-[23px] stroke-white stroke-[50] group-hover:stroke-black" />
                    <div>Назад до товару</div>
                </MonoButton>
            </div>
            <div className="text-white rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <h2 className="text-2xl font-bold mb-4">
                    Відгуки про товар ({reviews?.length || 0})
                </h2>

                <div className="flex flex-col md:flex-row gap-8">
                    <AvgRatingStat reviews={reviews} />

                    <div className="w-2/3">
                        <ProductReviewsList
                            product={product}
                            reviews={reviews}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reviews;
