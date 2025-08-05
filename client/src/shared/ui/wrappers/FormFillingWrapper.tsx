import React from "react";

function FormFillingWrapper({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col gap-[15px]">{children}</div>;
}

export default FormFillingWrapper;
