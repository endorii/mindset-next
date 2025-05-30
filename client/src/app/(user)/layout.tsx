import Container from "@/components/Container/Container";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
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
