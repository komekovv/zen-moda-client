import {StaticImport} from "next/dist/shared/lib/get-img-props";
import apple from './apple.png';
import iphone from './iphone.png';
import macbook from './macbook.png';
import smartwatch from './smartwatch.png';
import {Store} from "@/components/cards/StoreCard";

export const Apple = apple as StaticImport;
export const Iphone = iphone as StaticImport;
export const Mackbook = macbook as StaticImport;
export const Smartwatch = smartwatch as StaticImport;

export const mockStores: Store[] = [
    {
        id: "apple-store",
        title: "Apple inc.",
        description: "iPhones, macbooks, iwatches birden uzyn bolsa",
        image: Apple,
        products: [
            { id: "watch", title: "Apple Watch", image: Smartwatch, currentPrice: 999 },
            { id: "macbook", title: "MacBook", image: Mackbook, currentPrice: 2999 },
            { id: "iphone", title: "iPhone", image: Iphone, currentPrice: 1999 }
        ]
    },
    {
        id: "apple-store",
        title: "Apple inc.",
        description: "iPhones, macbooks, iwatches birden uzyn bolsa",
        image: Apple,
        products: [
            { id: "watch", title: "Apple Watch", image: Smartwatch, currentPrice: 999 },
            { id: "macbook", title: "MacBook", image: Mackbook, currentPrice: 2999 },
            { id: "iphone", title: "iPhone", image: Iphone, currentPrice: 1999 }
        ]
    },
    {
        id: "apple-store",
        title: "Apple inc.",
        description: "iPhones, macbooks, iwatches birden uzyn bolsa",
        image: Apple,
        products: [
            { id: "watch", title: "Apple Watch", image: Smartwatch, currentPrice: 999 },
            { id: "macbook", title: "MacBook", image: Mackbook, currentPrice: 2999 },
            { id: "iphone", title: "iPhone", image: Iphone, currentPrice: 1999 }
        ]
    },
    {
        id: "apple-store",
        title: "Apple inc.",
        description: "iPhones, macbooks, iwatches birden uzyn bolsa",
        image: Apple,
        products: [
            { id: "watch", title: "Apple Watch", image: Smartwatch, currentPrice: 999 },
            { id: "macbook", title: "MacBook", image: Mackbook, currentPrice: 2999 },
            { id: "iphone", title: "iPhone", image: Iphone, currentPrice: 1999 }
        ]
    },
    {
        id: "apple-store",
        title: "Apple inc.",
        description: "iPhones, macbooks, iwatches birden uzyn bolsa",
        image: Apple,
        products: [
            { id: "watch", title: "Apple Watch", image: Smartwatch, currentPrice: 999 },
            { id: "macbook", title: "MacBook", image: Mackbook, currentPrice: 2999 },
            { id: "iphone", title: "iPhone", image: Iphone, currentPrice: 1999 }
        ]
    },
]
