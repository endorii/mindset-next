interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (value: number) => void;
}

const QuantitySelector = ({ quantity, setQuantity }: QuantitySelectorProps) => {
    const options = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="relative flex gap-[30px] items-center">
            <label className="text-white">Кількість</label>

            <select
                className="bg-black border border-white/ text-white rounded px-4 py-2 "
                value={quantity <= 10 ? quantity : "custom"}
                onChange={(e) =>
                    e.target.value === "custom"
                        ? null
                        : setQuantity(+e.target.value)
                }
            >
                {options.map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default QuantitySelector;
