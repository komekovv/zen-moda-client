import {SupportedLocales} from "@/types/types";

export interface Photo {
    path: string;
    object_type: string;
}

export interface Product {
    id: string;
    name: Record<string, SupportedLocales>;
    price: number;
    originalPrice?: number;
    discount?: number;
    images: Photo[];
    brand?: string;
    isNew?: boolean;
    isSale?: boolean;
    rating?: number;
    reviewCount?: number;
    isFavorite?: boolean;
}

export interface Category {
    categoryName: Record<string, SupportedLocales>;
    catalogId: string | null;
    productCount: number;
    viewCount: number;
    photos: Photo[];
}

export interface CategoriesData {
    data: Category[];
    totalCount: number;
}

export interface Brand {
    id: string;
    name: string;
    photos: {path: string; object_type: string}[];
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
    photos: {path: string; object_type: string};
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