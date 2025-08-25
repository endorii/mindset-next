import Title from "@/features/admin/attributes/components/Title";
import AdminReviewsWrapper from "@/features/reviews/components/AdminReviewsWrapper";

function Reviews() {
    return (
        <div className="flex flex-col gap-[15px]">
            <Title title="Список відгуків до товарів" />
            <AdminReviewsWrapper />
        </div>
    );
}

export default Reviews;
