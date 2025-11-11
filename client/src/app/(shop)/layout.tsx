import { getCurrentUserSSR } from "@/shared/api/authFetch.api";
import { Footer, Header } from "@/shared/components/layout";
import { Container } from "@/shared/ui/layout/Container";
import { ReactNode } from "react";

async function SiteLayout({ children }: { children: ReactNode }) {
    const { user } = await getCurrentUserSSR();
    return (
        <>
            <Header serverUser={user} />
            <Container>{children}</Container>
            <Footer />
        </>
    );
}

export default SiteLayout;
