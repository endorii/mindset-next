import { getCurrentUserSSR } from "@/shared/api/authFetch.api";
import { Footer, Header } from "@/shared/components/layout";
import Container from "@/shared/ui/layout/Container";
import { useUserStore } from "@/store/userStore";
import { ReactNode } from "react";

async function SiteLayout({ children }: { children: ReactNode }) {
    const { user, accessToken } = await getCurrentUserSSR();

    console.log({ user, accessToken });

    // Гідруємо Zustand store (серверний код не викликає хук)
    useUserStore.getState().setUser(user, accessToken || "");

    return (
        <>
            <Header user={user} />
            <Container>{children}</Container>
            <Footer />
        </>
    );
}

export default SiteLayout;
