interface TitleProps {
    title: string;
}

export function Title({ title }: TitleProps) {
    return (
        <div className="flex xs:flex-col justify-between items-center xs:items-start gap-[10px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[20px]">
            <div className="text-2xl xs:text-xl font-bold">{title}:</div>
        </div>
    );
}
