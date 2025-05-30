import { IIconsProps } from "@/types/types";

const CloseIcon = ({ className }: IIconsProps) => {
    return (
        <svg
            viewBox="-0.5 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M3 21.32L21 3.32001"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 3.32001L21 21.32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CloseIcon;
