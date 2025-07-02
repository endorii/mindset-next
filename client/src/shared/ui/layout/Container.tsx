import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="min-h-[100vh] pt-[130px] px-[30px] pb-[30px]">
            {children}
        </div>
    );
};

export default Container;
