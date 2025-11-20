interface TitleProps {
    title: string;
}

export function Title({ title }: TitleProps) {
    return (
        <div className="flex xs:flex-col justify-between items-center xs:items-start gap-[10px] px-[20px] font-perandory tracking-wider">
            <div className="text-5xl">{title}:</div>
        </div>
    );
}
