import Image from "next/image";
import Label from "./Label";

interface InfoModalBannerProps {
    image: string;
    w?: number;
}

function InfoModalBanner({ image, w = 450 }: InfoModalBannerProps) {
    return (
        <div className="flex flex-col gap-[7px] w-full">
            <Label>Банер</Label>
            <div className="border border-dashed border-white/10 flex items-center justify-center rounded-md overflow-hidden">
                <Image
                    className="w-full"
                    src={
                        image
                            ? `http://localhost:5000/${image}`
                            : "/placeholder.png"
                    }
                    alt={image ? "Банер" : "Зображення відсутнє"}
                    width={w}
                    height={300}
                />
            </div>
        </div>
    );
}

export default InfoModalBanner;
