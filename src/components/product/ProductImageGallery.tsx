'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ProductImage {
    id: string;
    path: string;
    alt?: string;
}

interface ProductImageGalleryProps {
    images: any[];
    productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
                                                                     images,
                                                                     productName
                                                                 }) => {
    const t = useTranslations('product_detail');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    return (
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            {/* Thumbnail Images - Bottom on mobile, Left side on md+ */}
            <div className="flex space-x-2 overflow-x-auto md:flex-col md:space-x-0 md:space-y-2 md:overflow-y-auto order-2 md:order-1">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative flex-shrink-0 w-20 h-20 bg-blue-shade-1 overflow-hidden border-2 transition-colors ${
                            selectedImageIndex === index
                                ? 'border-primary'
                                : 'border-border hover:border-passive'
                        }`}
                    >
                        <Image
                            src={image.path}
                            alt={image.alt || `${productName} ${t('gallery.thumbnail')} ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative bg-blue-shade-1 border border-border overflow-hidden aspect-square flex-1 order-1 md:order-2">
                <Image
                    src={images[selectedImageIndex]?.path || '/placeholder-product.jpg'}
                    alt={images[selectedImageIndex]?.alt || productName}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    );
};

export default ProductImageGallery;