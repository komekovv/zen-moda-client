'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Store {
    id: string;
    name: string;
    logo: string;
    rating: number;
    reviewCount: number;
    description?: string;
}

interface StoreInfoProps {
    store: Store;
}

const StoreInfo: React.FC<StoreInfoProps> = ({ store }) => {
    const t = useTranslations('product_detail');

    const renderStoreRating = () => {
        const fullStars = Math.floor(store.rating);
        const hasHalfStar = store.rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(store.rating);

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
                <span className="text-small text-passive ml-1">({store.reviewCount})</span>
            </div>
        );
    };

    return (
        <div className=" rounded-lg py-6 mb-8">
            <div className="flex items-center gap-4">
                {/* Store Logo */}
                <div className="relative w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                        src={store.logo}
                        alt={store.name}
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                </div>

                {/* Store Info */}
                <div className="flex-1">
                    <h3 className="text-h1-mobile text-black font-rubik font-semibold mb-1">
                        {store.name}
                    </h3>
                    <p className="text-body-brand text-black font-normal font-rubik mb-2">
                        {store.reviewCount} {t('store.reviews')}
                    </p>
                </div>

                {/* Visit Store Button */}
                <Link
                    href={`/store/${store.id}`}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-rubik text-body-description font-medium hover:bg-blue-800 transition-colors"
                >
                    {t('store.visit_store')}
                </Link>
            </div>
        </div>
    );
};

export default StoreInfo;