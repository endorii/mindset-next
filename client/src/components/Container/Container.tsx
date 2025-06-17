import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="min-h-[63vh] mt-[85px] px-[20px] py-[20px] pt-0">
            {children}
        </div>
    );
};

export default Container;
