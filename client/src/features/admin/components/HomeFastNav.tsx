import { AdminNavigationLink } from "@/shared/ui/buttons";
import { adminPanelNavigationLinks } from "../utils/navigationLinks";

export function HomeFastNav() {
    return (
        <div
            className={`flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]`}
        >
            <div>Швидка навігація по сторінкам</div>
            <div className="flex gap-[8px] group">
                {adminPanelNavigationLinks.map(({ href, text }) => (
                    <AdminNavigationLink href={href} key={text}>
                        {text}
                    </AdminNavigationLink>
                ))}
            </div>
        </div>
    );
}
