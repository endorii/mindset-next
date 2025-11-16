interface ShopTitleProps {
    title: string;
}

export function ShopTitle({ title }: ShopTitleProps) {
    return (
        <div className="text-white relative px-[30px] sm:px-[10px]">
            <div className="text-8xl lg:text-7xl md:text-6xl sm:text-5xl font-extrabold font-perandory tracking-wider">
                {title}
            </div>
        </div>
    );
}
