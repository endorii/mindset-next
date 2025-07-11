import { IIconsProps } from "../types/types";

const AccountIcon = ({ className }: IIconsProps) => {
    return (
        <svg viewBox="0 0 48 48" className={className}>
            <path d="M0 0h48v48H0z" fill="none" />
            <g>
                <path d="M31.278,25.525C34.144,23.332,36,19.887,36,16c0-6.627-5.373-12-12-12c-6.627,0-12,5.373-12,12 c0,3.887,1.856,7.332,4.722,9.525C9.84,28.531,5,35.665,5,44h38C43,35.665,38.16,28.531,31.278,25.525z M16,16c0-4.411,3.589-8,8-8 s8,3.589,8,8c0,4.411-3.589,8-8,8S16,20.411,16,16z M24,28c6.977,0,12.856,5.107,14.525,12H9.475C11.144,33.107,17.023,28,24,28z" />
            </g>
        </svg>
    );
};

export default AccountIcon;
