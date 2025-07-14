import {LocalizedText, SupportedLocales} from "@/types/types";

export interface ImageI {
    id: number;
    isPrimary: boolean;
    order: number;
    url: string;
}

export interface Product {
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
    store: MarketShort;
    photo: ImageI;
    saleEndDate?: string;
}

export interface Category {
    categoryName: LocalizedText;
    catalogId: string | null;
    productCount: number;
    viewCount: number;
    photo: string;
}

export interface CategoriesData {
    data: Category[];
    totalCount: number;
}

export interface Brand {
    id: string;
    name: string;
    photo: string;
}

export interface Market {
    id: string;
    name: string;
    description: string;
    logoURL: string;
    products: Product[];
    rating?: number;
    productCount?: number;
    isVerified?: boolean;
}

export interface MarketShort {
    id: number;
    name: string;
}

export interface Banner {
    id: number;
    name: string;
    photo: string;
    priority: number;
    link?: string;
    itemId: string;
    targetType: string;
    type: string;
}

export interface HomeSection {
    // title: LocalizedText;
    title: LocalizedText;
    slug: string;
    allBtn: boolean;
    type: 'specially_for_you' | 'popular_categories' | 'most_viewed' | 'brands' | 'markets' | 'cheap_products';
    products?: Product[];
    categories?: CategoriesData;
    brands?: Brand[];
    markets?: Market[];
    banners?: Banner[];
}

export type HomeResponse = HomeSection[];