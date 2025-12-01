import { AdminReviewsWrapper } from "@/features/reviews/components";
import { Title } from "@/shared/components";

function Reviews() {
    return (
        <div className="flex flex-col gap-[20px]">
            <Title title="Reviews list" />
            <hr className="w-full border-t border-white/5" />
            <AdminReviewsWrapper />
        </div>
    );
}

export default Reviews;
