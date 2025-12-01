import Image from "next/image";

type PropType = {
    selected: boolean;
    index: number;
    onClick: () => void;
    src: string;
};

export const Thumb: React.FC<PropType> = ({
    selected,
    index,
    onClick,
    src,
}) => {
    return (
        <div
            className={
                "embla-thumbs__slide" +
                (selected ? " embla-thumbs__slide--selected" : "")
            }
        >
            <button
                onClick={onClick}
                type="button"
                className="embla-thumbs__button"
            >
                <Image
                    src={src}
                    alt={`Thumbnail ${index}`}
                    width={100}
                    height={100}
                    className="object-cover h-[100px] w-full"
                />
            </button>
        </div>
    );
};
