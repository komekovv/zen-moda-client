'use client'
import banner from "@/assets/images/banner.jpg"
import banner2 from "@/assets/images/banner2.png"
import reebokLogo from "@/assets/images/brands/reebok-logo.png"
import adidasLogo from "@/assets/images/brands/adidas-logo.png"
import samsungLogo from "@/assets/images/brands/samsung-logo.png"
import appleLogo from "@/assets/images/brands/apple-logo.png"
import kotonLogo from "@/assets/images/brands/koton-logo.png"
import damatLogo from "@/assets/images/brands/damat-logo.png"
import Image, {StaticImageData} from "next/image";
import {Swiper, SwiperSlide} from 'swiper/react';
import {useTranslations} from 'next-intl';
import ProductCard from '@/components/cards/ProductCard';
import BrandCard, {Brand} from "@/components/cards/BrandCard";
import React from "react";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import CategoryCard, {Category} from "@/components/cards/CategoryCard";

const sampleProducts = [
    {
        id: '1',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital Hygrometer Thermometer Work with Mijia APP',
        image: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000), // 03:23:11
    },
    {
        id: '2',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '3',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '4',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '5',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '6',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '7',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '8',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '9',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '10',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '11',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '12',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
];

const defaultBrands: Brand[] = [
    {
        id: '1',
        name: 'Reebok',
        photos: {
            id: '1',
            path: reebokLogo as StaticImport,
            object_id: '1',
            object_type: 'brand'
        },
    },
    {
        id: '2',
        name: 'Adidas',
        photos: {
            id: '2',
            path: adidasLogo as StaticImport,
            object_id: '2',
            object_type: 'brand'
        },
    },
    {
        id: '3',
        name: 'Samsung',
        photos: {
            id: '3',
            path: samsungLogo as StaticImport,
            object_id: '3',
            object_type: 'brand'
        },
    },
    {
        id: '4',
        name: 'Apple',
        photos: {
            id: '4',
            path: appleLogo as StaticImport,
            object_id: '4',
            object_type: 'brand'
        },
    },
    {
        id: '5',
        name: 'Koton',
        photos: {
            id: '5',
            path: kotonLogo as StaticImport,
            object_id: '5',
            object_type: 'brand'
        },
    },
    {
        id: '6',
        name: 'Damat',
        photos: {
            id: '6',
            path: damatLogo as StaticImport,
            object_id: '6',
            object_type: 'brand'
        },
    },
    {
        id: '7',
        name: 'Damat',
        photos: {
            id: '6',
            path: damatLogo as StaticImport,
            object_id: '6',
            object_type: 'brand'
        },
    },
];

const mockCategories: Category[] = [
    {
        id: '1',
        name: 'Jeans',
        photos: {
            id: '1',
            path: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop',
            object_id: '1',
            object_type: 'category'
        },
    },
    {
        id: '2',
        name: 'T-Shirt',
        photos: {
            id: '2',
            path: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
            object_id: '2',
            object_type: 'category'
        },
    },
    {
        id: '3',
        name: 'Mug',
        photos: {
            id: '3',
            path: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=200&h=200&fit=crop',
            object_id: '3',
            object_type: 'category'
        },
    },
    {
        id: '4',
        name: 'Sweater',
        photos: {
            id: '4',
            path: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop',
            object_id: '4',
            object_type: 'category'
        },
    },
    {
        id: '5',
        name: 'Hat',
        photos: {
            id: '5',
            path: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop',
            object_id: '5',
            object_type: 'category'
        },
    },
    {
        id: '6',
        name: 'Shirt',
        photos: {
            id: '6',
            path: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop',
            object_id: '6',
            object_type: 'category'
        },
    },
    {
        id: '7',
        name: 'Phone',
        photos: {
            id: '7',
            path: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
            object_id: '7',
            object_type: 'category'
        },
    },
    {
        id: '8',
        name: 'Backpack',
        photos: {
            id: '8',
            path: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
            object_id: '8',
            object_type: 'category'
        },
    },
    {
        id: '9',
        name: 'Pants',
        photos: {
            id: '9',
            path: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop',
            object_id: '9',
            object_type: 'category'
        },
    },
    {
        id: '10',
        name: 'Socks',
        photos: {
            id: '10',
            path: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop',
            object_id: '10',
            object_type: 'category'
        },
    }
];

export default function Home() {
    const t = useTranslations('home');

    const handleFavoriteToggle = (productId: string) => {
        console.log('Favorite toggled for product:', productId);
    };

    return (
        <div>
            <Image src={banner as StaticImageData} alt={'banner'}/>

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
                            },
                            // Medium desktop
                            1280: {
                                slidesPerView: 6,
                                spaceBetween: 20,
                            },
                            // Large desktop
                            1536: {
                                slidesPerView: 6,
                                spaceBetween: 20,
                            },
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
                    <h2 className="heading-main-page mb-2">Magazinler</h2>
                </div>
                <div className="mb-8 mt-12">
                    <h2 className="heading-main-page mb-2">Ýörite siziň üçin</h2>
                </div>
                <Image src={banner2 as StaticImageData} alt={''}/>
            </div>
        </div>
    );
}