'use client'
import {mockStores} from "@/assets/images/stores"
import {mockCategories} from "@/assets/images/categories"
import Image, {StaticImageData} from "next/image";
import {Swiper, SwiperSlide} from 'swiper/react';
import {useTranslations} from 'next-intl';
import ProductCard from '@/components/cards/ProductCard';
import BrandCard from "@/components/cards/BrandCard";
import React from "react";
import CategoryCard from "@/components/cards/CategoryCard";
import StoreCard from "@/components/cards/StoreCard";
import {defaultBrands} from "@/assets/images/brands";
import {products, sampleProducts} from "@/assets/images/products";
import {Banner1, Banner3, Banner4, Banner5, Banner6, Banner7, Banner8} from "@/assets/images/banners";

export default function Home() {
    const t = useTranslations('home');

    const handleFavoriteToggle = (productId: string) => {
        console.log('Favorite toggled for product:', productId);
    };

    return (
        <div>
            <div className={`w-full h-[175px] md:h-full`}>
                <Image src={Banner1} alt={'banner'} className={`object-cover w-full h-full`}/>
            </div>

            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                <div className="mb-8 mt-4">
                    <h2 className="heading-main-page mb-8">Ýörite siziň üçin</h2>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={6}
                        freeMode={true}
                        autoplay={false}
                        breakpoints={{
                            // Mobile
                            320: {
                                slidesPerView: 2.5,
                                spaceBetween: 15,
                            },
                            // Small tablets
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            // Tablets
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            // Small desktop
                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 20,
                            }
                        }}
                        className="product-slider"
                    >
                        {sampleProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard
                                    {...product}
                                    onFavoriteToggle={handleFavoriteToggle}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="mb-8 mt-12">
                    <h2 className="heading-main-page mb-8">Köp görülýän kategoriýalar</h2>

                    <div
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10 gap-4 md:gap-6">
                        {mockCategories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                className="w-full"
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-8 mt-12">
                    <h2 className="heading-main-page mb-8">Iň köp görülen harytlar</h2>
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {sampleProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                onFavoriteToggle={handleFavoriteToggle}
                                className="w-full"
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-8 mt-12">
                    <h2 className="heading-main-page mb-8">Brendlar</h2>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView="auto"
                        freeMode={true}
                        autoplay={false}
                        breakpoints={{
                            // Mobile
                            320: {
                                slidesPerView: 2.5,
                                spaceBetween: 12,
                            },
                            // Small tablets
                            640: {
                                slidesPerView: 2.5,
                                spaceBetween: 16,
                            },
                            // Tablets
                            768: {
                                slidesPerView: 3.2,
                                spaceBetween: 16,
                            },
                            // Small desktop
                            1024: {
                                slidesPerView: 4.2,
                                spaceBetween: 20,
                            },
                            // Medium desktop
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                            // Large desktop
                            1536: {
                                slidesPerView: 5.5,
                                spaceBetween: 24,
                            },
                        }}
                        className="brand-slider"
                    >
                        {defaultBrands.map((brand, index) => (
                            <SwiperSlide key={brand.id}
                                         className="!w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px]">
                                <BrandCard
                                    key={`${brand.id}-${index}`}
                                    brand={brand}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="mb-8 mt-12">
                    <h2 className="heading-main-page mb-8">300 TMT aşakday harytlar</h2>
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {sampleProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                onFavoriteToggle={handleFavoriteToggle}
                                className="w-full"
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-8 mt-12">
                    <h2 className="heading-main-page mb-8">Magazinler</h2>
                    <div className="mb-4">
                        <Swiper
                            spaceBetween={16}
                            slidesPerView="auto"
                            freeMode={true}
                            autoplay={false}
                            breakpoints={{
                                // Mobile
                                320: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 12,
                                },
                                // Small tablets
                                640: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 16,
                                },
                                // Tablets
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                                // Small desktop
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 15,
                                },
                                // Medium desktop
                                1280: {
                                    slidesPerView: 5,
                                    spaceBetween: 15,
                                },
                            }}
                            className="store-slider"
                        >
                            {mockStores.map((store, index) => (
                                <SwiperSlide key={store.id}
                                             >
                                    <StoreCard
                                        {...store}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView="auto"
                        freeMode={true}
                        autoplay={false}
                        breakpoints={{
                            // Mobile
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 12,
                            },
                            // Small tablets
                            640: {
                                slidesPerView: 1.5,
                                spaceBetween: 16,
                            },
                            // Tablets
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 16,
                            },
                        }}
                        className="brand-slider"
                    >
                        <SwiperSlide>
                            <Image src={Banner3} alt={'banner'} className={'rounded-lg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={Banner4} alt={'banner'} className={'rounded-lg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={Banner5} alt={'banner'} className={'rounded-lg'}/>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="mb-8 mt-12">
                    <h2 className="heading-main-page mb-8">Ýörite siziň üçin</h2>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView="auto"
                        freeMode={true}
                        autoplay={false}
                        breakpoints={{
                            // Mobile
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 12,
                            },
                            // Small tablets
                            640: {
                                slidesPerView: 1.5,
                                spaceBetween: 16,
                            },
                            // Tablets
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 16,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <Image src={Banner6} alt={'banner'} className={'rounded-lg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={Banner7} alt={'banner'} className={'rounded-lg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={Banner8} alt={'banner'} className={'rounded-lg'}/>
                        </SwiperSlide>
                    </Swiper>
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mt-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                onFavoriteToggle={handleFavoriteToggle}
                                className="w-full"
                            />
                        ))}
                    </div>
                </div>
                {/*<Image src={banner2 as StaticImageData} alt={''}/>*/}
            </div>
        </div>
    );
}