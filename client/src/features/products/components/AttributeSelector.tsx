interface AttributeSelectorProps<T> {
    attributeItems: T[];
    label: string;
    getName: (item: T) => string;
    chosenValue: string;
    setFunction: (value: string) => void;
}

function AttributeSelector<T>({
    attributeItems,
    label,
    getName,
    chosenValue,
    setFunction,
}: AttributeSelectorProps<T>) {
    if (!attributeItems.length) return null;

    return (
        <div className="flex items-center gap-[30px]">
            <div>{label}:</div>
            <ul className="flex flex-wrap gap-[10px]">
                {attributeItems.map((item, i) => {
                    const name = getName(item);
                    const isSelected = chosenValue === name;

                    return (
                        <li key={i}>
                            <button
                                onClick={() => setFunction(name)}
                                className={`px-[15px] py-[4px] border border-white/10 rounded-xl hover:border-white/20 cursor-pointer ${
                                    isSelected
                                        ? "bg-white text-black"
                                        : "border-gray-200"
                                }`}
                            >
                                {name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AttributeSelector;
