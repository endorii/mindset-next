interface IH3Props {
    children: React.ReactNode;
    className?: string;
}

function H3({ children, className }: IH3Props) {
    const baseStyles =
        "px-[10px] absolute top-[-60px] left-[50%] translate-x-[-50%] text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-black/70 to-white/30 border text-[200px] w-full";
    const combinedClassName = className
        ? `${baseStyles} ${className}`
        : baseStyles;

    return <h3 className={combinedClassName}>{children}</h3>;
}

export default H3;
