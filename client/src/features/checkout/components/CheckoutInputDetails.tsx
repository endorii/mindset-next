import { InputField } from "@/shared/ui/inputs/InputField";

interface CheckoutInputDetailsProps {
    userInitials: string;
    setUserInitials: (value: string) => void;
    userPhone: string;
    setUserPhone: (value: string) => void;
    userEmail: string;
    setUserEmail: (value: string) => void;
}

export function CheckoutInputDetails({
    userInitials,
    setUserInitials,
    userPhone,
    setUserPhone,
    userEmail,
    setUserEmail,
}: CheckoutInputDetailsProps) {
    return (
        <div className="flex flex-col gap-[10px] w-1/2">
            <div className="text-3xl font-thin">Shipping details</div>
            <hr className="border-t border-white/5" />
            <div className="flex flex-col gap-[15px] w-full">
                <InputField
                    label="Full name*"
                    required
                    value={userInitials}
                    placeholder="Petrenko Petro Petrovych"
                    onChangeValue={(e) => setUserInitials(e.target.value)}
                />
                <InputField
                    label="Phone number*"
                    required
                    value={userPhone}
                    placeholder="(09*)-**-**-***"
                    onChangeValue={(e) => setUserPhone(e.target.value)}
                />
                <InputField
                    label="E-mail"
                    value={userEmail}
                    placeholder="petro@gmail.com"
                    onChangeValue={(e) => setUserEmail(e.target.value)}
                />
            </div>
        </div>
    );
}
