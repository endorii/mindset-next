import { IIconsProps } from "../types/types";

const SearchIcon = ({ className }: IIconsProps) => {
    return (
        <svg viewBox="0 0 24 24" className={className}>
            <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />
        </svg>
    );
};

export default SearchIcon;
