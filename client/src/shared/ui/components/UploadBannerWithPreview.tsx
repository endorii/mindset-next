import Image from "next/image";
import { Label } from "./Label";

interface UploadBannerWithPreviewProps {
    image: string | null;
    handleBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    bannerError: string | null;
}

export function UploadBannerWithPreview({
    image,
    handleBannerChange,
    bannerError,
}: UploadBannerWithPreviewProps) {
    return (
        <div className="flex flex-col gap-[7px] w-full">
            <Label>Банер</Label>
            <label
                htmlFor="banner"
                className={`group border min-h-[200px] border-dashed ${
                    bannerError ? "border-red-500" : "border-white/10"
                } flex items-center justify-center cursor-pointer hover:bg-white/3 overflow-hidden group-hover:text-white transition-all duration-300`}
            >
                {image ? (
                    <Image
                        src={image}
                        alt="banner"
                        width={450}
                        height={300}
                        className="w-200"
                    />
                ) : (
                    <span className="text-4xl text-white/40 group-hover:text-white transition-all duration-300">
                        +
                    </span>
                )}
            </label>
            <input
                type="file"
                id="banner"
                accept="image/*"
                onChange={handleBannerChange}
                className="hidden"
            />
            {bannerError && (
                <p className="text-red-500 text-sm mt-1">{bannerError}</p>
            )}
        </div>
    );
}
