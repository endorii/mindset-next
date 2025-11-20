import { Title } from "@/features/admin/attributes/components/Title";
import { AdminReviewsWrapper } from "@/features/reviews/components/AdminReviewsWrapper";

function Reviews() {
    return (
        <div className="flex flex-col gap-[10px]">
            <Title title="Reviews list" />
            <AdminReviewsWrapper />
        </div>
    );
}

export default Reviews;
