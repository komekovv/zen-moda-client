'use client'
import React, {useState} from 'react';
import {Heart, Share2, Truck} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import ProductSizeSelector from './ProductSizeSelector';
import ProductColorSelector from './ProductColorSelector';
import ProductActions from './ProductActions';
import Rating from "@/components/ui/Rating";
import {getLocalizedText} from "@/lib/utils/helpers";

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
    hasLowStock?: boolean;
}

interface ProductInfoProps {
    product: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({product}) => {
    const t = useTranslations('product_detail');
    const locale = useLocale();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

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
    const localizedTitle = getLocalizedText(product.title, locale);

    return (
        <div className="space-y-6">
            <div className="bg-white border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-primary text-h2-mobile md:text-h2 font-bold font-rubik">
                        {product.brand}
                    </h2>
                    {product.hasLowStock && (
                        <span className="text-sale text-sm font-medium">
                            Gutarýar
                        </span>
                    )}
                </div>

                <h3 className="text-black text-body-brand font-medium mb-2">
                    {product.brand}. {localizedTitle}
                </h3>

                <div className="flex items-center gap-2 text-black">
                    <Truck className="w-5 h-5"/>
                    <span className="text-body-description">
                      {t('info.delivery_time')} <span className="font-semibold"> 16.03.2021 - 18.03.2021</span>
                    </span>
                </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div className="">
                        <div className={"flex items-center gap-4"}>
                            <div className="bg-[#FC185B] text-white px-2 py-2 rounded-lg font-bold text-lg">
                                {/*-{product.discountPercentage}%*/}
                                -40%
                            </div>

                            <div className="flex flex-col">
                                <div className="text-passive text-body-description-mobile line-through">
                                    {product.currentPrice} TMT
                                </div>
                                <div className="text-sale text-body-price font-bold">
                                    {product.currentPrice} TMT
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 text-body-brand font-normal">
                            <span className="text-black">Arzanladyş wagty: </span>
                            <span className="text-warning font-rubik">
                              {/*{product.countdownTime}*/} 01:23:59
                            </span>
                        </div>
                    </div>

                    <div className="h-16 w-px bg-border"></div>

                    <div className="flex flex-col items-center gap-2">
                        <Rating
                            rating={product.rating}
                            isLarge
                        />
                        <div className="text-black text-body-brand">
                            {product.reviewCount} Teswir ({product.rating})
                        </div>
                    </div>
                </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white border border-border rounded-lg p-6">
                <ProductColorSelector
                    colors={product.colors}
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                />

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
                    <Share2 className="w-6 h-6 text-passive hover:text-primary"/>
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;