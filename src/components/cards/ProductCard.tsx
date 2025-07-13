'use client'
import React, {useState} from 'react';
import {Heart} from 'lucide-react';
import Image from "next/image";
import { LocalizedText} from "@/types/types";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Rating from "@/components/ui/Rating";
import {MarketShort} from "@/api/queryTypes/Home";
import {Link} from "@/i18n/navigation";

interface ProductCardProps {
    id: string;
    variationId?: string;
    name: string;
    description?: string;
    image: string | StaticImport;
    basePrice: string;
    discountPrice?: string;
    discountPercentage: number;
    currency: string;
    rating: number;
    reviewCount: number;
    viewCount: number;
    brand?: string;
    isNew: boolean;
    isFeatured: boolean;
    isRecommended?: boolean;
    isInCart?: boolean;
    isInComparison?: boolean;
    isInWishlist: boolean;
    store: MarketShort;
    saleEndDate?: string;
    stock?: number;

    isOnSale?: boolean;

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

interface DiscountBadgeProps {
    discountPercentage: number;
}

const Timer: React.FC<TimerProps> = ({endTime, onExpire}) => {
    const [timeLeft, setTimeLeft] = React.useState<{
        hours: number;
        minutes: number;
        seconds: number;
    }>({hours: 0, minutes: 0, seconds: 0});

    React.useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const target = endTime.getTime();
            const difference = target - now;

            if (difference > 0) {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({hours, minutes, seconds});
            } else {
                setTimeLeft({hours: 0, minutes: 0, seconds: 0});
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

const DiscountBadge: React.FC<DiscountBadgeProps> = ({discountPercentage}) => {
    return (
        <div className="absolute bottom-0 left-0 bg-sale text-white px-2 py-1 rounded text-xs font-bold">
            -{discountPercentage}%
        </div>
    );
};

const ProductCard: React.FC<ProductCardProps> = ({
                                                     id,
                                                     variationId,
                                                     name,
                                                     description,
                                                     image,
                                                     basePrice,
                                                     discountPrice,
                                                     discountPercentage,
                                                     currency = "TMT",
                                                     rating = 0,
                                                     reviewCount,
                                                     viewCount,
                                                     brand,
                                                     isNew,
                                                     isFeatured,
                                                     isRecommended,
                                                     isInCart,
                                                     isInComparison,
                                                     isInWishlist = false,
                                                     store,
                                                     saleEndDate,

                                                     isOnSale = false,

                                                     onFavoriteToggle,
                                                     onCardClick,
                                                     className = '',
                                                     forMain = false,
                                                     forStore = false
                                                 }) => {
    const [favorite, setFavorite] = useState(isInWishlist);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setFavorite(!favorite);
        onFavoriteToggle?.(id);
    };

    const handleCardClick = () => {
        onCardClick?.(id);
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
                        // alt={typeof name === "string" ? name : name.tk}
                        alt={"product image"}
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
            return <StoreImageContent/>;
        }

        return (
            <Link href={`/product/${id}`} className="block">
                <StoreImageContent/>
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
                    alt={"product image"}
                    width={forMain ? 154 : 300}
                    height={forMain ? 200 : 300}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                />

                {/*{isOnSale && saleEndDate && (*/}
                {/*    <Timer*/}
                {/*        endTime={saleEndDate}*/}
                {/*        onExpire={() => console.log('Sale expired for product:', id)}*/}
                {/*    />*/}
                {/*)}*/}

                {discountPercentage && <DiscountBadge discountPercentage={discountPercentage}/>}

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
                        {discountPrice ? discountPrice : basePrice} {currency}
                    </span>
                    {discountPrice && (
                        <span className="text-body-description text-passive line-through font-rubik">
                            {basePrice} {currency}
                        </span>
                    )}
                </div>

                <h3 className="text-black text-body-description font-rubik line-clamp-2 leading-relaxed">
                    <span className={'font-bold'}>{store?.name}</span> {name}
                </h3>

                <Rating rating={rating} reviewCount={reviewCount}/>
            </div>
        </div>
    );

    if (onCardClick) {
        return <CardContent/>;
    }

    return (
        <Link href={`/product/${id}`} className="block">
            <CardContent/>
        </Link>
    );
};

export default ProductCard;