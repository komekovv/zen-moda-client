import React from "react";

interface IconWrapperProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
                                                            children,
                                                            className = "",
                                                            onClick
                                                        }) => (
    <div
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
    >
        {children}
    </div>
);

interface RoundedIconWrapperProps {
    children: React.ReactNode;
    badgeCount?: number;
    showBadge?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    borderColor?: string;
    backgroundColor?: string;
}

export const RoundedIconWrapper: React.FC<RoundedIconWrapperProps> = ({
                                                                          children,
                                                                          badgeCount = 0,
                                                                          showBadge = false,
                                                                          size = 'md',
                                                                          className = "",
                                                                          onClick,
                                                                          borderColor = "#E5E5E5",
                                                                          backgroundColor = "white"
                                                                      }) => {
    const sizeClasses = {
        sm: "w-10 h-10", // 40px
        md: "w-12 h-12", // 48px
        lg: "w-16 h-16"  // 64px
    };

    const badgeClasses = {
        sm: "h-4 w-4 text-xs -top-[2px] -right-0",
        md: "h-5 w-5 text-xs -top-2 -right-2",
        lg: "h-6 w-6 text-sm -top-2 -right-2"
    };

    return (
        <div className="relative inline-block">
            <div
                className={`
          ${sizeClasses[size]} 
          rounded-full 
          border
          flex 
          items-center 
          justify-center 
          transition-all 
          duration-200
          ${onClick ? 'cursor-pointer hover:border-primary hover:shadow-md' : ''} 
          ${className}
        `}
                style={{
                    borderColor,
                    backgroundColor
                }}
                onClick={onClick}
            >
                {children}
            </div>

            {(showBadge && badgeCount > 0) && (
                <span
                    className={`
            absolute 
            ${badgeClasses[size]}
            bg-sale 
            text-white 
            rounded-full 
            flex 
            items-center 
            justify-center 
            font-inter 
            font-medium 
            min-w-[${size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px'}]
            border
            border-white
          `}
                >
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
            )}
        </div>
    );
};