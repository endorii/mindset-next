import { IIconsProps } from "@/types/types";

const ArrowIcon = ({ className }: IIconsProps) => {
    return (
        <svg className={className} viewBox="0 0 24 24">
            <path
                d="M15 7L10 12L15 17"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export default ArrowIcon;
