// lib/utils/catalogUtils.ts

import {
    Catalog,
    NavigationItem,
    NavigationSubcategory,
    LocalizedString,
} from '@/api/queryTypes/Catalog';

/**
 * Get localized text based on locale
 */
export const getLocalizedText = (
    localizedString: LocalizedString,
    locale: string
): string => {
    if (locale === 'ru' && localizedString.ru) {
        return localizedString.ru;
    }
    return localizedString.tk || localizedString.ru || '';
};

/**
 * Transform API catalog data to navigation items for Header component
 */
export const transformCatalogsToNavigation = (
    catalogs: Catalog[],
    locale: string
): NavigationItem[] => {
    // Sort catalogs by order (convert string to number for sorting)
    const sortedCatalogs = [...catalogs].sort((a, b) => parseInt(a.order) - parseInt(b.order));

    return sortedCatalogs.map((catalog) => {
        // Group categories by their names to create subcategories
        const subcategories: NavigationSubcategory[] = [];

        // Sort categories by order
        const sortedCategories = [...catalog.categories].sort((a, b) => parseInt(a.order) - parseInt(b.order));

        sortedCategories.forEach((category) => {
            // Sort subcategories by order
            const sortedSubcategories = [...category.subcategories].sort((a, b) => parseInt(a.order) - parseInt(b.order));

            const subcategoryItems = sortedSubcategories.map(sub => getLocalizedText(sub.name, locale));

            if (subcategoryItems.length > 0) {
                subcategories.push({
                    name: getLocalizedText(category.name, locale),
                    items: subcategoryItems
                });
            }
        });

        return {
            id: catalog.slug,
            label: getLocalizedText(catalog.name, locale),
            href: `/${catalog.slug}`,
            hasDropdown: subcategories.length > 0,
            subcategories: subcategories.length > 0 ? subcategories : undefined
        };
    });
};



