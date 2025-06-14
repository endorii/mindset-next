import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="min-h-[63vh] mt-[115px] px-[30px] py-[30px] pt-0">
            {children}
        </div>
    );
};

export default Container;
