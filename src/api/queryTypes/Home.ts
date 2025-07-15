import {LocalizedText} from "@/types/types";
import {ProductShortResponse} from "@/api/queryTypes/Product";

export interface ImageI {
    id: number;
    isPrimary: boolean;
    order: number;
    url: string;
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
    products: ProductShortResponse[];
    rating?: number;
    productCount?: number;
    isVerified?: boolean;
}

export interface StoreShort {
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
    title: LocalizedText;
    slug: string;
    allBtn: boolean;
    type: 'specially_for_you' | 'popular_categories' | 'most_viewed' | 'brands' | 'markets' | 'cheap_products';
    products?: ProductShortResponse[];
    categories?: CategoriesData;
    brands?: Brand[];
    markets?: Market[];
    banners?: Banner[];
}

export type HomeResponse = HomeSection[];