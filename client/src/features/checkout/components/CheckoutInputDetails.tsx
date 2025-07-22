import InputField from "@/shared/ui/inputs/InputField";

interface CheckoutInputDetailsProps {
    userInitials: string;
    setUserInitials: (value: string) => void;
    userPhone: string;
    setUserPhone: (value: string) => void;
    userEmail: string;
    setUserEmail: (value: string) => void;
}

function CheckoutInputDetails({
    userInitials,
    setUserInitials,
    userPhone,
    setUserPhone,
    userEmail,
    setUserEmail,
}: CheckoutInputDetailsProps) {
    return (
        <div className="flex flex-col gap-[15px] w-1/2">
            <div className="text-3xl font-thin">Реквізити для відправки</div>
            <hr className="border-t border-white/10" />
            <div className="flex flex-col gap-[13px] w-full">
                <InputField
                    label="Ініціали (ПІБ)*"
                    required
                    value={userInitials}
                    placeholder="Петренко Петро Петрович"
                    onChangeValue={(e) => setUserInitials(e.target.value)}
                />
                <InputField
                    label="Номер телефону*"
                    required
                    value={userPhone}
                    placeholder="(09*)-**-**-***"
                    onChangeValue={(e) => setUserPhone(e.target.value)}
                />
                <InputField
                    label="Електронна пошта"
                    value={userEmail}
                    placeholder="petro@gmail.com"
                    onChangeValue={(e) => setUserEmail(e.target.value)}
                />
            </div>
        </div>
    );
}

export default CheckoutInputDetails;
