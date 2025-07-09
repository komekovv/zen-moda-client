import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {SupportedLocales} from "@/types/types";

export const CheckObjOrArrForNull = (obj_or_arr: any) => {
    if (obj_or_arr !== null && obj_or_arr !== undefined) {
        if (obj_or_arr instanceof Object && Object.keys(obj_or_arr).length !== 0) return true;
        else if (Array.isArray(obj_or_arr) && obj_or_arr.length !== 0) return true;
    }
    return false;
};

export const isUndefined = (data: any): data is undefined | null => {
    return typeof data === 'undefined' || data === null;
};

export const getLocalizedText = (
    text: Record<string, SupportedLocales>,
    locale: string = 'tk'
): string => {
    if (!text) return '';

    if (text[locale as keyof Record<string, SupportedLocales>]) {
        return text[locale as keyof Record<string, SupportedLocales>];
    }

    return text.tk || text.ru || '';
};

export const isEmpty = (value: any): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
};