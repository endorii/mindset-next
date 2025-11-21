import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
        <div className="flex gap-[10px] items-center">
            <div className="font-semibold">{title}:</div>

            <Select value={selectedItem} onValueChange={onFilterClick}>
                <SelectTrigger>
                    <SelectValue placeholder="Choose filter" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        {filters.map((name, i) => (
                            <SelectItem key={i} value={name}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
