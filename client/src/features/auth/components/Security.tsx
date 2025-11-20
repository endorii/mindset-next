import { LoginComponentsWrapper } from "@/shared/ui/wrappers";

export function Security() {
    return (
        <LoginComponentsWrapper title="Protecting your information">
            <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px]">
                    <p className="text-neutral-200 text-sm">
                        We take the security of your personal data seriously and
                        do not share it with third parties. Your right to
                        privacy is paramount to us.
                    </p>

                    <p className="text-neutral-200 text-sm">
                        Our system uses modern methods of information
                        protection, including multi-level authentication,
                        encryption, and regular security audits.
                    </p>

                    <ul className="flex flex-col gap-[3px] text-sm list-disc list-inside text-neutral-300">
                        <li>Your data is stored securely</li>
                        <li>We use a secure connection (SSL)</li>
                        <li>Information is not shared with third parties</li>
                        <li>Privacy is our priority</li>
                        <li>Regularly updated security policy</li>
                    </ul>

                    <div className="flex flex-wrap gap-[10px] mt-2 text-xs text-green-300">
                        <span className="bg-green-800/30 px-2 py-1  ">
                            SSL Secure
                        </span>
                        <span className="bg-green-800/30 px-2 py-1  ">
                            GDPR Ready
                        </span>
                    </div>

                    <p className="text-xs text-neutral-300 mt-1">
                        🔒 Over 100 users have already entrusted us with their
                        data.
                    </p>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <p className="text-sm text-neutral-200">
                        If you have any questions about how we store or process
                        your data, please contact our support team and we will
                        be happy to answer.
                    </p>

                    <div className="flex flex-col gap-[5px]">
                        <a
                            href="/privacy-policy"
                            className="text-xs underline text-blue-400 hover:text-blue-300 w-fit"
                        >
                            More about privacy policy
                        </a>
                        <p className="text-xs text-neutral-400">
                            Last updated: June 2025
                        </p>
                    </div>
                </div>
            </div>
        </LoginComponentsWrapper>
    );
}
