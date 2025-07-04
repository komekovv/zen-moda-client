'use client'
import React from 'react';
import { useTranslations } from 'next-intl';
import BrandCard, { Brand } from '@/components/cards/BrandCard';
import {defaultBrands} from "@/assets/images/brands";
import {ChevronRightIcon} from "lucide-react";
import {Link} from "@/i18n/navigation";

const BrandPage: React.FC = () => {
    const t = useTranslations('brands');

    return (
        <div className="max-w-7xl mx-auto mt-2 bg-white">
            {/* Container */}
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href={`/`} className="text-black">{t('breadcrumb.home')}</Link>
                        <ChevronRightIcon size={15}/>
                        <span className="text-primary font-medium">
                            {t('breadcrumb.brands')}
                        </span>
                    </nav>
                </div>

                {/* Page Title */}
                <div className="mb-6">
                    <h1 className="text-h2-mobile md:text-h2 text-black font-rubik font-bold">
                        {t('title')}
                    </h1>
                </div>

                {/* Brands Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
                    {defaultBrands.map((brand) => (
                        <BrandCard
                            key={brand.id}
                            brand={brand}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandPage;