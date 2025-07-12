// api/queryTypes/Catalog.ts

export interface LocalizedString {
    tk: string;
    ru: string;
}

export interface Subcategory {
    id: string;
    name: LocalizedString;
    photo: string;
    order: string;
}

export interface Category {
    id: string;
    name: LocalizedString;
    order: string;
    photo: string;
    subcategories: Subcategory[];
}

export interface Catalog {
    id: string;
    name: LocalizedString;
    slug: string;
    order: string;
    categories: Category[];
}

export interface GetCatalogsResponse {
    data: Catalog[];
    totalCount: number;
}

// Helper types for navigation (unchanged)
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