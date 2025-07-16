import { ProductDetail, ProductVariant, ColorOption, SizeOption } from '@/api/queryTypes/Product';

export interface VariantData {
    colors: ColorOption[];
    sizes: SizeOption[];
    variantMap: Map<string, ProductVariant>; // key: `${colorId}-${sizeId}`
}

/**
 * Extracts color and size options from product variants
 */
export function extractVariantData(product: ProductDetail): VariantData {
    const colorsMap = new Map<string, ColorOption>();
    const sizesMap = new Map<string, SizeOption>();
    const variantMap = new Map<string, ProductVariant>();

    // Include the main product as a variant if it's not a variant itself
    const allVariants: ProductVariant[] = [...(product.variants || [])];

    if (!product.isVariant) {
        allVariants.push({
            id: product.id,
            sku: product.sku,
            name: product.name,
            basePrice: product.basePrice,
            discountPrice: product.discountPrice,
            stock: product.stock,
            size: product.size,
            productType: product.productType,
            isVariant: false,
            parentProductId: product.parentProductId || '',
            photos: product.photos
        });
    }

    // Extract unique sizes
    allVariants.forEach(variant => {
        if (variant.size && !sizesMap.has(variant.size)) {
            sizesMap.set(variant.size, {
                id: variant.size,
                size: variant.size,
                available: variant.stock > 0
            });
        }
    });

    // Group variants by color (using SKU pattern or photo similarity)
    const colorGroups = groupVariantsByColor(allVariants);

    colorGroups.forEach((variants, colorKey) => {
        const colorId = `color-${colorKey}`;
        const colorName = extractColorFromSKU(variants[0].sku) || `Color ${colorKey}`;
        const colorCode = getColorCodeFromName(colorName);

        colorsMap.set(colorId, {
            id: colorId,
            name: {
                ru: colorName,
                tk: colorName
            },
            code: colorCode,
            image: variants[0].photos[0]?.path || '',
            available: variants.some(v => v.stock > 0)
        });

        // Create variant map entries for each color-size combination
        variants.forEach(variant => {
            const key = `${colorId}-${variant.size}`;
            variantMap.set(key, variant);
        });
    });

    return {
        colors: Array.from(colorsMap.values()),
        sizes: Array.from(sizesMap.values()),
        variantMap
    };
}

/**
 * Groups variants by color based on SKU patterns
 */
function groupVariantsByColor(variants: ProductVariant[]): Map<string, ProductVariant[]> {
    const colorGroups = new Map<string, ProductVariant[]>();

    variants.forEach(variant => {
        // Extract color from SKU (assuming pattern like PROD-SIZE-COLOR)
        const colorFromSKU = extractColorFromSKU(variant.sku);
        const colorKey = colorFromSKU || 'default';

        if (!colorGroups.has(colorKey)) {
            colorGroups.set(colorKey, []);
        }
        colorGroups.get(colorKey)?.push(variant);
    });

    return colorGroups;
}

/**
 * Extracts color name from SKU
 */
function extractColorFromSKU(sku: string): string | null {
    // Common color patterns in SKUs
    const colorPatterns = {
        'YASHYL': 'Green',
        'GYZYL': 'Red',
        'GARA': 'Black',
        'AK': 'White',
        'MAWI': 'Blue',
        'SARY': 'Yellow',
        'GOŇUR': 'Brown',
        'GYRMYZY': 'Red',
    };

    for (const [pattern, colorName] of Object.entries(colorPatterns)) {
        if (sku.toUpperCase().includes(pattern)) {
            return colorName;
        }
    }

    return null;
}

/**
 * Maps color names to hex codes
 */
function getColorCodeFromName(colorName: string): string {
    const colorCodes: Record<string, string> = {
        'Green': '#22C55E',
        'Red': '#EF4444',
        'Black': '#000000',
        'White': '#FFFFFF',
        'Blue': '#3B82F6',
        'Yellow': '#EAB308',
        'Brown': '#A3A3A3',
        'Gray': '#6B7280',
        'Purple': '#8B5CF6',
        'Pink': '#EC4899',
        'Orange': '#F97316'
    };

    return colorCodes[colorName] || '#CCCCCC';
}

/**
 * Finds the variant for a specific color and size combination
 */
export function findVariant(
    variantMap: Map<string, ProductVariant>,
    colorId: string,
    sizeId: string
): ProductVariant | null {
    const key = `${colorId}-${sizeId}`;
    return variantMap.get(key) || null;
}

/**
 * Gets available sizes for a specific color
 */
export function getAvailableSizesForColor(
    colors: ColorOption[],
    sizes: SizeOption[],
    variantMap: Map<string, ProductVariant>,
    colorId: string
): SizeOption[] {
    return sizes.map(size => {
        const variant = findVariant(variantMap, colorId, size.id);
        return {
            ...size,
            available: variant ? variant.stock > 0 : false
        };
    });
}

/**
 * Gets available colors for a specific size
 */
export function getAvailableColorsForSize(
    colors: ColorOption[],
    sizes: SizeOption[],
    variantMap: Map<string, ProductVariant>,
    sizeId: string
): ColorOption[] {
    return colors.map(color => {
        const variant = findVariant(variantMap, color.id, sizeId);
        return {
            ...color,
            available: variant ? variant.stock > 0 : false
        };
    });
}