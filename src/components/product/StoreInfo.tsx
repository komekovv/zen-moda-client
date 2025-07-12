'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Store {
    id: string;
    name: string;
    logo: string;
    followerCount: number;
    description?: string;
}

interface StoreInfoProps {
    store: Store;
}

const StoreInfo: React.FC<StoreInfoProps> = ({ store }) => {
    const t = useTranslations('product_detail');

    return (
        <div className="border-t border-b border-border py-6 mb-8">
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
                    <h3 className=" text-h3-mobile md:text-h1-mobile text-black font-rubik font-semibold mb-1">
                        {store.name}
                    </h3>
                    <p className="text-body-description-mobile md:text-body-brand text-black font-normal font-rubik mb-2">
                        {store.followerCount} {t('store.followers')}
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