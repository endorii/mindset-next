interface TitleProps {
    title: string;
}

export function Title({ title }: TitleProps) {
    return (
        <div className="flex xs:flex-col justify-between items-center xs:items-start gap-[10px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[20px] py-[15px] font-perandory tracking-wider mt-1">
            <div className="text-4xl ">{title}:</div>
        </div>
    );
}
