import {SupportedLocales} from "@/types/types";

export interface Photo {
    path: string;
    object_type: string;
}

export interface Product {
    id: string;
    variantId: string;
    name: Record<string, SupportedLocales>;
    description: string;
    slug: string | null;
    basePrice: string;
    discountPrice?: string;
    discountPercentage?: number;
    currency: string;
    images: Photo[];
    brand?: string;
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    isFeatured?: boolean;
    isRecommended?: boolean;
    isInWishlist?: boolean;
    isInCart?: boolean;
    isInComparison?: boolean;
    isSale?: boolean;
}

export interface Category {
    categoryName: Record<string, SupportedLocales>;
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

export interface Banner {
    id: number;
    name: string;
    description: string;
    photos: string;
    priority: number;
    link?: string;
    type?: string;
}

export interface HomeSection {
    // title: Record<string, SupportedLocales>;
    title: string;
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