'use client'
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import {ImageI} from "@/types/types";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

interface ProductCardProps {
    id: string;
    title: string;
    image: string | StaticImport;
    currentPrice: number;
    originalPrice?: number;
    discount?: number;
    rating?: number;
    reviewCount?: number;
    isOnSale?: boolean;
    saleEndTime?: Date;
    isFavorite?: boolean;
    onFavoriteToggle?: (id: string) => void;
    onCardClick?: (id: string) => void;
    className?: string;
    forMain?: boolean;
    forStore?: boolean;
}

interface TimerProps {
    endTime: Date;
    onExpire?: () => void;
}

interface RatingProps {
    rating: number;
    reviewCount?: number;
    maxRating?: number;
}

interface DiscountBadgeProps {
    discount: number;
}

const Timer: React.FC<TimerProps> = ({ endTime, onExpire }) => {
    const [timeLeft, setTimeLeft] = React.useState<{
        hours: number;
        minutes: number;
        seconds: number;
    }>({ hours: 0, minutes: 0, seconds: 0 });

    React.useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const target = endTime.getTime();
            const difference = target - now;

            if (difference > 0) {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ hours, minutes, seconds });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                onExpire?.();
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [endTime, onExpire]);

    const formatTime = (hours: number, minutes: number, seconds: number) => {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="absolute top-0 left-0 bg-warning text-white px-2 py-1 rounded text-xs font-bold tracking-wider">
            {formatTime(timeLeft.hours, timeLeft.minutes, timeLeft.seconds)}
        </div>
    );
};

const Rating: React.FC<RatingProps> = ({ rating, reviewCount, maxRating = 5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxRating - Math.ceil(rating);

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {Array.from({ length: fullStars }).map((_, index) => (
                    <svg
                        key={`full-${index}`}
                        className="w-4 h-4 fill-warning text-warning"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}

                {hasHalfStar && (
                    <div className="relative">
                        <svg className="w-4 h-4 text-passive" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="absolute inset-0 w-1/2 overflow-hidden">
                            <svg className="w-4 h-4 fill-warning text-warning" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>
                )}

                {Array.from({ length: emptyStars }).map((_, index) => (
                    <svg
                        key={`empty-${index}`}
                        className="w-4 h-4 text-passive"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {reviewCount && (
                <span className="text-small text-passive ml-1">({reviewCount})</span>
            )}
        </div>
    );
};

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discount }) => {
    return (
        <div className="absolute bottom-0 left-0 bg-sale text-white px-2 py-1 rounded text-xs font-bold">
            -{discount}%
        </div>
    );
};

const ProductCard: React.FC<ProductCardProps> = ({
                                                     id,
                                                     title,
                                                     image,
                                                     currentPrice,
                                                     originalPrice,
                                                     discount,
                                                     rating = 0,
                                                     reviewCount,
                                                     isOnSale = false,
                                                     saleEndTime,
                                                     isFavorite = false,
                                                     onFavoriteToggle,
                                                     onCardClick,
                                                     className = '',
                                                     forMain = false,
                                                     forStore = false
                                                 }) => {
    const [favorite, setFavorite] = useState(isFavorite);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setFavorite(!favorite);
        onFavoriteToggle?.(id);
    };

    const handleCardClick = () => {
        onCardClick?.(id);
    };

    const formatPrice = (price: number) => {
        return `${price.toFixed(0)} TMT`;
    };

    if (forStore) {
        const StoreImageContent = () => (
            <div
                className={`relative cursor-pointer group select-none w-16 h-16 md:w-16 md:h-16 sm:w-[51px] sm:h-[51px] ${className}`}
                onClick={handleCardClick}
            >
                <div className="relative overflow-hidden rounded bg-blue-shade-1 w-full h-full">
                    <Image
                        src={image}
                        alt={title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                    />
                </div>
            </div>
        );

        if (onCardClick) {
            return <StoreImageContent />;
        }

        return (
            <Link href={`/product/${id}`} className="block">
                <StoreImageContent />
            </Link>
        );
    }

    const CardContent = () => (
        <div
            className={`relative cursor-pointer group select-none flex flex-col gap-2.5 ${
                forMain ? 'w-[154px]' : 'w-full'
            } ${className}`}
            onClick={handleCardClick}
        >
            <div className={`relative overflow-hidden rounded bg-blue-shade-1 ${
                forMain ? 'aspect-[154/200]' : 'aspect-square'
            }`}>
                <Image
                    src={image}
                    alt={title}
                    width={forMain ? 154 : 300}
                    height={forMain ? 200 : 300}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                />

                {isOnSale && saleEndTime && (
                    <Timer
                        endTime={saleEndTime}
                        onExpire={() => console.log('Sale expired for product:', id)}
                    />
                )}

                {discount && <DiscountBadge discount={discount} />}

                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-1 right-1 w-8 h-8 flex items-center justify-center"
                    aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart
                        className={`w-5 h-5 transition-colors duration-200 ${
                            favorite ? 'fill-sale text-sale' : 'fill-white text-black hover:text-sale'
                        }`}
                    />
                </button>
            </div>

            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-body-price text-sale font-rubik">
                        {formatPrice(currentPrice)}
                    </span>
                    {originalPrice && originalPrice > currentPrice && (
                        <span className="text-body-description text-passive line-through font-rubik">
                            {formatPrice(originalPrice)}
                        </span>
                    )}
                </div>

                <h3 className="text-black text-body-description font-rubik line-clamp-2 leading-relaxed">
                    {title}
                </h3>

                <Rating rating={rating} reviewCount={reviewCount} />
            </div>
        </div>
    );

    if (onCardClick) {
        return <CardContent />;
    }

    return (
        <Link href={`/product/${id}`} className="block">
            <CardContent />
        </Link>
    );
};

export default ProductCard;