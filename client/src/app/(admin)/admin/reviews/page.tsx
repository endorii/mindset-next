import { Title } from "@/features/admin/attributes/components/Title";
import { AdminReviewsWrapper } from "@/features/reviews/components/AdminReviewsWrapper";

function Reviews() {
    return (
        <div className="flex flex-col gap-[20px]">
            <Title title="Reviews list" />
            <hr className="w-full border-t border-white/10" />
            <AdminReviewsWrapper />
        </div>
    );
}

export default Reviews;
