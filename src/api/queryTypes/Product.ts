import {LocalizedText} from "@/types/types";
import {ImageI, StoreShort} from "@/api/queryTypes/Home";

export interface ProductDetailResponse {
    product: ProductDetail;
    productType: string;
    isVariant: boolean;
    hasVariants: boolean;
}

export interface ProductDetail {
    id: string;
    sku: string;
    name: LocalizedText;
    description: LocalizedText;
    basePrice: number;
    discountPrice: number;
    discountPercentage: number;
    currency: string;
    size: string;
    stock: number;
    rating: number;
    viewCount: number;
    isNew: boolean;
    isFeatured: boolean;
    isRecommended: boolean;
    isInWishlist: boolean;
    isInComparison: boolean;
    isInCart: boolean;
    inStock: boolean;
    productType: string;
    isVariant: boolean;
    hasVariants: boolean;
    parentProductId: string | null;
    variantCount: number;
    mainImage: ProductPhoto;
    photos: ProductPhoto[];
    market: ProductMarket;
    category: ProductCategory;
    brand: ProductBrand;
    catalog: ProductCategory;
    color: ProductColor;
    sizes: string[];
    variants: ProductVariant[];
}

export interface ProductVariant {
    id: string;
    sku: string;
    name: LocalizedText;
    basePrice: number;
    discountPrice: number;
    stock: number;
    size: string;
    productType: string;
    isVariant: boolean;
    parentProductId: string;
    photos: ProductPhoto[];
}

export interface ProductBrand {
    id: number;
    name: string;
}

export interface ProductMarket {
    id: string;
    name: string;
}

export interface ProductCategory {
    id: string;
    name: LocalizedText;
}

export interface ProductPhoto {
    id: string;
    path: string;
}

export interface ProductSpecification {
    label: string;
    value: string;
}

export interface ProductColor {
    id: string;
    name: LocalizedText;
    colorCode: string;
}

export interface ProductSize {
    id: string;
    name: string;
    isAvailable: boolean;
}

export interface ProductShortResponse {
    id: string;
    variationId?: string;
    name: LocalizedText;
    description: LocalizedText;
    slug: string | null;
    basePrice: string;
    discountPrice?: string;
    discountPercentage: number;
    currency: string;
    stock?: number;
    rating: number;
    reviewCount: number;
    viewCount: number;
    brand?: string;
    isNew: boolean;
    isFeatured: boolean;
    isRecommended?: boolean;
    isInWishlist: boolean;
    isInCart?: boolean;
    isInComparison?: boolean;
    store: StoreShort;
    photo: string;
    saleEndDate?: string;
}

export interface ColorOption {
    id: string;
    name: LocalizedText;
    code: string;
    image: string;
    available: boolean;
}

export interface SizeOption {
    id: string;
    size: string;
    available: boolean;
}