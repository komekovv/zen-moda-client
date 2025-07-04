'use client'
import React from 'react';
import { notFound } from 'next/navigation';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductSpecifications from '@/components/product/ProductSpecifications';
import ProductReviews from '@/components/product/ProductReviews';
import ProductDescription from '@/components/product/ProductDescription';
import StoreInfo from '@/components/product/StoreInfo';
import SimilarProducts from '@/components/product/SimilarProducts';
import { useTranslations } from 'next-intl';
import {Detail1, Detail2, Detail3, Detail4, Prod1, Prod2, Prod3, Prod4, Prod5} from "@/assets/images/products";
import {ChevronRightIcon} from "lucide-react";
import {Link} from "@/i18n/navigation";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    const t = useTranslations('product_detail');

    // Mock Product Data
    const product = {
        id: params.id,
        title: "Erkek sport ayakabısı 565ASB - VR02",
        brand: "Adidas",
        code: "565ASB-VR02",
        category: "Egin-eşik",
        subcategory: "Aýýakgap",
        currentPrice: 2458,
        originalPrice: 3200,
        discount: 23,
        rating: 4.2,
        reviewCount: 32,
        availability: 'in_stock' as const,
        isFavorite: false,
        images: [
            {
                id: "1",
                path: Detail1,
                alt: "Adidas ayakkabı ana görünüm"
            },
            {
                id: "2",
                path: Detail2,
                alt: "Adidas ayakkabı yan görünüm"
            },
            {
                id: "3",
                path: Detail3,
                alt: "Adidas ayakkabı alt görünüm"
            },
            {
                id: "4",
                path: Detail4,
                alt: "Adidas ayakkabı arka görünüm"
            }
        ],
        sizes: ["40", "41", "42", "43", "44", "45"],
        colors: [
            { name: "Beyaz", hex: "#FFFFFF" },
            { name: "Gri", hex: "#808080" },
            { name: "Siyah", hex: "#000000" },
            { name: "Mavi", hex: "#0762C8" },
            { name: "Kırmızı", hex: "#FC185B" }
        ],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur, tortor vel vestibulum aliquet, magna nunc bibendum quam, vel mattis risus nunc et mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam bibendum quam vel nunc rhoncus vehicula. Ut tincidunt consectetur magna, non bibendum quam vel nunc rhoncus vehicula. Nam et mauris pellentesque, scelerisque mauris vel, scelerisque mauris. Donec aliquet lorem vel mauris bibendum, vel bibendum magna bibendum. Nullam vel magna vel mauris bibendum vel mauris.",
        specifications: [
            { key: "material", value: "Dəri" },
            { key: "brand", value: "Adidas" },
            { key: "season", value: "Dörtyıl" },
            { key: "color", value: "Okydy" },
            { key: "size", value: "40-45" },
            { key: "weight", value: "Smile of Moddy" },
            { key: "country", value: "Türkiye" },
            { key: "warranty", value: "1 yıl" }
        ],
        store: {
            id: "samsung-store",
            name: "Samsung",
            logo: "/api/placeholder/64/64",
            rating: 4.8,
            reviewCount: 212,
            description: "212 Üleulgyiv"
        },
        reviews: [
            {
                id: "1",
                userName: "Arсlan Amanov",
                rating: 5,
                date: "16.03.2021",
                comment: "Gaty gowy haryt, hususan öz aýdymy aýdanym köp bilen işledim. Gowy gürrüň edýän hususan öz aýdymy aýdanym köp bilen berlen däl diýip",
                verified: true
            },
            {
                id: "2",
                userName: "Arсlan Amanov",
                rating: 4,
                date: "16.03.2021",
                comment: "Gaty gowy haryt, hususan öz aýdymy aýdanym köp bilen işledim. Gowy gürrüň edýän hususan öz aýdymy aýdanym köp bilen berlen däl diýip",
                verified: false
            },
            {
                id: "3",
                userName: "Arсlan Amanov",
                rating: 5,
                date: "16.03.2021",
                comment: "Gaty gowy haryt, hususan öz aýdymy aýdanym köp bilen işledim. Gowy gürrüň edýän hususan öz aýdymy aýdanym köp bilen berlen däl diýip",
                verified: true
            }
        ]
    };

    const similarProducts = [
        {
            id: "similar-1",
            title: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            image: Prod1,
            currentPrice: 646,
            originalPrice: 846,
            discount: 20,
            rating: 4.5,
            reviewCount: 234,
            isOnSale: true,
            saleEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
        },
        {
            id: "similar-2",
            title: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            image: Prod2,
            currentPrice: 646,
            originalPrice: 846,
            discount: 20,
            rating: 4.3,
            reviewCount: 191,
            isOnSale: true,
            saleEndTime: new Date(Date.now() + 12 * 60 * 60 * 1000) // 12 hours from now
        },
        {
            id: "similar-3",
            title: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            image: Prod3,
            currentPrice: 646,
            originalPrice: 846,
            discount: 20,
            rating: 4.7,
            reviewCount: 156,
            isOnSale: true,
            saleEndTime: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours from now
        },
        {
            id: "similar-4",
            title: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            image: Prod4,
            currentPrice: 646,
            originalPrice: 846,
            discount: 20,
            rating: 4.1,
            reviewCount: 87,
            isOnSale: true,
            saleEndTime: new Date(Date.now() + 18 * 60 * 60 * 1000) // 18 hours from now
        },
        {
            id: "similar-5",
            title: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            image: Prod5,
            currentPrice: 646,
            originalPrice: 846,
            discount: 20,
            rating: 4.6,
            reviewCount: 203,
            isOnSale: true,
            saleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
        }
    ];

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto bg-white mt-2">
            {/* Breadcrumb */}
            <div className="mx-auto px-4 py-4">
                <nav className="text-sm flex items-center gap-2">
                    <Link href={`/`} className="text-black">{t('breadcrumb.home')}</Link>
                    <ChevronRightIcon size={15}/>
                    <span className="text-black">{product.category}</span>
                    <ChevronRightIcon size={15}/>
                    <span className="text-black">{product.subcategory}</span>
                    <ChevronRightIcon size={15}/>
                    <span className="text-primary font-medium">{t('breadcrumb.product')}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    {/* Left Column - Image Gallery with constrained width */}
                    <div className="w-full lg:max-w-xl xl:max-w-3xl flex-shrink-0">
                        <ProductImageGallery images={product.images} productName={product.title} />
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="flex-1">
                        <ProductInfo product={product} />
                    </div>
                </div>

                <div className="max-w-3xl">
                    {/* Product Description */}
                    <ProductDescription description={product.description} />

                    {/* Product Specifications */}
                    <ProductSpecifications specifications={product.specifications} />

                    {/* Store Info */}
                    <StoreInfo store={product.store} />

                    {/* Similar Products */}
                    <SimilarProducts products={similarProducts} />

                    {/* Product Reviews */}
                    <ProductReviews
                        reviews={product.reviews}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />
                </div>
            </div>
        </div>
    );
}