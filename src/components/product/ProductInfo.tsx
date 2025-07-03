'use client'
import React, { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ProductSizeSelector from './ProductSizeSelector';
import ProductColorSelector from './ProductColorSelector';
import ProductActions from './ProductActions';

interface Product {
    id: string;
    title: string;
    brand: string;
    code: string;
    currentPrice: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    availability: 'in_stock' | 'limited' | 'out_of_stock';
    sizes: string[];
    colors: { name: string; hex: string; image?: string }[];
    isFavorite?: boolean;
    store: {
        id: string;
        name: string;
        rating: number;
    };
}

interface ProductInfoProps {
    product: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const t = useTranslations('product_detail');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

    const formatPrice = (price: number) => {
        return `${price.toFixed(0)} TMT`;
    };

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
        // Add API call to update favorite status
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.title,
                url: window.location.href,
            });
        }
    };

    const renderRating = () => {
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(product.rating);

        return (
            <div className="flex items-center gap-1">
                <div className="flex">
                    {Array.from({ length: fullStars }).map((_, index) => (
                        <svg
                            key={`full-${index}`}
                            className="w-4 h-4 fill-warning text-warning"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    {hasHalfStar && (
                        <div className="relative">
                            <svg className="w-4 h-4 text-passive" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <div className="absolute inset-0 w-1/2 overflow-hidden">
                                <svg className="w-4 h-4 fill-warning text-warning" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>
                    )}
                    {Array.from({ length: emptyStars }).map((_, index) => (
                        <svg
                            key={`empty-${index}`}
                            className="w-4 h-4 text-passive"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <span className="text-small text-black ml-2">{product.reviewCount} {t('info.reviews')}</span>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Brand and Title */}
            <div>
                <h1 className="text-h2 text-primary font-rubik mb-2">{product.brand}</h1>
                <p className="text-body-description text-black font-rubik">
                    {product.title} • {t('info.code')}: {product.code}
                </p>
                <p className="text-small text-passive font-rubik">
                    {t('info.last_update')}: 16.03.2021 - 18.03.2021
                </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
                {renderRating()}
                <span className="text-sale font-bold">{t('info.reviews_link')}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
                <div className="bg-sale text-white px-3 py-1 rounded text-body-price font-rubik font-bold">
                    TMT {formatPrice(product.currentPrice)}
                </div>
                <span className="text-small text-passive font-rubik">
          {t('info.installment')}: 0,23.59
        </span>
            </div>

            {/* Color Selection */}
            <div>
                <h3 className="text-body-brand text-black font-rubik mb-3">{t('info.color')}:</h3>
                <ProductColorSelector
                    colors={product.colors}
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                />
            </div>

            {/* Size Selection */}
            <div>
                <h3 className="text-body-brand text-black font-rubik mb-3">{t('info.size')}:</h3>
                <ProductSizeSelector
                    sizes={product.sizes}
                    selectedSize={selectedSize}
                    onSizeSelect={setSelectedSize}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <ProductActions
                    productId={product.id}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                    availability={product.availability}
                />

                <button
                    onClick={handleFavoriteToggle}
                    className="w-12 h-12 flex items-center justify-center border border-border rounded-lg hover:bg-blue-shade-1 transition-colors"
                    aria-label={isFavorite ? t('info.remove_favorite') : t('info.add_favorite')}
                >
                    <Heart
                        className={`w-6 h-6 transition-colors ${
                            isFavorite ? 'fill-sale text-sale' : 'text-passive hover:text-sale'
                        }`}
                    />
                </button>

                <button
                    onClick={handleShare}
                    className="w-12 h-12 flex items-center justify-center border border-border rounded-lg hover:bg-blue-shade-1 transition-colors"
                    aria-label={t('info.share')}
                >
                    <Share2 className="w-6 h-6 text-passive hover:text-primary" />
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;