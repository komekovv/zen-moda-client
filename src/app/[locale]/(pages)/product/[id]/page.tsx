'use client'
import React, { useState, useEffect } from 'react';
import {notFound} from 'next/navigation';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductSpecifications, {Specification} from '@/components/product/ProductSpecifications';
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
import {ProductQuestionResponse} from "@/api/queryTypes/ProductQuestion";
import {ProductReviewListResponse} from "@/api/queryTypes/ProductReviews";
import {ListResponse} from "@/api/queryTypes/Common";
import {extractVariantData, findVariant, getAvailableSizesForColor, getAvailableColorsForSize} from "@/lib/utils/varianHelper";
import {useAddToCart} from "@/hooks/useCart";

interface ProductPageProps {
    params: {
        id: string;
    };
}

interface ProductVariant {
    id: string;
    sku: string;
    name: {
        ru: string;
        tk: string;
    };
    basePrice: number;
    discountPrice: number;
    stock: number;
    size: string;
    productType: string;
    isVariant: boolean;
    parentProductId: string;
    photos: Array<{
        id: string;
        path: string;
    }>;
}

export default function ProductPage({params}: ProductPageProps) {
    const t = useTranslations('product_detail');
    const locale = useLocale();
    const productId = params.id;

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

    const [selectedColorId, setSelectedColorId] = useState<string>('');
    const [selectedSizeId, setSelectedSizeId] = useState<string>('');
    const [selectedVariantId, setSelectedVariantId] = useState<string>('');
    const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(null);
    const [variantData, setVariantData] = useState<{
        colors: any[];
        sizes: any[];
        variantMap: Map<string, ProductVariant>;
    }>({
        colors: [],
        sizes: [],
        variantMap: new Map()
    });

    useEffect(() => {
        if (!productData?.product) return;

        const { product } = productData;

        if (product.hasVariants) {
            const data = extractVariantData(product);
            setVariantData(data);

            // Set default selections if none are set
            if (data.colors.length > 0 && !selectedColorId) {
                setSelectedColorId(data.colors[0].id);
            }
            if (data.sizes.length > 0 && !selectedSizeId) {
                setSelectedSizeId(data.sizes[0].id);
            }
        } else {
            // Single product without variants
            const singleProductData = {
                colors: product.color ? [{
                    id: product.color.id,
                    name: product.color.name,
                    code: product.color.colorCode,
                    image: product.photos[0]?.path || '',
                    available: product.inStock
                }] : [],
                sizes: product.size ? [{
                    id: product.size,
                    size: product.size,
                    available: product.inStock
                }] : [],
                variantMap: new Map()
            };

            setVariantData(singleProductData);

            if (singleProductData.colors.length > 0) {
                setSelectedColorId(singleProductData.colors[0].id);
            }
            if (singleProductData.sizes.length > 0) {
                setSelectedSizeId(singleProductData.sizes[0].id);
            }
        }
    }, [productData]);

    useEffect(() => {
        if (!productData?.product || !selectedColorId || !selectedSizeId) return;

        const { product } = productData;

        if (product.hasVariants && variantData.variantMap.size > 0) {
            const variant = findVariant(variantData.variantMap, selectedColorId, selectedSizeId);
            setCurrentVariant(variant);
            setSelectedVariantId(variant?.id || product.id); // Set variant ID or fallback to product ID
        } else {
            // For single products, use the main product data
            setCurrentVariant(null);
            setSelectedVariantId(product.id); // Use product ID for single products
        }
    }, [selectedColorId, selectedSizeId, variantData, productData]);

    // Handle color selection with size availability update
    const handleColorSelect = (colorId: string) => {
        setSelectedColorId(colorId);

        // Update available sizes for the selected color
        if (variantData.variantMap.size > 0) {
            const availableSizes = getAvailableSizesForColor(
                variantData.colors,
                variantData.sizes,
                variantData.variantMap,
                colorId
            );

            // If current size is not available for this color, select first available size
            const currentSizeAvailable = availableSizes.find(s => s.id === selectedSizeId)?.available;
            if (!currentSizeAvailable) {
                const firstAvailableSize = availableSizes.find(s => s.available);
                if (firstAvailableSize) {
                    setSelectedSizeId(firstAvailableSize.id);
                }
            }
        }
    };

    // Handle size selection with color availability update
    const handleSizeSelect = (sizeId: string) => {
        setSelectedSizeId(sizeId);

        // Update available colors for the selected size
        if (variantData.variantMap.size > 0) {
            const availableColors = getAvailableColorsForSize(
                variantData.colors,
                variantData.sizes,
                variantData.variantMap,
                sizeId
            );

            // If current color is not available for this size, select first available color
            const currentColorAvailable = availableColors.find(c => c.id === selectedColorId)?.available;
            if (!currentColorAvailable) {
                const firstAvailableColor = availableColors.find(c => c.available);
                if (firstAvailableColor) {
                    setSelectedColorId(firstAvailableColor.id);
                }
            }
        }
    };

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

    if (productError || !productData) {
        notFound();
    }

    const { product } = productData;
    const displayProduct = currentVariant || product;

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
    ];

    const localizedTitle = getLocalizedText(displayProduct.name, locale);
    const localizedDescription = getLocalizedText(product.description, locale);

    const colorSelectorColors = variantData.colors.map(color => ({
        id: color.id,
        name: color.name,
        code: color.code,
        image: color.image,
        available: selectedSizeId ?
            (findVariant(variantData.variantMap, color.id, selectedSizeId)?.stock || 0) > 0 :
            color.available
    }));

    const sizeSelectorSizes = variantData.sizes.map(size => ({
        id: size.id,
        size: size.size,
        available: selectedColorId ?
            (findVariant(variantData.variantMap, selectedColorId, size.id)?.stock || 0) > 0 :
            size.available
    }));

    return (
        <div className="max-w-7xl mx-auto bg-white mt-2">
            <div className="mx-auto px-4 py-4">
                <nav className="text-sm flex items-center gap-2">
                    <Link href={`/`} className="text-black">{t('breadcrumb.home')}</Link>
                    <ChevronRightIcon size={15}/>
                    <span className="text-black">{getLocalizedText(product.category.name, locale)}</span>
                    <ChevronRightIcon size={15}/>
                    <span className="text-primary font-medium">{t('breadcrumb.product')}</span>
                </nav>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-4 xl:gap-8 mb-12">
                    <div className="w-full lg:max-w-xl xl:max-w-3xl flex-shrink-0">
                        <ProductImageGallery
                            images={displayProduct.photos.map((photo, index) => ({
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
                                title: localizedTitle,
                                brand: product.brand.name,
                                code: displayProduct.sku,
                                category: getLocalizedText(product.category.name, locale),
                                currentPrice: displayProduct.discountPrice || displayProduct.basePrice,
                                originalPrice: displayProduct.basePrice,
                                discount: product.discountPercentage,
                                rating: product.rating,
                                reviewCount: 0, // You might need to get this from reviews data
                                isFavorite: product.isInWishlist,
                                images: displayProduct.photos.map((photo, index) => ({
                                    id: index.toString(),
                                    path: photo.path,
                                    alt: localizedTitle
                                })),
                                sizes: sizeSelectorSizes,
                                colors: colorSelectorColors,
                                description: localizedDescription,
                                specifications: [], // You might need to add specifications to the response
                                store: {
                                    id: product.market.id,
                                    name: product.market.name,
                                    logo: '', // You might need to add logo to market
                                    followerCount: 0, // You might need to add this to market
                                    description: ''
                                },
                                deliveryTime: '', // You might need to add this
                                saleEndTime: '', // You might need to add this
                                availability: displayProduct.stock > 0 ? 'in_stock' : 'out_of_stock',
                                stock: displayProduct.stock
                            }}
                            selectedColorId={selectedColorId}
                            selectedSizeId={selectedSizeId}
                            selectedVariantId={selectedVariantId}
                            onColorSelect={handleColorSelect}
                            onSizeSelect={handleSizeSelect}
                        />
                    </div>
                </div>

                <div className="max-w-3xl">
                    <ProductDescription description={localizedDescription}/>
                    {/* <ProductSpecifications specifications={product.specifications as Specification[]}/> */}
                    <StoreInfo
                        store={{
                            id: product.market.id,
                            name: product.market.name,
                            logo: '', // You might need to add logo to market response
                            followerCount: 0, // You might need to add this to market response
                            description: ''
                        }}
                    />
                    <SimilarProducts products={similarProducts}/>
                    <AskQuestion
                        productId={productId}
                        productInfo={{
                            image: displayProduct.photos[0]?.path || '',
                            brand: product.brand.name,
                            name: localizedTitle
                        }}
                    />
                    <ProductReviews
                        product={{
                            image: displayProduct.photos[0]?.path || '',
                            brand: product.brand.name,
                            name: localizedTitle,
                            rating: product.rating,
                            reviewCount: 0 // You might need to get this from reviews data
                        }}
                        reviews={reviewsData as ProductReviewListResponse}
                        error={reviewsError}
                        loading={reviewsLoading}
                    />
                    <ProductComplaint/>
                </div>
            </div>
        </div>
    );
}