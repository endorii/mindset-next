interface ShopTitleProps {
    title: string;
    subtitle: string;
}

export function ShopTitle({ title, subtitle }: ShopTitleProps) {
    return (
        <div className="text-white relative px-[30px] sm:px-[10px]">
            <div className="text-8xl lg:text-7xl md:text-6xl sm:text-5xl font-extrabold">
                {title}
            </div>
            <div className="absolute top-[40px] lg:top-[30px] sm:top-[25px] text-8xl md:text-7xl sm:text-5xl font-qwitcher-grypen text-white/40">
                {subtitle}
            </div>
        </div>
    );
}
