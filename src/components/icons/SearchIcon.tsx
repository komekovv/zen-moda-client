import React from "react";
import {BaseIconProps} from "@/types/types";

export const SearchIcon: React.FC<BaseIconProps> = ({
                                                        width = 24,
                                                        height = 24,
                                                        className = "",
                                                        color = "currentColor",
                                                        filled = false
                                                    }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        {filled ? (
            <>
                <circle cx="11" cy="11" r="8" fill={color}/>
                <path d="M21.0004 21L16.6504 16.65" stroke="white" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </>
        ) : (
            <>
                <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.0004 21L16.6504 16.65" stroke={color} strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </>
        )}
    </svg>
);
