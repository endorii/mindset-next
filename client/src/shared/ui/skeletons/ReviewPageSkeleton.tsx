import { BreadcrumbsSkeleton } from "./BreadcrumbsSkeleton";
import { ProductReviewsSkeleton } from "./ProductReviewsSkeleton";
import { ReviewsValueSkeleton } from "./ReviewsValueSkeleton";

export function ReviewPageSkeleton() {
    return (
        <div className="flex flex-col gap-[15px] px-[30px] py-[10px] sm:p-[10px]">
            <BreadcrumbsSkeleton />
            <div className="h-[45px] w-[200px] bg-white/10 rounded-xl"></div>
            <div className="bg-white/10 p-[20px]">
                <ReviewsValueSkeleton />
                <ProductReviewsSkeleton items={3} />
            </div>
        </div>
    );
}
