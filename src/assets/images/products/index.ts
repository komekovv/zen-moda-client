import {StaticImport} from "next/dist/shared/lib/get-img-props";
import prod1 from './prod1.jpg'
import prod2 from './prod2.jpg'
import prod3 from './prod3.jpg'
import prod4 from './prod4.jpg'
import prod5 from './prod5.jpg'
import prod6 from './prod6.jpg'
import prod7 from './prod7.jpg'
import prod8 from './prod8.jpg'
import prod9 from './prod9.jpg'
import prod10 from './prod10.jpg'
import prod11 from './prod11.jpg'
import prod12 from './prod12.jpg'
import prod13 from './prod13.jpg'
import prod14 from './prod14.jpg'
import prod15 from './prod15.jpg'
import prod16 from './prod16.jpg'
import prod17 from './prod17.jpg'
import detail1 from './detail1.jpg'
import detail2 from './detail2.jpg'
import detail3 from './detail3.jpg'
import detail4 from './detail4.jpg'

export const Prod1 = prod1 as StaticImport;
export const Prod2 = prod2 as StaticImport;
export const Prod3 = prod3 as StaticImport;
export const Prod4 = prod4 as StaticImport;
export const Prod5 = prod5 as StaticImport;
export const Prod6 = prod6 as StaticImport;
export const Prod7 = prod7 as StaticImport;
export const Prod8 = prod8 as StaticImport;
export const Prod9 = prod9 as StaticImport;
export const Prod10 = prod10 as StaticImport;
export const Prod11 = prod11 as StaticImport;
export const Prod12 = prod12 as StaticImport;
export const Prod13 = prod13 as StaticImport;
export const Prod14 = prod14 as StaticImport;
export const Prod15 = prod15 as StaticImport;
export const Prod16 = prod16 as StaticImport;
export const Prod17 = prod17 as StaticImport;
export const Detail1 = detail1 as StaticImport;
export const Detail2 = detail2 as StaticImport;
export const Detail3 = detail3 as StaticImport;
export const Detail4 = detail4 as StaticImport;

export const sampleProducts = [
    {
        id: '1',
        variationId: '1',
        name: {
            tk: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital Hygrometer Thermometer Work with Mijia APP',
            ru: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital Hygrometer Thermometer Work with Mijia APP',
        },
        description: {
            tk: '',
            ru: '',
        },
        image: Prod1,
        basePrice: 682,
        discountPrice: 546,
        discountPercentage: 20,
        currency: 'TMT',
        stock: 100,
        rating: 4.5,
        reviewCount: 213,
        viewCount: 0,
        brand: '',
        isNew: true,
        isFeatured: false,
        isRecommended: false,
        isInCart: false,
        isInComparison: false,
        isInWishlist: false,
        store: { id: '1', name: 'Polo' },
        saleEndDate: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
        isOnSale: true,
    },
    ...[Prod2, Prod3, Prod4, Prod5, Prod6, Prod7, Prod8, Prod9, Prod10, Prod11, Prod12].map((image, index) => ({
        id: `${index + 2}`,
        variationId: `${index + 2}`,
        name: {
            tk: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital Hygrometer Thermometer Work with Mijia APP',
            ru: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital Hygrometer Thermometer Work with Mijia APP',
        },
        description: {
            tk: '',
            ru: '',
        },
        image,
        basePrice: 682,
        discountPrice: 546,
        discountPercentage: 20,
        currency: 'TMT',
        stock: 100,
        rating: 4.5,
        reviewCount: 213,
        viewCount: 0,
        brand: '',
        isNew: true,
        isFeatured: false,
        isRecommended: false,
        isInCart: false,
        isInComparison: false,
        isInWishlist: false,
        store: { id: '1', name: 'Polo' },
        saleEndDate: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
        isOnSale: true,
    }))
];

export const products = [
    {
        id: '1',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital Hygrometer Thermometer Work with Mijia APP',
        image: Prod12,
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000), // 03:23:11
    },
    {
        id: '2',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: Prod13,
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '3',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric',
        image: Prod14,
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '4',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: Prod15,
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '5',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: Prod16,
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
    {
        id: '6',
        title: 'XIAOMI Mijia Bluetooth Thermometer 2 Wireless Smart Electric Digital',
        image: Prod17,
        currentPrice: 546,
        originalPrice: 682,
        currency: 'TMT',
        discount: 20,
        rating: 4.5,
        reviewCount: 213,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 23 * 60 * 1000 + 11 * 1000),
    },
]