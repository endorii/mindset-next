import { IColor } from "@/features/admin/attributes/product-colors/types/product-color.types";
import { ISize } from "@/features/admin/attributes/product-sizes/types/product-size.types";
import { IType } from "@/features/admin/attributes/product-types/types/product-type.types";
import {
    IProductToColor,
    IProductToSize,
    IProductToType,
} from "@/features/products/types/products.types";

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
    return "Невідомо";
}

function AtributesInfoField({ label, atributeList }: AtributesInfoFieldProps) {
    return (
        <div className="flex flex-col gap-[7px]">
            <label className="font-semibold text-sm">{label}</label>
            <div className="border border-white/10 bg-black/10 rounded px-[10px] py-[7px] flex flex-wrap gap-[10px] w-[300px]">
                {atributeList.length > 0
                    ? atributeList.map((item, i) => (
                          <div
                              key={i}
                              className="flex gap-[5px] items-center px-3 py-1 rounded-full text-sm border border-white/30 bg-white text-black"
                          >
                              <div>{getAtributeName(item)}</div>
                          </div>
                      ))
                    : "Не вказано"}
            </div>
        </div>
    );
}

export default AtributesInfoField;
