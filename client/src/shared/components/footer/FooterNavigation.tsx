import { FooterNavList } from "./FooterNavList";
import { FooterNavListItem } from "./FooterNavListItem";

export function FooterNavigation() {
    return (
        <>
            <FooterNavList title="Navigation">
                <FooterNavListItem href="/">Home</FooterNavListItem>
                <FooterNavListItem href="/cart">Cart</FooterNavListItem>
                <FooterNavListItem href="/favorites">
                    Favorites
                </FooterNavListItem>
                <FooterNavListItem href="/account">
                    Account/Login
                </FooterNavListItem>
            </FooterNavList>

            <FooterNavList title="Information">
                <FooterNavListItem href="#">Our policy</FooterNavListItem>
                <FooterNavListItem href="#">Refund</FooterNavListItem>
                <FooterNavListItem href="#">FAQ</FooterNavListItem>
            </FooterNavList>
        </>
    );
}
