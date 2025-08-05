interface TitleProps {
    title: string;
}

function Title({ title }: TitleProps) {
    return (
        <div className="flex xs:flex-col justify-between items-center xs:items-start gap-[10px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px]">
            <div className="text-2xl xs:text-xl font-bold">{title}:</div>
        </div>
    );
}

export default Title;
