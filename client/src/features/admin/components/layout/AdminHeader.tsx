import { AccountIcon, SearchIcon } from "@/shared/icons";

function AdminHeader() {
    return (
        <header className="fixed top-0 py-[10px] px-[20px] md:px-[35px] h-[65px] md:h-[90px] flex gap-[5%] items-center w-full shadow-custom bg-transparent border-b border-white/10 z-[10]">
            <div className="min-w-[220px] rounded-xl bg-white/5 shadow-lg px-[25px] py-[10px] pb-[13px] backdrop-blur-2xl border border-white/5 text-white font-bold text-4xl tracking-tighter">
                mind panel
            </div>

            <div className="w-full flex items-center gap-[10px] justify-end">
                <div className="group rounded-xl bg-white/5 shadow-lg p-[17px] backdrop-blur-2xl border border-white/5 text-white cursor-pointer">
                    <SearchIcon className="w-[24px] fill-none stroke-white/20 stroke-2 group-hover:stroke-white transition-all duration-300" />
                </div>

                <div className="flex items-center gap-[30px] rounded-xl bg-white/5 shadow-lg px-[25px] py-[13px] pb-[18px] backdrop-blur-2xl border border-white/5 text-white">
                    <div className="flex items-center gap-[15px]">
                        <AccountIcon className="w-[25px] fill-white" />
                        <div className="mt-[3px]">admintest@gmail.com</div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
