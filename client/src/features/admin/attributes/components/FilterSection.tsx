import { ChooseButton } from "@/shared/ui/buttons";

interface FilterSectionProps {
    title: string;
    filters: string[];
    selectedItem: string;
    onFilterClick: (filter: string) => void;
}

export function FilterSection({
    title,
    filters,
    selectedItem,
    onFilterClick,
}: FilterSectionProps) {
    return (
        <div className="flex sm:flex-col items-center sm:items-start gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="font-semibold">{title}:</div>
            <div className="flex flex-wrap gap-[10px] w-full">
                {filters.map((name, i) => (
                    <ChooseButton
                        key={i}
                        onClick={() => onFilterClick(name)}
                        isActive={name === selectedItem}
                    >
                        {name}
                    </ChooseButton>
                ))}
            </div>
        </div>
    );
}
