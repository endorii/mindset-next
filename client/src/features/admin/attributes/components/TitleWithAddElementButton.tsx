import { PlusIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";

interface TitleWithAddElementButtonProps {
    title: string;
    onClick: () => void;
    buttonText: string;
}

function TitleWithAddElementButton({
    title,
    onClick,
    buttonText,
}: TitleWithAddElementButtonProps) {
    return (
        <div className="flex xs:flex-col justify-between items-center xs:items-start gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px]">
            <div className="text-2xl xs:text-xl font-bold">{title}:</div>
            <MonoButton onClick={onClick} className="xs:w-full font-bold">
                <div>{buttonText}</div>
                <PlusIcon className="stroke-white stroke-[2.3] w-[30px] group-hover:stroke-black" />
            </MonoButton>
        </div>
    );
}

export default TitleWithAddElementButton;
