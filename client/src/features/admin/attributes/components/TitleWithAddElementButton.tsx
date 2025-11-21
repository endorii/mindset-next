import { PlusIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";
import { Title } from "./Title";

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
        <div className="flex xs:flex-col justify-between items-center xs:items-start gap-[15px]">
            <Title title={title} />
            <MonoButton onClick={onClick} className="xs:w-full font-bold">
                <div className="pt-1">{buttonText}</div>
                <PlusIcon className="stroke-white stroke-[2.3] w-[30px] group-hover:stroke-black" />
            </MonoButton>
        </div>
    );
}
