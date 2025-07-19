'use client'
import React, {useState} from 'react';
import {Heart, Share2, Truck} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import ProductSizeSelector from './ProductSizeSelector';
import ProductColorSelector from './ProductColorSelector';
import ProductActions from './ProductActions';
import Rating from "@/components/ui/Rating";
import {getLocalizedText} from "@/lib/utils/helpers";

interface ProductInfoProps {
    product: any;
    selectedVariantId: string;
    selectedColorId?: string;
    selectedSizeId?: string;
    onColorSelect?: (colorId: string) => void;
    onSizeSelect?: (sizeId: string) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
                                                     product,
                                                     selectedVariantId,
                                                     selectedColorId,
                                                     selectedSizeId,
                                                     onColorSelect,
                                                     onSizeSelect
                                                 }) => {
    const t = useTranslations('product_detail');
    const locale = useLocale();
    const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
        // Add API call to update favorite status
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: getLocalizedText(product.title, locale),
                url: window.location.href,
            });
        }
    };

    // Calculate availability based on stock
    const getAvailability = () => {
        if (!product.stock || product.stock === 0) return 'out_of_stock';
        if (product.stock < 10) return 'limited';
        return 'in_stock';
    };

    const availability = getAvailability();

    return (
        <div className="space-y-6">
            <div className="bg-white border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-primary text-h2-mobile md:text-h2 font-bold font-rubik">
                        {product.brand}
                    </h2>
                    {availability === 'limited' && (
                        <span className="text-sale text-sm font-medium">
                            {t('info.limited_stock')}
                        </span>
                    )}
                    {availability === 'out_of_stock' && (
                        <span className="text-red-500 text-sm font-medium">
                            {t('info.out_of_stock')}
                        </span>
                    )}
                </div>

                <h3 className="text-black text-body-brand font-medium mb-2">
                    {product.brand}. {product.title}
                </h3>

                <div className="flex items-center gap-2 text-black">
                    <Truck className="w-5 h-5"/>
                    <span className="text-body-description">
                      {t('info.delivery_time')} <span className="font-semibold">{product.deliveryTime || '16.03.2021 - 18.03.2021'}</span>
                    </span>
                </div>

                {/* Stock info */}
                {/*{product.stock && (*/}
                {/*    <div className="mt-2 text-body-description">*/}
                {/*        <span className="text-black">{t('info.stock')}: </span>*/}
                {/*        <span className={`font-medium ${product.stock < 10 ? 'text-warning' : 'text-green-600'}`}>*/}
                {/*            {product.stock} adet*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>

            <div className="bg-white border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div className="">
                        <div className={"flex items-center gap-4"}>
                            {product.discount && product.discount > 0 && (
                                <div className="bg-[#FC185B] text-white px-2 py-2 rounded-lg font-bold text-lg">
                                    -{product.discount}%
                                </div>
                            )}

                            <div className="flex flex-col">
                                {product.originalPrice && product.originalPrice !== product.currentPrice && (
                                    <div className="text-passive text-body-description-mobile line-through">
                                        {product.originalPrice} TMT
                                    </div>
                                )}
                                <div className="text-sale text-body-price font-bold">
                                    {product.currentPrice} TMT
                                </div>
                            </div>
                        </div>

                        {product.saleEndTime && (
                            <div className="mt-2 text-body-brand font-normal">
                                <span className="text-black">Arzanladyş wagty: </span>
                                <span className="text-warning font-rubik">
                                  {product.saleEndTime}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="h-16 w-px bg-border"></div>

                    <div className="flex flex-col items-center gap-2">
                        <Rating
                            rating={product.rating}
                            isLarge
                        />
                        <div className="text-black text-body-brand">
                            {product.reviewCount} {t('reviews.title')} ({product.rating})
                        </div>
                    </div>
                </div>
            </div>

            {/* Color and Size Selection */}
            <div className="bg-white border border-border rounded-lg p-6">
                {product.colors && product.colors.length > 0 && (
                    <ProductColorSelector
                        colors={product.colors}
                        selectedColor={selectedColorId}
                        onColorSelect={onColorSelect}
                    />
                )}

                {product.sizes && product.sizes.length > 0 && (
                    <ProductSizeSelector
                        sizes={product.sizes}
                        selectedSize={selectedSizeId}
                        onSizeSelect={onSizeSelect}
                    />
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <ProductActions
                    productId={product.id}
                    selectedVariantId={selectedVariantId}
                    selectedSize={selectedSizeId || ''}
                    selectedColor={selectedColorId || ''}
                    availability={availability}
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