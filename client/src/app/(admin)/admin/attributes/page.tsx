"use client";

import { useState } from "react";
import { ColorSection } from "@/features/admin/attributes/product-colors/components/ColorSection";
import { TypeSection } from "@/features/admin/attributes/product-types/components/TypeSection";
import { SizeSection } from "@/features/admin/attributes/product-sizes/components/SizeSection";
import { ChooseButton } from "@/shared/ui/buttons";

const ATTRIBUTES = ["кольори", "типи", "розміри"];

function AdminAttributes() {
    const [selectedAttribute, setSelectedAttribute] =
        useState<string>("кольори");

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex xs:flex-col items-center xs:items-start gap-[10px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[10px] w-full">
                {ATTRIBUTES.map((attr, i) => (
                    <ChooseButton
                        key={i}
                        isActive={attr === selectedAttribute}
                        onClick={() => setSelectedAttribute(attr)}
                        className="w-full"
                    >
                        {attr}
                    </ChooseButton>
                ))}
            </div>

            {selectedAttribute === "кольори" && <ColorSection />}
            {selectedAttribute === "типи" && <TypeSection />}
            {selectedAttribute === "розміри" && <SizeSection />}
        </div>
    );
}

export default AdminAttributes;
