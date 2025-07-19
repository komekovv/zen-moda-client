'use client'
import React from 'react';
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {LocalizedText} from "@/types/types";
import {getLocalizedText} from "@/lib/utils/helpers";
import {useLocale, useTranslations} from "next-intl";

interface ColorOption {
    id: string;
    name: LocalizedText;
    image: string | StaticImport;
    available: boolean;
    code: string;
}

interface ProductColorSelectorProps {
    colors: ColorOption[];
    selectedColor?: string;
    onColorSelect?: (colorId: string) => void;
}

const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({
                                                                       colors,
                                                                       selectedColor,
                                                                       onColorSelect
                                                                   }) => {
    const locale = useLocale();
    const t = useTranslations('product_detail');

    const handleColorSelect = (colorId: string) => {
        const color = colors.find(c => c.id === colorId);
        if (color && color.available) {
            onColorSelect?.(colorId);
        }
    };

    const selectedColorName = getLocalizedText(
        colors.find(c => c.id === selectedColor)?.name || { tk: '', ru: '' },
        locale
    );

    return (
        <div className="mb-2">
            <div className="mb-4 text-body-brand">
                <span className="text-black">{t('color_selector.color_label')} </span>
                <span className="text-passive">{selectedColorName}</span>
            </div>

            <div className="flex gap-2">
                {colors.map((color) => (
                    <div
                        key={color.id}
                        className={`relative w-16 h-16 xl:h-20 xl:w-20 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedColor === color.id
                                ? 'border-primary'
                                : 'border-border'
                        } ${!color.available ? 'cursor-not-allowed' : ''}`}
                        onClick={() => handleColorSelect(color.id)}
                    >
                        <div className="w-full h-full rounded-lg overflow-hidden">
                            <Image
                                width={200}
                                height={200}
                                src={color.image}
                                alt={getLocalizedText(color.name, locale)}
                                className="w-full aspect-square object-cover"
                            />
                            {!color.available && (
                                <div
                                    className="absolute inset-0 rounded-lg"
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(229, 229, 229, 0.5) 99.99%, rgba(255, 255, 255, 0) 100%)'
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductColorSelector;