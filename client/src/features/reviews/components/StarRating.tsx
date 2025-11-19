"use client";

import { Control, Controller } from "react-hook-form";

interface StarRatingProps {
    control: Control<any>;
    errorMessage: string;
}

export function StarRating({ control, errorMessage }: StarRatingProps) {
    return (
        <div className="flex flex-col gap-[5px]">
            <label className="font-semibold text-sm">Rate the product*</label>

            <Controller
                name="rating"
                control={control}
                rules={{
                    required: "Select a rating",
                    min: { value: 1, message: "Minimum 1" },
                    max: { value: 5, message: "Maximum 5" },
                }}
                render={({ field }) => (
                    <div className="flex gap-[5px]">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <span
                                key={num}
                                onClick={() => field.onChange(num)}
                                className={`text-5xl cursor-pointer transition-colors w-full ${
                                    field.value >= num
                                        ? "text-white"
                                        : errorMessage
                                        ? "text-red-500"
                                        : "text-white/30"
                                }`}
                            >
                                {field.value >= num ? "★" : "☆"}
                            </span>
                        ))}
                    </div>
                )}
            />

            {errorMessage && (
                <span className="text-red-500 text-sm">{errorMessage}</span>
            )}
        </div>
    );
}
