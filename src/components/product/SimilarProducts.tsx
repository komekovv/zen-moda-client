'use client'
import React from 'react';
import {useLocale, useTranslations} from 'next-intl';
import ProductCard from '@/components/cards/ProductCard';
import {getLocalizedText} from "@/lib/utils/helpers";

interface Product {
    id: string;
    title: string;
    image: { path: string } | string;
    currentPrice: number;
    originalPrice?: number;
    discount?: number;
    rating?: number;
    reviewCount?: number;
    isOnSale?: boolean;
    saleEndTime?: Date;
    isFavorite?: boolean;
}

interface SimilarProductsProps {
    products: any[];
    title?: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
                                                             products,
                                                             title
                                                         }) => {
    const t = useTranslations('product_detail');
    const locale = useLocale();

    if (!products || products.length === 0) {
        return null;
    }
    const handleFavoriteToggle = (productId: string) => {
        console.log('Favorite toggled for product:', productId);
    };

    return (
        <div className="mb-8">
            <h2 className="text-h3-mobile md:text-h3 text-black font-rubik mb-6">
                {title || t('similar_products.title')}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-12">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={getLocalizedText(product.name, locale)}
                        description={getLocalizedText(product.description, locale)}
                        image={product.image}
                        basePrice={product.basePrice}
                        discountPrice={product.discountPrice}
                        discountPercentage={product.discountPercentage}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        viewCount={product.viewCount}
                        brand={product.brand}
                        isNew={product.isNew}
                        isFeatured={product.isFeatured}
                        isRecommended={product.isRecommended}
                        isInCart={product.isInCart}
                        isInComparison={product.isInComparison}
                        isInWishlist={product.isInWishlist}
                        saleEndDate={product.saleEndDate}
                        store={product.store}
                        currency={"TMT"}

                        isOnSale={true}
                        onFavoriteToggle={handleFavoriteToggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts;