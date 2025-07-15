import {LocalizedText} from "@/types/types";
import {ImageI, StoreShort} from "@/api/queryTypes/Home";

export interface ProductDetailResponse {
    product: ProductDetail;
    colors: ProductColor[];
    sizes: ProductSize[];
}

export interface ProductDetail {
    id: string;
    names: LocalizedText;
    descriptions: LocalizedText;
    basePrice: string;
    discountPrice: string;
    discountPercentage: string;
    brand: ProductBrand;
    market: ProductMarket;
    category: ProductCategory;
    subcategory: ProductCategory;
    catalog: ProductCategory;
    photos: ProductPhoto[];
    specifications: ProductSpecification[];
    rating: number;
    reviewCount: number;
    saleEndTime: string;
    isInWishlist: boolean;
    isInCart: boolean;
    slug: string;
    deliveryTime: string;
}

export interface ProductBrand {
    id: string;
    name: string;
}

export interface ProductMarket {
    id: string;
    name: string;
    photo: string;
    followerCount: number;
}

export interface ProductCategory {
    id: string;
    name: LocalizedText;
}

export interface ProductPhoto {
    path: string;
}

export interface ProductSpecification {
    label: string;
    value: string;
}

export interface ProductColor {
    id: string;
    name: LocalizedText;
    isAvailable: boolean;
    code: string;
    photos: ProductPhoto[];
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
