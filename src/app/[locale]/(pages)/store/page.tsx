'use client'
import React from 'react';
import {useTranslations} from 'next-intl';
import {ChevronRightIcon} from "lucide-react";
import {Link} from "@/i18n/navigation";
import StoreCard from "@/components/cards/StoreCard";
import {mockStores} from "@/assets/images/stores";

const BrandPage: React.FC = () => {
    const t = useTranslations('stores');

    return (
        <div className="max-w-7xl mx-auto mt-2 bg-white">
            <div className="container mx-auto px-4">
                <div className="py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href={`/`} className="text-black">{t('breadcrumb.home')}</Link>
                        <ChevronRightIcon size={15}/>
                        <span className="text-primary font-medium">
                            {t('breadcrumb.stores')}
                        </span>
                    </nav>
                </div>

                <div className="mb-6">
                    <h1 className="text-h2-mobile md:text-h2 text-black font-rubik font-bold">
                        {t('title')}
                    </h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
                    {/*{mockStores.map((store) => (*/}
                    {/*    <StoreCard*/}
                    {/*        key={store.id}*/}
                    {/*        {...store}*/}
                    {/*    />*/}
                    {/*))}*/}
                </div>
            </div>
        </div>
    );
};

export default BrandPage;