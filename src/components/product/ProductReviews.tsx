import React from 'react';
import Rating from '@/components/ui/Rating';
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {ProductReviewListResponse} from "@/api/queryTypes/ProductReviews";

interface ProductInfo {
    image: string | StaticImport;
    brand: string;
    name: string;
    rating: number;
    reviewCount: number;
}

interface ProductReviewsProps {
    product: ProductInfo;
    reviews?: ProductReviewListResponse;
    error?: any;
    loading?: boolean;
    onViewAll?: () => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
                                                           product = {
                                                               image: '/adidas-shoe.jpg',
                                                               brand: 'Adidas',
                                                               name: 'Adidas. Erkek sport aýakgaby 55562- VR02 Gara renkli aýakgap Sport',
                                                               rating: 4.3,
                                                               reviewCount: 213
                                                           },
                                                           reviews,
                                                           onViewAll
                                                       }) => {
    return (
        <div className="bg-white border-t border-[#E5E5E5] py-6 mb-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#161616] text-2xl font-bold">Teswir</h2>
                <button
                    className="text-[#A0A3BD] text-sm"
                    onClick={onViewAll}
                >
                    Hemmesini gör ({reviews?.totals?.totalCount || 0})
                </button>
            </div>

            <div className="bg-[#F8F9FA] rounded-lg p-4 mb-6">
                <div className="flex gap-4">
                    <div className="w-20 h-20 bg-white rounded-lg border border-[#E5E5E5] flex items-center justify-center overflow-hidden">
                        <Image
                            width={200}
                            height={200}
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="text-[#0762C8] font-semibold mb-1">
                            {product.brand}
                        </div>
                        <div className="text-[#161616] text-sm mb-2">
                            {product.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#161616] font-semibold">
                            {product.rating}
                          </span>
                            <Rating
                                rating={product.rating}
                                maxRating={5}
                            />
                            <span className="text-[#A0A3BD] text-sm">
                                ({product.reviewCount} Teswir)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {reviews?.data && reviews.data.length > 0 ? (
                    reviews.data.map((review) => (
                        <div key={review.id} className="border-b border-[#E5E5E5] last:border-b-0 pb-6 last:pb-0">
                            <div className="mb-3">
                                <Rating
                                    rating={review.rate}
                                    maxRating={5}
                                />
                            </div>

                            <p className="text-[#161616] mb-4 leading-relaxed">
                                {review.content}
                            </p>

                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#161616] font-medium">
                                {review.username}
                              </span>
                              <span className="text-[#A0A3BD]">
                                {review.createdAt}
                              </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-[#A0A3BD]">
                        Henüz teswir ýok
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductReviews;