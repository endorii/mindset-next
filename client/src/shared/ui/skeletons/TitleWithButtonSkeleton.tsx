import { ButtonSkeleton } from "./ButtonSkeleton";
import { TitleSkeleton } from "./TitleSkeleton";

export function TitleWithButtonSkeleton() {
    return (
        <div className="flex xs:flex-col justify-between items-center xs:items-start gap-[15px]">
            <TitleSkeleton />
            <ButtonSkeleton />
        </div>
    );
}
