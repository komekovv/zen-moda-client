'use client'
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Review {
    id: string;
    userName: string;
    rating: number;
    date: string;
    comment: string;
    verified?: boolean;
}

interface ProductReviewsProps {
    reviews: Review[];
    rating: number;
    reviewCount: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
                                                           reviews,
                                                           rating,
                                                           reviewCount
                                                       }) => {
    const t = useTranslations('product_detail');
    const [showAllReviews, setShowAllReviews] = useState(false);

    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);

        return (
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
        );
    };

    if (!reviews || reviews.length === 0) {
        return null;
    }

    return (
        <div className="bg-white border-t border-border overflow-hidden mb-8">
            <div className=" py-4 border-b border-border">
                <div className="flex items-center justify-between">
                    <h2 className="text-h3 text-black font-rubik">
                        {t('reviews.title')}
                    </h2>
                    <div className="flex items-center gap-2">
                        {renderStars(rating)}
                        <span className="text-body-description text-black font-rubik ml-2">
              {rating.toFixed(1)} ({reviewCount} {t('reviews.count')})
            </span>
                    </div>
                </div>
            </div>

            <div className="py-4">
                <div className="space-y-6">
                    {displayedReviews.map((review) => (
                        <div key={review.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-body-brand text-black font-rubik font-medium">
                                            {review.userName}
                                        </h4>
                                    </div>
                                    {renderStars(review.rating)}
                                </div>
                                <span className="text-small text-passive font-rubik">
                  {review.date}
                </span>
                            </div>
                            <p className="text-body-description text-black font-rubik leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>

                {reviews.length > 3 && (
                    <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="mt-6 text-primary font-rubik text-body-description font-medium hover:underline"
                    >
                        {showAllReviews
                            ? t('reviews.show_less')
                            : t('reviews.show_all', { count: reviews.length - 3 })
                        }
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductReviews;