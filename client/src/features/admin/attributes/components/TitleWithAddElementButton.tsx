import { PlusIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";

interface TitleWithAddElementButtonProps {
    title: string;
    onClick: () => void;
    buttonText: string;
}

export function TitleWithAddElementButton({
    title,
    onClick,
    buttonText,
}: TitleWithAddElementButtonProps) {
    return (
        <div className="flex xs:flex-col justify-between items-center xs:items-start gap-[15px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[20px]">
            <div className="text-2xl xs:text-xl font-bold">{title}:</div>
            <MonoButton onClick={onClick} className="xs:w-full font-bold">
                <div className="pt-1">{buttonText}</div>
                <PlusIcon className="stroke-white stroke-[2.3] w-[30px] group-hover:stroke-black" />
            </MonoButton>
        </div>
    );
}
