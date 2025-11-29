import { IconProps } from "../interfaces/interfaces";

export function WearIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 32 32" className={`${className ?? null}`}>
            <path
                d="M25,6l-6-1c0,1.657-1.343,3-3,3s-3-1.343-3-3L7,6l-4,7l5,3v12h16V16l5-3L25,6z M22,12v14H10V12
	H8v1.668l-2.292-1.375l2.557-4.476l3.28-0.547C12.374,8.889,14.06,10,16,10s3.626-1.111,4.454-2.73l3.28,0.547l2.557,4.476
	L24,13.668V12H22z"
            />
        </svg>
    );
}
