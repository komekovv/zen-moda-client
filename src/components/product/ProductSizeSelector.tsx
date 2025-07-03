'use client'
import React from 'react';
import { useTranslations } from 'next-intl';

interface ProductSizeSelectorProps {
    sizes: string[];
    selectedSize: string;
    onSizeSelect: (size: string) => void;
}

const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({
                                                                     sizes,
                                                                     selectedSize,
                                                                     onSizeSelect
                                                                 }) => {
    const t = useTranslations('product_detail');

    return (
        <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
                <button
                    key={size}
                    onClick={() => onSizeSelect(size)}
                    className={`px-4 py-2 rounded-lg border transition-colors font-rubik text-body-description ${
                        selectedSize === size
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-black border-border hover:border-primary hover:bg-blue-shade-1'
                    }`}
                >
                    {size}
                </button>
            ))}
        </div>
    );
};

export default ProductSizeSelector;