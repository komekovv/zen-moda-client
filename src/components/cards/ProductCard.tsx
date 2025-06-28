'use client'
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

// Types (same as before)
interface ProductCardProps {
    id: string;
    title: string;
    image: string;
    currentPrice: number;
    originalPrice?: number;
    currency?: string;
    discount?: number;
    rating?: number;
    reviewCount?: number;
    isOnSale?: boolean;
    saleEndTime?: Date;
    isFavorite?: boolean;
    onFavoriteToggle?: (id: string) => void;
    onCardClick?: (id: string) => void;
    className?: string;
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

// Timer Component
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
        <div className="absolute top-0 left-0 bg-warning text-white px-2 py-1 rounded text-sm font-bold tracking-wider">
            {formatTime(timeLeft.hours, timeLeft.minutes, timeLeft.seconds)}
        </div>
    );
};

// Rating Component
const Rating: React.FC<RatingProps> = ({ rating, reviewCount, maxRating = 5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxRating - Math.ceil(rating);

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {/* Full stars */}
                {Array.from({ length: fullStars }).map((_, index) => (
                    <svg
                        key={`full-${index}`}
                        className="w-4 h-4 fill-warning text-warning"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}

                {/* Half star */}
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

                {/* Empty stars */}
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

// Discount Badge Component
const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discount }) => {
    return (
        <div className="absolute bottom-0 left-0 bg-sale text-white px-2 py-1 rounded text-sm font-bold">
            -{discount}%
        </div>
    );
};

// Product Card Component
const ProductCard: React.FC<ProductCardProps> = ({
                                                     id,
                                                     title,
                                                     image,
                                                     currentPrice,
                                                     originalPrice,
                                                     currency = 'TMT',
                                                     discount,
                                                     rating = 0,
                                                     reviewCount,
                                                     isOnSale = false,
                                                     saleEndTime,
                                                     isFavorite = false,
                                                     onFavoriteToggle,
                                                     onCardClick,
                                                     className = ''
                                                 }) => {
    const [favorite, setFavorite] = useState(isFavorite);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFavorite(!favorite);
        onFavoriteToggle?.(id);
    };

    const handleCardClick = () => {
        onCardClick?.(id);
    };

    const formatPrice = (price: number) => {
        return `${price} ${currency}`;
    };

    return (
        <div
            className={`relative rounded cursor-pointer group select-none ${className}`}
            onClick={handleCardClick}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden rounded bg-blue-shade-1">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                />

                {/* Timer Badge */}
                {isOnSale && saleEndTime && (
                    <Timer
                        endTime={saleEndTime}
                        onExpire={() => console.log('Sale expired for product:', id)}
                    />
                )}

                {/* Discount Badge */}
                {discount && <DiscountBadge discount={discount} />}

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center transition-all duration-200"
                    aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart
                        className={`w-5 h-5 transition-colors duration-200 ${
                            favorite ? 'fill-sale text-sale' : 'text-black fill-white hover:text-sale'
                        }`}
                    />
                </button>
            </div>

            {/* Content */}
            <div className="pl-0 pr-4 py-4 space-y-2">
                {/* Price */}
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

                {/* Title */}
                <h3 className="text-black text-body-description font-rubik line-clamp-2 leading-relaxed">
                    {title}
                </h3>

                {/* Rating */}
                <Rating rating={rating} reviewCount={reviewCount} />
            </div>
        </div>
    );
};

export default ProductCard;