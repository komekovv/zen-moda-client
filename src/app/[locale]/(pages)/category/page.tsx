'use client'
import React, { useState, useEffect } from 'react';
import { useLocale } from "next-intl";
import { getLocalizedText } from "@/lib/utils/helpers";
import { SupportedLocales } from "@/types/types";
import { useCatalogs } from "@/hooks/useCatalogs";
import Image from "next/image";

const CategoryPage = () => {
    const [activeCatalogId, setActiveCatalogId] = useState('');
    const [activeCategoryId, setActiveCategoryId] = useState('');
    const locale = useLocale();

    const { data: catalogsData, isLoading, error } = useCatalogs();

    // Mock data (commented out for reference)
    /*
    const mockData = {
        "data": [
            {
                "id": "1",
                "name": {
                    "tk": "Erkek",
                    "ru": "Мужской"
                },
                "slug": "erkek",
                "order": "1",
                "categories": [
                    {
                        "id": "1",
                        "name": {
                            "tk": "Giyim",
                            "ru": "Одежда"
                        },
                        "order": "1",
                        "photo": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
                        "subcategories": [
                            {
                                "id": "1",
                                "name": {
                                    "tk": "Köýnek",
                                    "ru": "Рубашка"
                                },
                                "order": "1",
                                "photo": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&fit=crop"
                            },
                            {
                                "id": "2",
                                "name": {
                                    "tk": "Balak",
                                    "ru": "Брюки"
                                },
                                "order": "2",
                                "photo": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop"
                            },
                            {
                                "id": "3",
                                "name": {
                                    "tk": "Kostýum",
                                    "ru": "Костюм"
                                },
                                "order": "3",
                                "photo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                            }
                        ]
                    },
                    {
                        "id": "2",
                        "name": {
                            "tk": "Aýakgap",
                            "ru": "Обувь"
                        },
                        "order": "2",
                        "photo": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop",
                        "subcategories": [
                            {
                                "id": "4",
                                "name": {
                                    "tk": "Sportiw aýakgap",
                                    "ru": "Спортивная обувь"
                                },
                                "order": "1",
                                "photo": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
                            },
                            {
                                "id": "5",
                                "name": {
                                    "tk": "Resmi aýakgap",
                                    "ru": "Официальная обувь"
                                },
                                "order": "2",
                                "photo": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=200&h=200&fit=crop"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "2",
                "name": {
                    "tk": "Aýal",
                    "ru": "Женский"
                },
                "slug": "ayal",
                "order": "2",
                "categories": [
                    {
                        "id": "3",
                        "name": {
                            "tk": "Giyim",
                            "ru": "Одежда"
                        },
                        "order": "1",
                        "photo": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop",
                        "subcategories": [
                            {
                                "id": "6",
                                "name": {
                                    "tk": "Köýnek",
                                    "ru": "Платье"
                                },
                                "order": "1",
                                "photo": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=200&fit=crop"
                            },
                            {
                                "id": "7",
                                "name": {
                                    "tk": "Yubka",
                                    "ru": "Юбка"
                                },
                                "order": "2",
                                "photo": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "3",
                "name": {
                    "tk": "Çaga",
                    "ru": "Детский"
                },
                "slug": "caga",
                "order": "3",
                "categories": [
                    {
                        "id": "4",
                        "name": {
                            "tk": "Oýun",
                            "ru": "Игрушки"
                        },
                        "order": "1",
                        "photo": "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=200&h=200&fit=crop",
                        "subcategories": [
                            {
                                "id": "8",
                                "name": {
                                    "tk": "Edukatiw oýunlar",
                                    "ru": "Образовательные игры"
                                },
                                "order": "1",
                                "photo": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop"
                            }
                        ]
                    }
                ]
            }
        ],
        "totalCount": 3
    };
    */

    // Set initial active catalog and category when data is loaded
    useEffect(() => {
        if (catalogsData?.data && catalogsData.data.length > 0) {
            // Set first catalog as active if none is selected
            if (!activeCatalogId) {
                setActiveCatalogId(catalogsData.data[0].id);
            }

            // Set first category of active catalog if none is selected
            const activeCatalog = catalogsData.data.find(catalog => catalog.id === activeCatalogId);
            if (activeCatalog && activeCatalog.categories.length > 0 && !activeCategoryId) {
                setActiveCategoryId(activeCatalog.categories[0].id);
            }
        }
    }, [catalogsData, activeCatalogId, activeCategoryId]);

    // Handle loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading catalogs...</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <p className="text-gray-600">Error loading catalogs. Please try again.</p>
                </div>
            </div>
        );
    }

    // Handle no data state
    if (!catalogsData?.data || catalogsData.data.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">No catalogs available.</p>
                </div>
            </div>
        );
    }

    // Get catalogs from the API data
    const catalogs = catalogsData.data.map(catalog => ({
        id: catalog.id,
        name: getLocalizedText(catalog.name, locale),
        slug: catalog.slug,
        order: catalog.order
    }));

    // Get categories for the active catalog
    const activeCatalog = catalogsData.data.find(catalog => catalog.id === activeCatalogId);
    const categories = activeCatalog ? activeCatalog.categories.map(category => ({
        id: category.id,
        name: getLocalizedText(category.name, locale),
        image: 'http://216.250.13.41:9090/' + category.photo,
        order: category.order
    })) : [];

    // Get subcategories for the active category
    const activeCategory = activeCatalog?.categories.find(category => category.id === activeCategoryId);
    const subcategories = activeCategory ? activeCategory.subcategories.map(subcategory => ({
        id: subcategory.id,
        title: getLocalizedText(subcategory.name, locale),
        image: 'http://216.250.13.41:9090/' + subcategory.photo,
        order: subcategory.order
    })) : [];

    // Language toggle function (if needed for manual switching)
    const getLocalizedLabel = (key: string) => {
        const labels: Record<string, Record<string, string>> = {
            categories: {
                tk: 'Kategoriler',
                ru: 'Категории'
            }
        };
        return labels[key]?.[locale] || labels[key]?.['tk'] || key;
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-2">
            {/* Catalog Bar - Horizontal Scroll on Mobile, Full Width on Desktop */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-3 py-2 sm:px-4 sm:py-3">
                    {/* Mobile: Horizontal Scroll */}
                    <div className="flex overflow-x-auto space-x-2 scrollbar-hide lg:hidden">
                        {catalogs.map((catalog) => (
                            <button
                                key={catalog.id}
                                onClick={() => {
                                    setActiveCatalogId(catalog.id);
                                    // Reset category selection when changing catalog
                                    const newCatalog = catalogsData.data.find(c => c.id === catalog.id);
                                    if (newCatalog && newCatalog.categories.length > 0) {
                                        setActiveCategoryId(newCatalog.categories[0].id);
                                    }
                                }}
                                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                                    activeCatalogId === catalog.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {catalog.name}
                            </button>
                        ))}
                    </div>

                    {/* Desktop: Full Width Row */}
                    <div className="hidden lg:flex justify-center space-x-6">
                        {catalogs.map((catalog) => (
                            <button
                                key={catalog.id}
                                onClick={() => {
                                    setActiveCatalogId(catalog.id);
                                    const newCatalog = catalogsData.data.find(c => c.id === catalog.id);
                                    if (newCatalog && newCatalog.categories.length > 0) {
                                        setActiveCategoryId(newCatalog.categories[0].id);
                                    }
                                }}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                    activeCatalogId === catalog.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {catalog.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex">
                {/* Left Sidebar - Categories (Mobile) */}
                <div className="w-28 bg-white border-r border-gray-200 h-full lg:hidden">
                    <div className="p-2 h-screen">
                        <div className="space-y-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategoryId(category.id)}
                                    className={`w-full flex flex-col items-center space-y-1 p-1.5 rounded-lg transition-colors ${
                                        activeCategoryId === category.id
                                            ? 'bg-blue-50 border-2 border-blue-500'
                                            : 'bg-gray-50'
                                    }`}
                                >
                                    <Image
                                        width={200}
                                        height={200}
                                        src={category.image}
                                        alt={category.name}
                                        className="aspect-square rounded-lg object-cover"
                                    />
                                    <span className="text-xs text-center text-gray-700 leading-tight">
                                        {category.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="flex w-full lg:hidden">
                    {/* Content - Subcategories Grid (Mobile) */}
                    <div className="flex-1 p-2">
                        <h2 className="text-lg font-semibold text-accent-2 mt-2 mb-4">
                            {categories.find(cat => cat.id === activeCategoryId)?.name || getLocalizedLabel('categories')}
                        </h2>

                        {/* 3-column grid for mobile */}
                        <div className="grid grid-cols-3 gap-3">
                            {subcategories.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg border border-gray-200 p-2 transition-shadow cursor-pointer"
                                >
                                    <Image
                                        width={200}
                                        height={200}
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full aspect-square object-cover rounded-lg mb-2"
                                    />
                                    <h4 className="text-xs text-center text-gray-700 font-medium leading-tight">
                                        {item.title}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex w-full">
                    {/* Left Sidebar - Categories (Desktop) */}
                    <div className="w-64 bg-white border-r border-gray-200">
                        <div className="p-4 h-screen">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {getLocalizedLabel('categories')}
                            </h3>

                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategoryId(category.id)}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                                            activeCategoryId === category.id
                                                ? 'bg-blue-50 border-2 border-blue-500'
                                                : 'bg-gray-50'
                                        }`}
                                    >
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                        />
                                        <span className="text-sm text-gray-700 font-medium">
                                            {category.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Subcategories Grid (Desktop) */}
                    <div className="flex-1 p-6">
                        <h2 className="text-xl font-semibold text-accent-2 mb-6">
                            {categories.find(cat => cat.id === activeCategoryId)?.name || getLocalizedLabel('categories')}
                        </h2>

                        {/* Responsive Grid for desktop */}
                        <div className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                            {subcategories.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg border border-gray-200 p-4 transition-shadow cursor-pointer"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full aspect-square object-cover rounded-lg mb-3"
                                    />
                                    <h4 className="text-sm text-center text-gray-700 font-medium leading-tight">
                                        {item.title}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;