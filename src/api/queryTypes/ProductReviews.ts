
export interface ProductReviewListResponse {
    data: ProductReviewResponse[];
    totals: ProductReviewTotals;
}

export interface ProductReviewResponse {
    id:number;
    content: string;
    createdAt: string;
    username: string;
    rate: number;
}

export interface ProductReviewTotals {
    averageRate: number;
    fiveStarsCount: number;
    fourStarsCount: number;
    threeStarsCount: number;
    twoStarsCount: number;
    oneStarCount: number;
    totalCount: number;
}