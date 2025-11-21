import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";

export function FiltersWrapper({
    children,
    resetFilters,
}: {
    children: React.ReactNode;
    resetFilters: () => void;
}) {
    return (
        <div className="flex gap-[20px] flex-wrap">
            {children}
            <MonoButtonUnderlined onClick={resetFilters}>
                Reset Filters
            </MonoButtonUnderlined>
        </div>
    );
}
