'use client'
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Color {
    name: string;
    hex: string;
    image?: string;
}

interface ProductColorSelectorProps {
    colors: Color[];
    selectedColor: string;
    onColorSelect: (colorName: string) => void;
}

const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({
                                                                       colors,
                                                                       selectedColor,
                                                                       onColorSelect
                                                                   }) => {
    const t = useTranslations('product_detail');

    return (
        <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
                <button
                    key={color.name}
                    onClick={() => onColorSelect(color.name)}
                    className={`relative w-12 h-12 rounded-lg border-2 transition-all overflow-hidden ${
                        selectedColor === color.name
                            ? 'border-primary scale-110'
                            : 'border-border hover:border-passive'
                    }`}
                    title={color.name}
                    aria-label={`${t('color_selector.select')} ${color.name}`}
                >
                    {color.image ? (
                        <Image
                            src={color.image}
                            alt={color.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div
                            className="w-full h-full"
                            style={{ backgroundColor: color.hex }}
                        />
                    )}

                    {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full border border-black" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default ProductColorSelector;