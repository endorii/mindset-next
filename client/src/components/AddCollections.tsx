import { useCreateCollectionMutation } from "@/lib/features/collections/collections.Slice";

export default function AddCollection() {
    const [createCollection] = useCreateCollectionMutation();

    const handleSubmit = async () => {
        const newCollection = {
            name: "Нова колекція",
            path: "/new-collection",
            banner: "/images/banner.jpg",
        };

        await createCollection(newCollection);
    };

    return <button onClick={handleSubmit}>Додати Колекцію</button>;
}
