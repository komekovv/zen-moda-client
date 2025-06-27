import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

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
export const isEmpty = (value: string | null | RequestCookie) => {
    if (typeof value === 'string') return !value.trim();
};
