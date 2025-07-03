'use client'
import React from 'react';
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/cards/ProductCard';

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

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <h2 className="text-h3 text-black font-rubik mb-6">
                {title || t('similar_products.title')}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        currentPrice={product.currentPrice}
                        originalPrice={product.originalPrice}
                        discount={product.discount}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        isOnSale={product.isOnSale}
                        saleEndTime={product.saleEndTime}
                        isFavorite={product.isFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts;