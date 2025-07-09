'use client'
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useTranslations } from 'next-intl';
import {StaticImport} from "next/dist/shared/lib/get-img-props";

interface Product {
    id: string;
    title: string;
    image: StaticImport;
    currentPrice: number;
    originalPrice?: number;
    discount?: number;
    rating?: number;
    reviewCount?: number;
    isOnSale?: boolean;
    saleEndTime?: Date;
    isFavorite?: boolean;
}

export interface Store {
    id: string;
    title: string;
    description: string;
    image: StaticImport;
    products: Product[];
}

interface StoreCardProps {
    id: string;
    title: string;
    description: string;
    image: StaticImport | string;
    isVerified: boolean;
    products: Product[];
    className?: string;
    onStoreClick?: (id: string) => void;
    onProductClick?: (productId: string) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({
                                                 id,
                                                 title,
                                                 description,
                                                 image,
                                                 products,
                                                 className = '',
                                                 onStoreClick,
                                                 onProductClick
                                             }) => {
    const handleStoreClick = (e: React.MouseEvent) => {
        // Only trigger store click if clicking on the store area, not product
        if (!(e.target as HTMLElement).closest('[data-product-click]')) {
            onStoreClick?.(id);
        }
    };

    const handleProductClick = (productId: string) => {
        onProductClick?.(productId);
    };

    const StoreContent = () => (
        <div
            className={`bg-blue-shade-1 rounded-xl p-4 cursor-pointer select-none ${className}`}
            onClick={handleStoreClick}
        >
            {/* Store Image */}
            <div className="flex justify-center mb-4">
                <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <Image
                        src={image}
                        alt={title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Store Info */}
            <div className="text-center mb-4">
                <h3 className="text-black text-sm font-medium font-rubik mb-1">
                    {title}
                </h3>
                <p className="text-black text-xs md:text-xs font-normal font-rubik leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Product Images */}
            <div className="flex justify-center gap-2">
                {products?.slice(0, 3).map((product) => (
                    <div
                        key={product.id}
                        data-product-click
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product.id);
                        }}
                    >
                        <ProductCard
                            id={product.id}
                            title={product.title}
                            image={product.image as StaticImport}
                            currentPrice={product.currentPrice}
                            originalPrice={product.originalPrice}
                            discount={product.discount}
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                            isOnSale={product.isOnSale}
                            saleEndTime={product.saleEndTime}
                            isFavorite={product.isFavorite}
                            forStore={true}
                            onCardClick={() => handleProductClick(product.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (onStoreClick) {
        return <StoreContent />;
    }

    return (
        <Link href={`/store/${id}`} className="block">
            <StoreContent />
        </Link>
    );
};

export default StoreCard;