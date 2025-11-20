export function FormFillingWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="flex flex-col gap-[20px]">{children}</div>;
}
