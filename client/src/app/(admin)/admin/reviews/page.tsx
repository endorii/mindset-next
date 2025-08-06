"use client";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import Title from "@/features/admin/attributes/components/Title";
import { useReviews } from "@/features/reviews/hooks/useReviews";
import ApproveReviewModal from "@/features/reviews/modals/ApproveReviewModal";
import DeleteReviewModal from "@/features/reviews/modals/DeleteReviewModal";
import ReviewInfoModal from "@/features/reviews/modals/ReviewInfoModal";
import ReviewReplyModal from "@/features/reviews/modals/ReviewReplyModal";
import { IReview } from "@/features/reviews/types/reviews.types";
import { InfoIcon, ArrowIcon, TrashIcon } from "@/shared/icons";
import ApproveIcon from "@/shared/icons/ApproveIcon";
import { ReviewModalType } from "@/shared/types/types";
import {
    ButtonWithIcon,
    ApproveButtonWithIcon,
    DeleteButtonWithIcon,
} from "@/shared/ui/buttons";
import { formatDate } from "@/shared/utils/formatDate";
import { useState } from "react";

function Reviews() {
    const { data: reviews, isLoading, isError } = useReviews();

    const sortFilters = ["Спочатку новіші", "Спочатку старіші"];

    const [activeModal, setActiveModal] = useState<ReviewModalType>(null);
    const [selectedReview, setSelectedReview] = useState<IReview | null>(null);

    const openModal = (type: ReviewModalType, review: IReview | null) => {
        setSelectedReview(review);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedReview(null);
        setActiveModal(null);
    };

    return (
        <div className="flex flex-col gap-[15px]">
            <Title title="Список відгуків до товарів" />

            <FilterSection
                title={"Сортувати"}
                filters={sortFilters}
                selectedItem={""}
                onFilterClick={function (filter: string): void {
                    throw new Error("Function not implemented.");
                }}
            />

            {reviews && reviews.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div
                        className="grid 
                    grid-cols-[1fr_1fr_2.5fr_1fr_2fr_280px] 
                    lg:grid-cols-[120px_1fr_2.5fr_1fr] 
                    md:grid-cols-3 
                    xs:grid-cols-2
                    gap-[15px] p-[20px] sm:px-[10px] rounded-t-lg font-semibold text-sm"
                    >
                        <div>Ім'я</div>
                        <div className=" xs:hidden">Оцінка</div>
                        <div className="md:hidden">Відгук</div>
                        <div className="xs:text-right">Статус</div>
                        <div className="lg:hidden">
                            Дата створення / оновлення
                        </div>
                        <div className="text-right lg:hidden">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="flex flex-col gap-[25px] p-[20px] border-b border-white/10 last:border-b-0 text-sm"
                            >
                                <div
                                    className="grid 
                                grid-cols-[1fr_1fr_2.5fr_1fr_2fr_280px] 
                                lg:grid-cols-[120px_1fr_2.5fr_1fr] 
                                md:grid-cols-3 
                                xs:grid-cols-2
                                gap-[15px] items-center"
                                >
                                    <div>{review.senderName}</div>
                                    <div className="flex text-white-500 text-xl mb-2 xs:hidden">
                                        {Array.from({ length: 5 }).map(
                                            (_, i) => (
                                                <span key={i}>
                                                    {i < Number(review.rating)
                                                        ? "★"
                                                        : ""}
                                                </span>
                                            )
                                        )}
                                    </div>
                                    <div className="md:hidden">
                                        {review.content.length > 100
                                            ? review.content.slice(0, 100) +
                                              "..."
                                            : review.content}
                                    </div>
                                    <div className="xs:text-right">
                                        {review.isApproved
                                            ? "Опубліковано"
                                            : "Не опубліковано"}
                                    </div>

                                    <div className="lg:hidden">
                                        {formatDate(review.createdAt || "")} /{" "}
                                        {formatDate(review.updatedAt || "")}
                                    </div>
                                    <div className="flex gap-[10px] justify-end lg:justify-start lg:hidden">
                                        <ButtonWithIcon
                                            onClick={() => {
                                                openModal("reviewInfo", review);
                                            }}
                                        >
                                            <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                        </ButtonWithIcon>
                                        <ButtonWithIcon
                                            onClick={() => {
                                                openModal(
                                                    "reviewReply",
                                                    review
                                                );
                                            }}
                                        >
                                            <ArrowIcon className="rotate-270 transform scale-x-[-1] w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[2.5] group-hover:stroke-black fill-none" />
                                        </ButtonWithIcon>
                                        <ApproveButtonWithIcon
                                            onClick={() => {
                                                openModal(
                                                    "reviewApprove",
                                                    review
                                                );
                                            }}
                                        >
                                            <ApproveIcon className="w-[24px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-white" />
                                        </ApproveButtonWithIcon>
                                        <DeleteButtonWithIcon
                                            onClick={() => {
                                                openModal(
                                                    "reviewDelete",
                                                    review
                                                );
                                            }}
                                        >
                                            <TrashIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[1.7] fill-none" />
                                        </DeleteButtonWithIcon>
                                    </div>
                                </div>
                                <div className="gap-[10px] hidden lg:flex w-full">
                                    <ButtonWithIcon
                                        className="w-full"
                                        onClick={() => {
                                            openModal("reviewInfo", review);
                                        }}
                                    >
                                        <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                    <ButtonWithIcon
                                        className="w-full"
                                        onClick={() => {
                                            openModal("reviewReply", review);
                                        }}
                                    >
                                        <ArrowIcon className="rotate-270 transform scale-x-[-1] w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[2.5] group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <ApproveButtonWithIcon
                                        className="w-full flex items-center justify-center"
                                        onClick={() => {
                                            openModal("reviewApprove", review);
                                        }}
                                    >
                                        <ApproveIcon className="w-[24px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-white" />
                                    </ApproveButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        className="w-full flex items-center justify-center"
                                        onClick={() => {
                                            openModal("reviewDelete", review);
                                        }}
                                    >
                                        <TrashIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[1.7] fill-none" />
                                    </DeleteButtonWithIcon>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="relative flex min-h-[200px] items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] overflow-hidden">
                    <div className="font-bold text-3xl z-1">
                        Список відгуків порожній
                    </div>
                    {/* <OrderIcon className="absolute fill-none stroke-2 stroke-black top-[-60] right-20 w-[400px] rotate-20 opacity-20 pointer-events-none" /> ЗАМІНИТИ */}
                </div>
            )}

            {selectedReview && (
                <>
                    <ReviewInfoModal
                        isOpen={activeModal === "reviewInfo"}
                        onClose={closeModal}
                        review={selectedReview}
                    />
                    <ReviewReplyModal
                        isOpen={activeModal === "reviewReply"}
                        onClose={closeModal}
                        review={selectedReview}
                    />
                    <ApproveReviewModal
                        isOpen={activeModal === "reviewApprove"}
                        onClose={closeModal}
                        review={selectedReview}
                    />
                    <DeleteReviewModal
                        isOpen={activeModal === "reviewDelete"}
                        onClose={closeModal}
                        review={selectedReview}
                    />
                </>
            )}
        </div>
    );
}

export default Reviews;
