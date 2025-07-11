import { IIconsProps } from "../types/types";

const CardIcon = ({ className }: IIconsProps) => {
    return (
        <svg viewBox="0 0 24 24" className={className}>
            <path d="M2 9C2 6.23858 4.23858 4 7 4H17C19.7614 4 22 6.23858 22 9V15C22 17.7614 19.7614 20 17 20H7C4.23858 20 2 17.7614 2 15V9ZM7 6C5.69378 6 4.58254 6.83481 4.17071 8H19.8293C19.4175 6.83481 18.3062 6 17 6H7ZM20 12H4V15C4 16.6569 5.34315 18 7 18H17C18.6569 18 20 16.6569 20 15V12Z" />
        </svg>
    );
};

export default CardIcon;
