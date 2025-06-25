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