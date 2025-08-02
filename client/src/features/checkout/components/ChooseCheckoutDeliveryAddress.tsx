import { INovaPostDataObj } from "@/features/orders/types/orders.types";
import { Label } from "recharts";

interface ChooseCheckoutDeliveryAddressProps {
    areas: INovaPostDataObj[];
    selectedArea: INovaPostDataObj | null;
    setSelectedArea: (area: INovaPostDataObj | null) => void;
    cities: INovaPostDataObj[];
    selectedCity: INovaPostDataObj | null;
    setSelectedCity: (city: INovaPostDataObj | null) => void;
    warehouses: INovaPostDataObj[];
    selectedWarehouse: INovaPostDataObj | null;
    setSelectedWarehouse: (wh: INovaPostDataObj | null) => void;
}

function ChooseCheckoutDeliveryAddress({
    areas,
    selectedArea,
    setSelectedArea,
    cities,
    selectedCity,
    setSelectedCity,
    warehouses,
    selectedWarehouse,
    setSelectedWarehouse,
}: ChooseCheckoutDeliveryAddressProps) {
    return (
        <div className="flex flex-col gap-[15px] w-1/2">
            <div className="text-3xl font-thin">Адреса доставки</div>
            <hr className="border-t border-white/10" />
            <div className="flex gap-[15px]">
                <div className="flex flex-col gap-[13px] w-full">
                    <div className="flex flex-col gap-[7px]">
                        <Label>Область</Label>
                        <select
                            className="border border-white/10 rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer"
                            value={selectedArea?.Ref || ""}
                            onChange={(e) => {
                                const area =
                                    areas.find(
                                        (a) => a.Ref === e.target.value
                                    ) || null;
                                setSelectedArea(area);
                            }}
                        >
                            <option value="" disabled>
                                Оберіть область
                            </option>
                            {areas.map((area) => (
                                <option key={area.Ref} value={area.Ref}>
                                    {area.Description}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <Label>Місто</Label>
                        <select
                            className="border border-white/10 rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer"
                            value={selectedCity?.Ref || ""}
                            onChange={(e) => {
                                const city =
                                    cities.find(
                                        (c) => c.Ref === e.target.value
                                    ) || null;
                                setSelectedCity(city);
                            }}
                            disabled={!selectedArea}
                        >
                            <option value="" disabled>
                                Оберіть місто
                            </option>
                            {cities.map((city) => (
                                <option key={city.Ref} value={city.Ref}>
                                    {city.Description}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <Label>Відділення/поштомати</Label>
                        <select
                            className="border border-white/10 rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer"
                            value={selectedWarehouse?.Ref || ""}
                            onChange={(e) => {
                                const wh =
                                    warehouses.find(
                                        (w) => w.Ref === e.target.value
                                    ) || null;
                                setSelectedWarehouse(wh);
                            }}
                            disabled={!selectedCity}
                        >
                            <option value="" disabled>
                                Оберіть відділення
                            </option>
                            {warehouses.map((wh) => (
                                <option key={wh.Ref} value={wh.Ref}>
                                    {wh.Description}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChooseCheckoutDeliveryAddress;
