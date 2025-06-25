import React from "react";
import {BaseIconProps} from "@/types/types";

export const HeartIcon: React.FC<BaseIconProps> = ({
                                                       width = 20,
                                                       height = 19,
                                                       className = "",
                                                       color = "currentColor",
                                                       filled = false
                                                   }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 19"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        {filled ? (
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99987 3.435L9.10362 2.51375C6.99987 0.35125 3.14237 1.0975 1.74987 3.81625C1.09612 5.095 0.948619 6.94125 2.14237 9.2975C3.29237 11.5662 5.68487 14.2837 9.99987 17.2437C14.3149 14.2837 16.7061 11.5662 17.8574 9.2975C19.0511 6.94 18.9049 5.095 18.2499 3.81625C16.8574 1.0975 12.9999 0.35 10.8961 2.5125L9.99987 3.435Z"
                fill={color}
            />
        ) : (
            <path
                d="M17.8574 9.2975C19.0511 6.94 18.9049 5.095 18.2499 3.81625C16.8574 1.0975 12.9999 0.35 10.8961 2.5125L9.99987 3.435L9.10362 2.51375C6.99987 0.35125 3.14237 1.0975 1.74987 3.81625C1.09612 5.095 0.948619 6.94125 2.14237 9.2975C3.29237 11.5662 5.68487 14.2837 9.99987 17.2437C14.3149 14.2837 16.7061 11.5662 17.8574 9.2975Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        )}
    </svg>
);