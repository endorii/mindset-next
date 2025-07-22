interface INavigationHideTextWrapperProps {
    navOpen?: boolean;
    children: React.ReactNode;
}

function NavigationHideTextWrapper({
    navOpen,
    children,
}: INavigationHideTextWrapperProps) {
    return (
        <span
            className={`group-hover:text-black transition-all duration-200 whitespace-nowrap ${
                navOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
        >
            {children}
        </span>
    );
}

export default NavigationHideTextWrapper;
