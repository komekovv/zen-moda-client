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
import {useLocale, useTranslations} from 'next-intl';
import {Detail1, Detail2, Detail3, Detail4, Prod1, Prod2, Prod3, Prod4, Prod5} from "@/assets/images/products";
import {ChevronRightIcon} from "lucide-react";
import {Link} from "@/i18n/navigation";
import AskQuestion from "@/components/product/AskQuestion";
import ProductComplaint from "@/components/product/ProductComplaint";
import {getLocalizedText} from "@/lib/utils/helpers";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    const t = useTranslations('product_detail');
    const locale = useLocale();

    const product = {
        id: params.id,
        title: {
            tk: "Erkek sport aýýakgaby 565ASB - VR02",
            ru: "Erkek sport aýýakgaby 565ASB - VR02"
        },
        brand: "Adidas",
        code: "565ASB-VR02",
        category: "Egin-eşik",
        subcategory: "Aýýakgap",
        currentPrice: 2458,
        originalPrice: 3200,
        discount: 23,
        rating: 4.2,
        reviewCount: 32,
        isFavorite: false,
        images: [
            {
                id: "1",
                path: Detail2,
                alt: "Adidas ayakkabı ana görünüm"
            },
            {
                id: "2",
                path: Detail1,
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
        sizes: [
            {
                id: "1",
                size: "41",
                available: true
            },
            {
                id: "2",
                size: "42",
                available: true
            },
            {
                id: "3",
                size: "43",
                available: false
            },
            {
                id: "4",
                size: "44",
                available: true
            },
            {
                id: "5",
                size: "45",
                available: true
            },
            {
                id: "6",
                size: "46",
                available: true
            },
        ],
        colors: [
            {
                id: "1",
                name: {
                    tk: "Ak",
                    ru: "Ak"
                },
                code: "#FFFFFF",
                image: Detail2,
                available: true
            },
            {
                id: "2",
                name: {
                    tk: "Gara",
                    ru: "Gara"
                },
                code: "#808080",
                image: Detail2,
                available: true
            },
            {
                id: "3",
                name: {
                    tk: "Sary",
                    ru: "Sary"
                },
                code: "#000000",
                image: Detail2,
                available: false
            },
            {
                id: "4",
                name: {
                    tk: "Yashyl",
                    ru: "Yashyl"
                },
                code: "#0762C8",
                image: Detail2,
                available: true
            },
            {
                id: "5",
                name: {
                    tk: "Gok",
                    ru: "Gok"
                },
                code: "#FC185B",
                image: Detail2,
                available: true
            }
        ],
        description: {
            tk: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur, tortor vel vestibulum 
            aliquet, magna nunc bibendum quam, vel mattis risus nunc et mauris. Vestibulum ante ipsum primis in 
            faucibus orci luctus et ultrices posuere cubilia curae; Nullam bibendum quam vel nunc rhoncus vehicula. 
            Ut tincidunt consectetur magna, non bibendum quam vel nunc rhoncus vehicula. Nam et mauris pellentesque, 
            scelerisque mauris vel, scelerisque mauris. Donec aliquet lorem vel mauris bibendum, vel bibendum magna 
            bibendum. Nullam vel magna vel mauris bibendum vel mauris.`,
            ru: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur, tortor vel vestibulum 
            aliquet, magna nunc bibendum quam, vel mattis risus nunc et mauris. Vestibulum ante ipsum primis in 
            faucibus orci luctus et ultrices posuere cubilia curae; Nullam bibendum quam vel nunc rhoncus vehicula. 
            Ut tincidunt consectetur magna, non bibendum quam vel nunc rhoncus vehicula. Nam et mauris pellentesque, 
            scelerisque mauris vel, scelerisque mauris. Donec aliquet lorem vel mauris bibendum, vel bibendum magna 
            bibendum. Nullam vel magna vel mauris bibendum vel mauris.`
        },
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
            followerCount: 212,
            description: "212 Üleulgyiv"
        },
        reviews: [
            {
                id: "1",
                user: "Arсlan Amanov",
                rating: 5,
                date: "16.03.2021",
                comment: "Gaty gowy haryt, hususan öz aýdymy aýdanym köp bilen işledim. Gowy gürrüň edýän hususan öz aýdymy aýdanym köp bilen berlen däl diýip",
            },
            {
                id: "2",
                user: "Arсlan Amanov",
                rating: 4,
                date: "16.03.2021",
                comment: "Gaty gowy haryt, hususan öz aýdymy aýdanym köp bilen işledim. Gowy gürrüň edýän hususan öz aýdymy aýdanym köp bilen berlen däl diýip",
            },
            {
                id: "3",
                user: "Arсlan Amanov",
                rating: 5,
                date: "16.03.2021",
                comment: "Gaty gowy haryt, hususan öz aýdymy aýdanym köp bilen işledim. Gowy gürrüň edýän hususan öz aýdymy aýdanym köp bilen berlen däl diýip",
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

    const localizedTitle = getLocalizedText(product.title, locale);
    const localizedDescription = getLocalizedText(product.description, locale);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto bg-white mt-2">
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

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-4 xl:gap-8 mb-12">
                    <div className="w-full lg:max-w-xl xl:max-w-3xl flex-shrink-0">
                        <ProductImageGallery images={product.images} productName={localizedTitle} />
                    </div>

                    <div className="flex-1">
                        <ProductInfo product={product} />
                    </div>
                </div>

                <div className="max-w-3xl">
                    <ProductDescription description={localizedDescription} />
                    <ProductSpecifications specifications={product.specifications} />
                    <StoreInfo store={product.store} />
                    <SimilarProducts products={similarProducts} />
                    <AskQuestion />
                    <ProductReviews
                        product={{image: product.images[0].path, brand: product.brand, name: localizedTitle, rating: product.rating, reviewCount: product.reviewCount}}
                        reviews={product.reviews}
                    />
                    <ProductComplaint />
                </div>
            </div>
        </div>
    );
}