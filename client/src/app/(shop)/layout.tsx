import Container from "@/shared/ui/layout/Container";
import CustomCursor from "@/shared/components/effects/CustomCursor";
import Footer from "@/shared/components/layout/Footer";
import Header from "@/shared/components/layout/Header";
import React from "react";

function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <CustomCursor />
            <Header />
            <Container>{children}</Container>
            <Footer />
        </div>
    );
}

export default SiteLayout;
