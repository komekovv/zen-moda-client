// api/queryTypes/Catalog.ts

import {LocalizedText} from "@/types/types";

export interface Subcategory {
    id: string;
    name: LocalizedText;
    photo: string;
    order: string;
}

export interface Category {
    id: string;
    name: LocalizedText;
    order: string;
    photo: string;
    subcategories: Subcategory[];
}

export interface Catalog {
    id: string;
    name: LocalizedText;
    slug: string;
    order: string;
    categories: Category[];
}

export interface GetCatalogsResponse {
    data: Catalog[];
    totalCount: number;
}

export interface NavigationSubcategory {
    name: string;
    items: string[];
}

export interface NavigationItem {
    id: string;
    label: string;
    href: string;
    hasDropdown?: boolean;
    subcategories?: NavigationSubcategory[];
}