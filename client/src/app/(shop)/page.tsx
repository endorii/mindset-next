import CollectionsWrapper from "@/features/collections/components/CollectionsWrapper";
import { Welcome } from "@/shared/components";
import ShopTitle from "@/shared/ui/titles/ShopTitle";

export default function HomePage() {
    return (
        <div>
            <Welcome />
            <div className="flex flex-col gap-[50px]">
                <ShopTitle title="Колекції" subtitle="Collections" />
                <CollectionsWrapper />
            </div>
        </div>
    );
}
