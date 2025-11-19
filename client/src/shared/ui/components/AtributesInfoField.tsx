import {
    IProductToColor,
    IProductToSize,
    IProductToType,
} from "@/features/products/types/products.types";
import { Label } from "./Label";

interface AtributesInfoFieldProps {
    label: string;
    atributeList: IProductToColor[] | IProductToSize[] | IProductToType[];
}

function getAtributeName(
    item: IProductToColor | IProductToSize | IProductToType
): string {
    if ("color" in item) return item.color.name;
    if ("size" in item) return item.size.name;
    if ("type" in item) return item.type.name;
    return "Unknown";
}

export function AtributesInfoField({
    label,
    atributeList,
}: AtributesInfoFieldProps) {
    return (
        <div className="flex flex-col gap-[7px]">
            <Label>{label}</Label>
            <div className="border border-white/10 bg-black/10 px-[10px] py-[7px] flex flex-wrap gap-[10px] w-full">
                {atributeList.length > 0
                    ? atributeList.map((item, i) => (
                          <div
                              key={i}
                              className="flex gap-[5px] items-center px-3 py-1 rounded-full text-sm border border-white/30 bg-white text-black"
                          >
                              <div>{getAtributeName(item)}</div>
                          </div>
                      ))
                    : "Not specified"}
            </div>
        </div>
    );
}
