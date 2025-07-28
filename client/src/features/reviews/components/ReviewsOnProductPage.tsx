import MonoLink from "@/shared/ui/buttons/MonoLink";
import React from "react";

const reviews = [
    {
        id: 1,
        name: "Ірина Ковальчук",
        rating: 5,
        date: "вчора",
        advantages: "Приємна тканина, не линяє після прання",
        content:
            "Футболка дуже сподобалась! Тканина приємна до тіла, не парить. Після кількох прань колір залишився яскравим. Розмір відповідає таблиці.",
    },
    {
        id: 2,
        name: "Олексій Мельник",
        rating: 4,
        date: "позавчора",
        advantages: "Хороший крій, приємна ціна",
        content:
            "Футболка виглядає стильно. Трохи завелика в плечах, але не критично. За свою ціну — супер. Буду брати ще.",
    },
    {
        id: 3,
        name: "Марина Шевченко",
        rating: 5,
        date: "25 липня 2025",
        advantages: "Якісний друк, не скочується",
        content:
            "Замовляла чоловіку — йому сподобалось! Принт чіткий, не тріскається. Доставка була швидкою, рекомендую.",
    },
    // {
    //     id: 4,
    //     name: "Дмитро Мазур",
    //     rating: 3,
    //     date: "24 липня 2025",
    //     advantages: "Колір як на фото",
    //     content:
    //         "Загалом непогана, але матеріал здається трохи тонким. Для літа ок, але на осінь — не варіант.",
    // },
    // {
    //     id: 5,
    //     name: "Анна Романюк",
    //     rating: 5,
    //     date: "22 липня 2025",
    //     advantages: "Універсальна, підходить до всього",
    //     content:
    //         "Футболка просто ідеальна! Підійшла як під джинси, так і під спідницю. Замовила ще одну в іншому кольорі.",
    // },
];

const ratingStats = [
    { stars: 5, count: 240 },
    { stars: 4, count: 17 },
    { stars: 3, count: 4 },
    { stars: 2, count: 3 },
    { stars: 1, count: 8 },
];

function ReviewsOnProductPage() {
    const total = 307;

    return (
        <div className="text-white rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <h2 className="text-2xl font-bold mb-4">Відгуки про товар (307)</h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Оцінка */}
                <div className="flex flex-col gap-[20px] w-full md:w-1/3">
                    <div className="flex gap-[7px] text-xl mb-4 ">
                        <div className="font-light text-white/40">
                            Середня оцінка користувачів{" "}
                        </div>
                        <span className=" font-semibold text-white">
                            4.76/5 ★
                        </span>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        {ratingStats.map((item) => (
                            <div
                                key={item.stars}
                                className="flex items-center gap-2 mb-1"
                            >
                                <span className="w-5 text-sm">
                                    {item.stars}
                                </span>
                                <div className="flex-1 border border-white/10 rounded h-5 overflow-hidden">
                                    <div
                                        className="bg-white h-full"
                                        style={{
                                            width: `${
                                                (item.count / total) * 100
                                            }%`,
                                        }}
                                    />
                                </div>
                                <span className="text-sm w-8 text-right">
                                    {item.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Відгуки */}
                <div className="flex flex-col gap-[5px] w-full md:w-2/3">
                    <div className="">
                        {/* Review cards */}
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="border border-white/10 bg-white/3 rounded-lg p-4 mb-4 shadow-sm"
                            >
                                <div className="flex justify-between mb-1">
                                    <span className="font-semibold">
                                        {review.name}
                                    </span>
                                    <span className="text-xs text-white/50">
                                        {review.date}
                                    </span>
                                </div>

                                {/* Stars */}
                                <div className="flex text-white-500 text-xl mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i}>
                                            {i < review.rating ? "★" : "☆"}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-sm">{review.content}</div>

                                {/* Actions */}
                                <div className="mt-3 flex gap-2 text-sm">
                                    <div className="flex items-center gap-1 px-[10px] py-[7px] border border-white/10 rounded-xl cursor-pointer hover:bg-black/20">
                                        <span role="img" aria-label="like">
                                            👍
                                        </span>{" "}
                                        1
                                    </div>
                                    <div className="flex items-center gap-1 px-[10px] py-[7px] border border-white/10 rounded-xl cursor-pointer hover:bg-black/20">
                                        <span role="img" aria-label="dislike">
                                            👎
                                        </span>{" "}
                                        0
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <MonoLink href={"#"}>Читати всі відгуки</MonoLink>
                </div>
            </div>
        </div>
    );
}

export default ReviewsOnProductPage;
