import { IIconsProps } from "../types/types";

const PlusIcon = ({ className }: IIconsProps) => (
    <svg className={className} viewBox="0 0 24 24">
        <path d="M6 12H18M12 6V18" />
    </svg>
);

export default PlusIcon;
