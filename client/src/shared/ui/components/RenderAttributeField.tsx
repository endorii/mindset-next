import { Label } from "./Label";

interface RenderAttributeFieldProps {
    label: string;
    allItems: { id: string; name: string }[] | undefined;
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    errorMessage?: string;
}

export function RenderAttributeField({
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
        <div className="flex flex-col gap-[3px]">
            <Label>{label}*</Label>
            <div
                className={`flex flex-wrap gap-[10px] max-w-[600px] overflow-y-auto border ${
                    errorMessage ? "border-red-500" : "border-white/10"
                } p-[10px] bg-black/10`}
            >
                {allItems?.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                            toggleSelect(item.id, selected, setSelected);
                        }}
                        className={`px-3 py-1 text-sm border ${
                            selected.includes(item.id)
                                ? "bg-white text-black cursor-default"
                                : "border-white/10 hover:bg-white/5"
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
