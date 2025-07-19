import {
    useMutation,
    UseMutationOptions,
    useQuery,
    UseQueryOptions
} from '@tanstack/react-query';
import {productService} from "@/api/services/productService";
import {ProductReviewListResponse} from "@/api/queryTypes/ProductReviews";
import {ProductQuestionRequest, ProductQuestionResponse} from "@/api/queryTypes/ProductQuestion";
import {ProductDetailResponse} from "@/api/queryTypes/Product";
import {ListResponse} from "@/api/queryTypes/Common";

// QUERIES
export const useProductDetail = (
    productId: string,
    options?: Omit<UseQueryOptions<ProductDetailResponse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ProductDetailResponse>({
        queryKey: ['product_detail', productId],
        queryFn: () => productService.getProductDetail(productId),
        enabled: !!productId,
        ...options,
    });
};

export const useProductReviews = (
    productId: string,
    options?: Omit<UseQueryOptions<ProductReviewListResponse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ProductReviewListResponse>({
        queryKey: ['product_reviews', productId],
        queryFn: () => productService.getProductReviews(productId),
        enabled: !!productId,
        ...options,
    });
};

export const useProductQuestions = (
    productId: string,
    page: number = 1,
    size: number = 5,
    options?: Omit<UseQueryOptions<ListResponse<ProductQuestionResponse>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ListResponse<ProductQuestionResponse>>({
        queryKey: ['product_questions', productId, page, size],
        queryFn: () => productService.getProductQuestions(productId, page, size),
        enabled: !!productId,
        ...options,
    });
};

// MUTATIONS
export const usePostQuestionMutation = (
    productId: string,
    options?: UseMutationOptions<ProductQuestionResponse, Error, ProductQuestionRequest>
) => {
    return useMutation<ProductQuestionResponse, Error, ProductQuestionRequest>({
        mutationFn: (data: ProductQuestionRequest) => productService.postProductQuestions(productId, data),
        ...options,
    });
};