import {routing} from "@/i18n/routing";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface BaseIconProps {
    width?: number;
    height?: number;
    className?: string;
    color?: string;
    filled?: boolean;
}

export interface BadgeIconProps extends BaseIconProps {
    badgeCount?: number;
    showBadge?: boolean;
}

export interface ImageI {
    id: string;
    path: string | StaticImport;
    object_id: string;
    object_type: string;
}

export type SupportedLocales = typeof routing.locales[number];

export type LocalizedText = Record<SupportedLocales, string>;