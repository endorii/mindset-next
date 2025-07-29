import { Controller, Control, FieldErrors } from "react-hook-form";

interface StarRatingProps {
    control: Control<any>;
    errorMessage: string;
}

const StarRating = ({ control, errorMessage }: StarRatingProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Оцініть товар*</label>

            <Controller
                name="rating"
                control={control}
                rules={{
                    required: "Виберіть оцінку",
                    min: { value: 1, message: "Мінімум 1" },
                    max: { value: 5, message: "Максимум 5" },
                }}
                render={({ field }) => (
                    <div className="flex gap-1">
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
};

export default StarRating;
