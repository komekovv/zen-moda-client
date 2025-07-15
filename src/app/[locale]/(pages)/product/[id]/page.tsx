'use client'
import React from 'react';
import {notFound} from 'next/navigation';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductSpecifications from '@/components/product/ProductSpecifications';
import ProductReviews from '@/components/product/ProductReviews';
import ProductDescription from '@/components/product/ProductDescription';
import StoreInfo from '@/components/product/StoreInfo';
import SimilarProducts from '@/components/product/SimilarProducts';
import {useLocale, useTranslations} from 'next-intl';
import {Prod1, Prod2, Prod3, Prod4, Prod5} from "@/assets/images/products";
import {ChevronRightIcon} from "lucide-react";
import {Link} from "@/i18n/navigation";
import AskQuestion from "@/components/product/AskQuestion";
import ProductComplaint from "@/components/product/ProductComplaint";
import {getLocalizedText} from "@/lib/utils/helpers";
import {usePostQuestionMutation, useProductQuestions, useProductReviews, useProductDetail} from "@/hooks/useProduct";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default function ProductPage({params}: ProductPageProps) {
    const t = useTranslations('product_detail');
    const locale = useLocale();
    const productId = params.id;

    // API calls
    const {
        data: productData,
        error: productError,
        isLoading: productLoading
    } = useProductDetail(productId);

    const {
        data: reviewsData,
        error: reviewsError,
        isLoading: reviewsLoading
    } = useProductReviews(productId);

    const {
        data: questionsData,
        error: questionsError,
        isLoading: questionsLoading
    } = useProductQuestions(productId);

    // Loading state
    if (productLoading) {
        return (
            <div className="max-w-7xl mx-auto bg-white mt-2">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="flex flex-col lg:flex-row gap-8 mb-12">
                            <div className="w-full lg:max-w-xl xl:max-w-3xl">
                                <div className="h-96 bg-gray-200 rounded"></div>
                            </div>
                            <div className="flex-1">
                                <div className="space-y-4">
                                    <div className="h-8 bg-gray-200 rounded"></div>
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (productError || !productData) {
        notFound();
    }

    // Use API data directly
    const { product, colors, sizes } = productData;

    // Mock similar products (you might want to add an API endpoint for this)
    const similarProducts = [
        {
            id: "similar-1",
            variationId: "similar-1",
            name: {
                tk: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
                ru: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            },
            description: {
                tk: '',
                ru: '',
            },
            image: Prod1,
            basePrice: 846,
            discountPrice: 646,
            discountPercentage: 20,
            currency: 'TMT',
            stock: 100,
            rating: 4.5,
            reviewCount: 234,
            viewCount: 0,
            brand: '',
            isNew: true,
            isFeatured: false,
            isRecommended: false,
            isInCart: false,
            isInComparison: false,
            isInWishlist: false,
            store: {id: '1', name: 'Polo'},
            saleEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            isOnSale: true,
        },
        {
            id: "similar-2",
            variationId: "similar-2",
            name: {
                tk: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
                ru: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            },
            description: {
                tk: '',
                ru: '',
            },
            image: Prod2,
            basePrice: 846,
            discountPrice: 646,
            discountPercentage: 20,
            currency: 'TMT',
            stock: 100,
            rating: 4.3,
            reviewCount: 191,
            viewCount: 0,
            brand: '',
            isNew: true,
            isFeatured: false,
            isRecommended: false,
            isInCart: false,
            isInComparison: false,
            isInWishlist: false,
            store: {id: '1', name: 'Polo'},
            saleEndDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
            isOnSale: true,
        },
        {
            id: "similar-3",
            variationId: "similar-3",
            name: {
                tk: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
                ru: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            },
            description: {
                tk: '',
                ru: '',
            },
            image: Prod3,
            basePrice: 846,
            discountPrice: 646,
            discountPercentage: 20,
            currency: 'TMT',
            stock: 100,
            rating: 4.7,
            reviewCount: 156,
            viewCount: 0,
            brand: '',
            isNew: true,
            isFeatured: false,
            isRecommended: false,
            isInCart: false,
            isInComparison: false,
            isInWishlist: false,
            store: {id: '1', name: 'Polo'},
            saleEndDate: new Date(Date.now() + 8 * 60 * 60 * 1000),
            isOnSale: true,
        },
        {
            id: "similar-4",
            variationId: "similar-4",
            name: {
                tk: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
                ru: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            },
            description: {
                tk: '',
                ru: '',
            },
            image: Prod4,
            basePrice: 846,
            discountPrice: 646,
            discountPercentage: 20,
            currency: 'TMT',
            stock: 100,
            rating: 4.1,
            reviewCount: 87,
            viewCount: 0,
            brand: '',
            isNew: true,
            isFeatured: false,
            isRecommended: false,
            isInCart: false,
            isInComparison: false,
            isInWishlist: false,
            store: {id: '1', name: 'Polo'},
            saleEndDate: new Date(Date.now() + 18 * 60 * 60 * 1000),
            isOnSale: true,
        },
        {
            id: "similar-5",
            variationId: "similar-5",
            name: {
                tk: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
                ru: "XIAOMI Meja Bluetooth Thermometer 2 Wireless...",
            },
            description: {
                tk: '',
                ru: '',
            },
            image: Prod5,
            basePrice: 846,
            discountPrice: 646,
            discountPercentage: 20,
            currency: 'TMT',
            stock: 100,
            rating: 4.6,
            reviewCount: 203,
            viewCount: 0,
            brand: '',
            isNew: true,
            isFeatured: false,
            isRecommended: false,
            isInCart: false,
            isInComparison: false,
            isInWishlist: false,
            store: {id: '1', name: 'Polo'},
            saleEndDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
            isOnSale: true,
        }
    ];

    const localizedTitle = getLocalizedText(product.names, locale);
    const localizedDescription = getLocalizedText(product.descriptions, locale);

    return (
        <div className="max-w-7xl mx-auto bg-white mt-2">
            <div className="mx-auto px-4 py-4">
                <nav className="text-sm flex items-center gap-2">
                    <Link href={`/`} className="text-black">{t('breadcrumb.home')}</Link>
                    <ChevronRightIcon size={15}/>
                    <span className="text-black">{getLocalizedText(product.category.name, locale)}</span>
                    <ChevronRightIcon size={15}/>
                    <span className="text-black">{getLocalizedText(product.subcategory.name, locale)}</span>
                    <ChevronRightIcon size={15}/>
                    <span className="text-primary font-medium">{t('breadcrumb.product')}</span>
                </nav>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-4 xl:gap-8 mb-12">
                    <div className="w-full lg:max-w-xl xl:max-w-3xl flex-shrink-0">
                        <ProductImageGallery 
                            images={product.photos.map((photo, index) => ({
                                id: index.toString(),
                                path: photo.path,
                                alt: localizedTitle
                            }))} 
                            productName={localizedTitle}
                        />
                    </div>

                    <div className="flex-1">
                        <ProductInfo 
                            product={{
                                id: product.id,
                                title: product.names,
                                brand: product.brand.name,
                                code: product.slug,
                                category: getLocalizedText(product.category.name, locale),
                                subcategory: getLocalizedText(product.subcategory.name, locale),
                                currentPrice: parseFloat(product.discountPrice || product.basePrice),
                                originalPrice: parseFloat(product.basePrice),
                                discount: parseInt(product.discountPercentage),
                                rating: product.rating,
                                reviewCount: product.reviewCount,
                                isFavorite: product.isInWishlist,
                                images: product.photos.map((photo, index) => ({
                                    id: index.toString(),
                                    path: photo.path,
                                    alt: localizedTitle
                                })),
                                sizes: sizes.map(size => ({
                                    id: size.id,
                                    size: size.name,
                                    available: size.isAvailable
                                })),
                                colors: colors.map(color => ({
                                    id: color.id,
                                    name: color.name,
                                    code: color.code,
                                    image: color.photos[0]?.path || product.photos[0]?.path,
                                    available: color.isAvailable
                                })),
                                description: product.descriptions,
                                specifications: product.specifications.map(spec => ({
                                    key: spec.label,
                                    value: spec.value
                                })),
                                store: {
                                    id: product.market.id,
                                    name: product.market.name,
                                    logo: product.market.photo,
                                    followerCount: product.market.followerCount,
                                    description: `${product.market.followerCount} Üýeleugy`
                                },
                                deliveryTime: product.deliveryTime,
                                saleEndTime: product.saleEndTime
                            }}
                        />
                    </div>
                </div>

                <div className="max-w-3xl">
                    <ProductDescription description={localizedDescription}/>
                    <ProductSpecifications specifications={product.specifications}/>
                    <StoreInfo 
                        store={{
                            id: product.market.id,
                            name: product.market.name,
                            logo: product.market.photo,
                            followerCount: product.market.followerCount,
                            description: `${product.market.followerCount} Üýeleugy`
                        }}
                    />
                    <SimilarProducts products={similarProducts}/>
                    <AskQuestion
                        questions={questionsData}
                        error={questionsError}
                        loading={questionsLoading}
                    />
                    <ProductReviews
                        product={{
                            image: product.photos[0]?.path || '',
                            brand: product.brand.name,
                            name: localizedTitle,
                            rating: product.rating,
                            reviewCount: product.reviewCount
                        }}
                        reviews={reviewsData}
                        error={reviewsError}
                        loading={reviewsLoading}
                    />
                    <ProductComplaint/>
                </div>
            </div>
        </div>
    );
}
