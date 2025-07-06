import React from "react";

function FormButtonsWrapper({ children }: { children: React.ReactNode }) {
    return <div className="flex justify-end gap-[15px]">{children}</div>;
}

export default FormButtonsWrapper;
