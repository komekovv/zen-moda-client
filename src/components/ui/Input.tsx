'use client';

import React, { useState, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    prefix?: string;
    showLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, prefix, showLabel = true, className = '', ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const [hasValue, setHasValue] = useState(false);

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
            props.onBlur?.(e);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setHasValue(e.target.value.length > 0);
            props.onChange?.(e);
        };

        const shouldShowFloatingLabel = showLabel && label && (isFocused || hasValue || props.value);
        const shouldShowCenterLabel = showLabel && label && !isFocused && !hasValue && !props.value && !prefix;
        const shouldShowStaticTopLabel = showLabel && label && prefix; // Always show label on top when prefix exists

        return (
            <div className="relative">
                <div className="relative">
                    {/* Static Top Label for Prefix Inputs */}
                    {shouldShowStaticTopLabel && (
                        <label className={`${error ? 'text-sale' : 'text-gray-500'} absolute left-3 top-2 text-xs pointer-events-none z-20`}>
                            {label}
                        </label>
                    )}

                    {prefix && (
                        <span className="absolute left-3 top-[38%] translate-y-1 text-black z-10">
                            {prefix}
                        </span>
                    )}

                    <input
                        ref={ref}
                        {...props}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={`
                            w-full h-12 border rounded-md 
                            focus:outline-none focus:ring-2 transition-all duration-200
                            ${prefix ? 'pl-14 pr-3 pt-6 pb-1' : 'px-3'}
                            ${error
                            ? 'border border-sale focus:border-sale focus:ring-0 '
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }
                            ${!prefix && (shouldShowFloatingLabel ? 'pt-6 pb-1' : 'py-3')}
                            ${className}
                        `}
                        placeholder={prefix ? "" : props.placeholder || ""}
                    />

                    {!prefix && shouldShowFloatingLabel && (
                        <label className={`${error ? 'text-sale' : 'text-gray-500'} absolute left-3 top-2 text-xs transition-all duration-200 pointer-events-none`}>
                            {label}
                        </label>
                    )}

                    {shouldShowCenterLabel && (
                        <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none">
                            {label}
                        </label>
                    )}
                </div>

                {error && (
                    <p className="mt-1 text-sm text-sale">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;