import React from "react";
import {BadgeIconProps} from "@/types/types";

export const BagIcon: React.FC<BadgeIconProps> = ({
                                                      width = 20,
                                                      height = 20,
                                                      className = "",
                                                      color = "currentColor",
                                                      filled = false,
                                                      badgeCount = 0,
                                                      showBadge = false
                                                  }) => (
    <div className="relative inline-block">
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {filled ? (
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 7V6C5 4.67392 5.52678 3.40215 6.46447 2.46447C7.40215 1.52678 8.67392 1 10 1C11.3261 1 12.5979 1.52678 13.5355 2.46447C14.4732 3.40215 15 4.67392 15 6V7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8V17C18 17.7956 17.6839 18.5587 17.1213 19.1213C16.5587 19.6839 15.7956 20 15 20H5C4.20435 20 3.44129 19.6839 2.87868 19.1213C2.31607 18.5587 2 17.7956 2 17V8C2 7.73478 2.10536 7.48043 2.29289 7.29289C2.48043 7.10536 2.73478 7 3 7H5ZM13 7V6C13 5.20435 12.6839 4.44129 12.1213 3.87868C11.5587 3.31607 10.7956 3 10 3C9.20435 3 8.44129 3.31607 7.87868 3.87868C7.31607 4.44129 7 5.20435 7 6V7H13Z"
                    fill={color}
                />
            ) : (
                <>
                    <path d="M3 7H17V17C17 17.7956 16.6839 18.5587 16.1213 19.1213C15.5587 19.6839 14.7956 20 14 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17V7Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M7 7V6C7 5.20435 7.31607 4.44129 7.87868 3.87868C8.44129 3.31607 9.20435 3 10 3C10.7956 3 11.5587 3.31607 12.1213 3.87868C12.6839 4.44129 13 5.20435 13 6V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </>
            )}
        </svg>
        {(showBadge && badgeCount > 0) && (
            <span className="absolute -top-2 -right-2 bg-sale text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-inter font-medium min-w-[20px]">
        {badgeCount > 99 ? '99+' : badgeCount}
      </span>
        )}
    </div>
);
