import {routing} from "@/i18n/routing";

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

export type SupportedLocales = typeof routing.locales[number];