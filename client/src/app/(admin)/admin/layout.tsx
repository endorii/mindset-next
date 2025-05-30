"use client";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="fixed top-[80px] left-0 w-full z-10">
                admin panel
            </div>

            <main className="mt-[185px]">{children}</main>
        </>
    );
}
