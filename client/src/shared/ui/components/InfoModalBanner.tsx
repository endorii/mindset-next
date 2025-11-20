import Image from "next/image";
import { Label } from "./Label";

interface InfoModalBannerProps {
    image: string;
    w?: number;
}

export function InfoModalBanner({ image }: InfoModalBannerProps) {
    return (
        <div className="flex flex-col gap-[3px] w-full">
            <Label>Banner</Label>
            <div className="border border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                <Image
                    className="max-h-[400px] object-contain"
                    src={image ? image : "/placeholder.png"}
                    alt={image ? "Banner" : "Image undefined"}
                    width={400}
                    height={400}
                />
            </div>
        </div>
    );
}
