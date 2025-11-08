import { getCurrentUserSSR } from "@/shared/api/authFetch.api";
import { AuthStoreInitializer } from "@/shared/components/AuthStoreInitializer";
import { Footer, Header } from "@/shared/components/layout";
import Container from "@/shared/ui/layout/Container";
import { ReactNode } from "react";

async function SiteLayout({ children }: { children: ReactNode }) {
    const { user, accessToken } = await getCurrentUserSSR();

    return (
        <>
            <AuthStoreInitializer user={user} accessToken={accessToken || ""} />
            <Header serverUser={user} />
            <Container>{children}</Container>
            <Footer />
        </>
    );
}

export default SiteLayout;
