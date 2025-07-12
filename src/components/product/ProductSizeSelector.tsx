import React from 'react';

interface SizeOption {
    id: string;
    size: string;
    available: boolean;
}

interface ProductSizeSelectorProps {
    sizes: SizeOption[];
    selectedSize?: string;
    onSizeSelect?: (sizeId: string) => void;
}

const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({
                                                                     sizes,
                                                                     selectedSize,
                                                                     onSizeSelect
                                                                 }) => {
    const handleSizeSelect = (sizeId: string) => {
        const size = sizes.find(s => s.id === sizeId);
        if (size && size.available) {
            onSizeSelect?.(sizeId);
        }
    };

    const selectedSizeValue = sizes.find(s => s.id === selectedSize)?.size || '';

    return (
        <div>
            <div className="mb-2 text-body-brand">
                <span className="text-black">Razmer: </span>
                <span className="text-passive">{selectedSizeValue}</span>
            </div>

            <div className="flex gap-3">
                {sizes.map((size) => (
                    <button
                        key={size.id}
                        className={`w-12 h-10 xl:h-12 xl:w-14 rounded-lg border border-border text-body-brand transition-colors ${
                            selectedSize === size.id && size.available
                                ? 'bg-primary text-white'
                                : size.available
                                    ? 'bg-white text-black hover:bg-gray-50'
                                    : 'bg-tab text-passive cursor-not-allowed'
                        }`}
                        onClick={() => handleSizeSelect(size.id)}
                        disabled={!size.available}
                    >
                        {size.size}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductSizeSelector;