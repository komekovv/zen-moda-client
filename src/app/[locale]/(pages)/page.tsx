'use client'
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslations, useLocale } from 'next-intl';
import ProductCard from '@/components/cards/ProductCard';
import BrandCard from "@/components/cards/BrandCard";
import React from "react";
import CategoryCard from "@/components/cards/CategoryCard";
import StoreCard from "@/components/cards/StoreCard";
import { Banner1 } from "@/assets/images/banners";
import { useHomeData } from '@/hooks/useHome';
import { HomeSection } from '@/api/queryTypes/Home';
import { getLocalizedText } from '@/lib/utils/helpers';

const SectionSkeleton = () => (
    <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-gray-200 h-40 w-40 rounded-lg"></div>
            ))}
        </div>
    </div>
);

const SectionError = ({ error }: { error: string }) => (
    <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600"
        >
            Retry
        </button>
    </div>
);

export default function Home() {
    const t = useTranslations('home');
    const locale = useLocale();

    const {
        data: homeData,
        isLoading,
        isError,
        error
    } = useHomeData();

    const handleFavoriteToggle = (productId: string) => {
        console.log('Favorite toggled for product:', productId);
    };

    if (isLoading) {
        return (
            <div>
                <div className={`w-full h-[175px] md:h-full`}>
                    <Image src={Banner1} alt={'banner'} className={`object-cover w-full h-full`}/>
                </div>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                    <SectionSkeleton />
                    <div className="mt-12">
                        <SectionSkeleton />
                    </div>
                    <div className="mt-12">
                        <SectionSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <div className={`w-full h-[175px] md:h-full`}>
                    <Image src={Banner1} alt={'banner'} className={`object-cover w-full h-full`}/>
                </div>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                    <SectionError error={error?.message || t('something_went_wrong')} />
                </div>
            </div>
        );
    }

    const renderSection = (section: HomeSection, index: number) => {
        const sectionTitle = getLocalizedText(section.title, locale);
        const marginClass = index === 0 ? "mb-8 mt-4" : "mb-8 mt-12";

        switch (section.type) {
            case 'specially_for_you':
                return (
                    <div key={section.slug} className={marginClass}>
                        <h2 className="heading-main-page mb-8">{sectionTitle}</h2>
                        {section.products && section.products.length > 0 ? (
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={6}
                                freeMode={true}
                                autoplay={false}
                                breakpoints={{
                                    320: { slidesPerView: 2.5, spaceBetween: 15 },
                                    640: { slidesPerView: 3, spaceBetween: 15 },
                                    768: { slidesPerView: 3, spaceBetween: 20 },
                                    1024: { slidesPerView: 6, spaceBetween: 20 }
                                }}
                                className="product-slider"
                            >
                                {section.products.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <ProductCard
                                            id={product.id}
                                            name={getLocalizedText(product.name, locale)}
                                            description={getLocalizedText(product.description, locale)}
                                            image={product.image.url || ''}
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
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                {t('no_products_available')}
                            </div>
                        )}
                    </div>
                );

            case 'popular_categories':
                return (
                    <div key={section.slug} className={marginClass}>
                        <h2 className="heading-main-page mb-8">{sectionTitle}</h2>
                        {section.categories?.data && section.categories.data.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10 gap-4 md:gap-6">
                                {section.categories.data.map((category, categoryIndex) => (
                                    <CategoryCard
                                        key={`${category.catalogId}-${categoryIndex}`}
                                        category={{
                                            id: category.catalogId || categoryIndex.toString(),
                                            name: getLocalizedText(category.categoryName, locale),
                                            photo: category.photo|| '',
                                        }}
                                        className="w-full"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                {t('no_categories_available')}
                            </div>
                        )}
                    </div>
                );

            case 'most_viewed':
                return (
                    <div key={section.slug} className={marginClass}>
                        <h2 className="heading-main-page mb-8">{sectionTitle}</h2>
                        {section.products && section.products.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                                {section.products.map((product) => (
                                    <ProductCard
                                        id={product.id}
                                        name={getLocalizedText(product.name, locale)}
                                        description={getLocalizedText(product.description, locale)}
                                        image={product.image.url || ''}
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
                                        className="w-full"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                {t('no_products_available')}
                            </div>
                        )}
                    </div>
                );

            case 'brands':
                return (
                    <div key={section.slug} className={marginClass}>
                        <h2 className="heading-main-page mb-8">{sectionTitle}</h2>
                        {section.brands && section.brands.length > 0 ? (
                            <Swiper
                                spaceBetween={16}
                                slidesPerView="auto"
                                freeMode={true}
                                autoplay={false}
                                breakpoints={{
                                    320: { slidesPerView: 2.5, spaceBetween: 12 },
                                    640: { slidesPerView: 3, spaceBetween: 16 },
                                    768: { slidesPerView: 3.2, spaceBetween: 16 },
                                    1024: { slidesPerView: 4.2, spaceBetween: 20 },
                                    1280: { slidesPerView: 5, spaceBetween: 20 },
                                    1536: { slidesPerView: 5.5, spaceBetween: 24 }
                                }}
                                className="brand-slider"
                            >
                                {section.brands.map((brand, brandIndex) => (
                                    <SwiperSlide key={brand.id}
                                                 >
                                        <BrandCard
                                            key={`${brand.id}-${brandIndex}`}
                                            brand={{
                                                id: brand.id,
                                                name: brand.name,
                                                photo: brand.photo || '',
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                {t('no_brands_available')}
                            </div>
                        )}
                    </div>
                );

            case 'markets':
                return (
                    <div key={section.slug} className={marginClass}>
                        <h2 className="heading-main-page mb-8">{sectionTitle}</h2>
                        {section.markets && section.markets.length > 0 ? (
                            <>
                                <div className="mb-4">
                                    <Swiper
                                        spaceBetween={16}
                                        slidesPerView="auto"
                                        freeMode={true}
                                        autoplay={false}
                                        breakpoints={{
                                            320: { slidesPerView: 1.5, spaceBetween: 12 },
                                            640: { slidesPerView: 2.5, spaceBetween: 16 },
                                            768: { slidesPerView: 3, spaceBetween: 16 },
                                            1024: { slidesPerView: 4, spaceBetween: 15 },
                                            1280: { slidesPerView: 5, spaceBetween: 15 }
                                        }}
                                        className="store-slider"
                                    >
                                        {section.markets.map((market) => (
                                            <SwiperSlide key={market.id}>
                                                <StoreCard
                                                    id={market.id}
                                                    isVerified={market.isVerified ?? false}
                                                    description={market.description}
                                                    image={market.logoURL || ''}
                                                    products={[]}
                                                    title={market.name}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                {section.banners && section.banners.length > 0 && (
                                    <Swiper
                                        spaceBetween={16}
                                        slidesPerView="auto"
                                        freeMode={true}
                                        autoplay={false}
                                        breakpoints={{
                                            320: { slidesPerView: 1, spaceBetween: 12 },
                                            640: { slidesPerView: 1.5, spaceBetween: 16 },
                                            768: { slidesPerView: 3, spaceBetween: 16 }
                                        }}
                                        className="banner-slider"
                                    >
                                        {section.banners.map((banner) => (
                                            <SwiperSlide key={banner.id}>
                                                <Image
                                                    src={banner.photos}
                                                    alt={banner.name}
                                                    className={'rounded-lg'}
                                                    width={400}
                                                    height={200}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                {t('no_markets_available')}
                            </div>
                        )}
                    </div>
                );

            case 'cheap_products':
                return (
                    <div key={section.slug} className={marginClass}>
                        <h2 className="heading-main-page mb-8">{sectionTitle}</h2>
                        {section.products && section.products.length > 0 ? (
                            <>
                                {/* Banners for cheap products section */}
                                {section.banners && section.banners.length > 0 && (
                                    <div className="mb-4">
                                        <Swiper
                                            spaceBetween={16}
                                            slidesPerView="auto"
                                            freeMode={true}
                                            autoplay={false}
                                            breakpoints={{
                                                320: { slidesPerView: 1, spaceBetween: 12 },
                                                640: { slidesPerView: 1.5, spaceBetween: 16 },
                                                768: { slidesPerView: 3, spaceBetween: 16 }
                                            }}
                                        >
                                            {section.banners.map((banner) => (
                                                <SwiperSlide key={banner.id}>
                                                    <Image
                                                        src={banner.photos}
                                                        alt={banner.name}
                                                        className={'rounded-lg'}
                                                        width={400}
                                                        height={200}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                                    {section.products.map((product) => (
                                        <ProductCard
                                            id={product.id}
                                            name={getLocalizedText(product.name, locale)}
                                            description={getLocalizedText(product.description, locale)}
                                            image={product.image.url || ''}
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
                                            className="w-full"
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                {t('no_products_available')}
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div>
            {/* Hero Banner */}
            <div className={`w-full h-[175px] md:h-full`}>
                <Image src={Banner1} alt={'banner'} className={`object-cover w-full h-full`}/>
            </div>

            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                {homeData?.map((section, index) => renderSection(section, index))}

                {(!homeData || homeData.length === 0) && (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-lg">{t('no_products_available')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}