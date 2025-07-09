import {StaticImport} from "next/dist/shared/lib/get-img-props";
import bag from './bag.png';
import hat from './hat.png';
import jeans from './jeans.png';
import mug from './mug.png';
import pantalon from './pantalon.png';
import phone from './phone.png';
import socks from './socks.png';
import sweater from './sweater.png';
import tshirt from './tshirt.png';
import {Category} from "@/components/cards/CategoryCard";

export const Bag = bag as StaticImport;
export const Hat = hat as StaticImport;
export const Jeans = jeans as StaticImport;
export const Mug = mug as StaticImport;
export const Pantalon = pantalon as StaticImport;
export const Phone = phone as StaticImport;
export const Socks = socks as StaticImport;
export const Sweater = sweater as StaticImport;
export const Tshirt = tshirt as StaticImport;

export const mockCategories = [
    {
        id: '1',
        name: 'Jeans',
        photos: {
            id: '1',
            path: Jeans,
            object_id: '1',
            object_type: 'category'
        },
    },
    {
        id: '2',
        name: 'T-Shirt',
        photos: {
            id: '2',
            path: Tshirt,
            object_id: '2',
            object_type: 'category'
        },
    },
    {
        id: '3',
        name: 'Mug',
        photos: {
            id: '3',
            path: Mug,
            object_id: '3',
            object_type: 'category'
        },
    },
    {
        id: '4',
        name: 'Sweater',
        photos: {
            id: '4',
            path: Sweater,
            object_id: '4',
            object_type: 'category'
        },
    },
    {
        id: '5',
        name: 'Hat',
        photos: {
            id: '5',
            path: Hat,
            object_id: '5',
            object_type: 'category'
        },
    },
    {
        id: '6',
        name: 'Shirt',
        photos: {
            id: '6',
            path: Tshirt,
            object_id: '6',
            object_type: 'category'
        },
    },
    {
        id: '7',
        name: 'Phone',
        photos: {
            id: '7',
            path: Phone,
            object_id: '7',
            object_type: 'category'
        },
    },
    {
        id: '8',
        name: 'Backpack',
        photos: {
            id: '8',
            path: Bag,
            object_id: '8',
            object_type: 'category'
        },
    },
    {
        id: '9',
        name: 'Pants',
        photos: {
            id: '9',
            path: Pantalon,
            object_id: '9',
            object_type: 'category'
        },
    },
    {
        id: '10',
        name: 'Socks',
        photos: {
            id: '10',
            path: Socks,
            object_id: '10',
            object_type: 'category'
        },
    }
];
