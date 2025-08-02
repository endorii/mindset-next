import CustomCursor from "@/shared/components/effects/CustomCursor";
import { Header, Footer } from "@/shared/components/layout";
import Container from "@/shared/ui/layout/Container";

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
