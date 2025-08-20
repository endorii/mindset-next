import ButtonSkeleton from "./ButtonSkeleton";
import TitleSkeleton from "./TitleSkeleton";

function TitleWithButtonSkeleton() {
    return (
        <div className="flex xs:flex-col justify-between items-center xs:items-start gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[20px]">
            <TitleSkeleton />
            <ButtonSkeleton />
        </div>
    );
}

export default TitleWithButtonSkeleton;
