import Label from "./Label";

interface RenderAttributeFieldProps {
    label: string;
    allItems: { id: string; name: string }[] | undefined;
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    errorMessage?: string;
}

function RenderAttributeField({
    label,
    allItems,
    selected,
    setSelected,
    errorMessage,
}: RenderAttributeFieldProps) {
    const toggleSelect = (
        id: string,
        selected: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((v) => v !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto border border-white/10 rounded p-2 bg-black/10">
                {allItems?.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                            console.log(item);

                            toggleSelect(item.id, selected, setSelected);
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                            selected.includes(item.id)
                                ? "bg-white text-black cursor-default"
                                : "border border-white/30 hover:bg-white/20"
                        }`}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
            {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
        </div>
    );
}

export default RenderAttributeField;
