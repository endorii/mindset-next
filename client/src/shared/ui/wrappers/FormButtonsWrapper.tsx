export function FormButtonsWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-end gap-[15px] mt-[20px]">{children}</div>
    );
}
