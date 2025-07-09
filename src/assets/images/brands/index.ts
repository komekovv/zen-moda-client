import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {Brand} from "@/components/cards/BrandCard";
import reebokLogo from "@/assets/images/brands/reebok-logo.png";
import adidasLogo from "@/assets/images/brands/adidas-logo.png";
import samsungLogo from "@/assets/images/brands/samsung-logo.png";
import appleLogo from "@/assets/images/brands/apple-logo.png";
import kotonLogo from "@/assets/images/brands/koton-logo.png";
import damatLogo from "@/assets/images/brands/damat-logo.png";

export const defaultBrands = [
    {
        id: '1',
        name: 'Reebok',
        photos: {
            id: '1',
            path: reebokLogo as StaticImport,
            object_id: '1',
            object_type: 'brand'
        },
    },
    {
        id: '2',
        name: 'Adidas',
        photos: {
            id: '2',
            path: adidasLogo as StaticImport,
            object_id: '2',
            object_type: 'brand'
        },
    },
    {
        id: '3',
        name: 'Samsung',
        photos: {
            id: '3',
            path: samsungLogo as StaticImport,
            object_id: '3',
            object_type: 'brand'
        },
    },
    {
        id: '4',
        name: 'Apple',
        photos: {
            id: '4',
            path: appleLogo as StaticImport,
            object_id: '4',
            object_type: 'brand'
        },
    },
    {
        id: '5',
        name: 'Koton',
        photos: {
            id: '5',
            path: kotonLogo as StaticImport,
            object_id: '5',
            object_type: 'brand'
        },
    },
    {
        id: '6',
        name: 'Damat',
        photos: {
            id: '6',
            path: damatLogo as StaticImport,
            object_id: '6',
            object_type: 'brand'
        },
    },
    {
        id: '7',
        name: 'Damat',
        photos: {
            id: '6',
            path: damatLogo as StaticImport,
            object_id: '6',
            object_type: 'brand'
        },
    },
];