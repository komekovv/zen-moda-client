import {api} from "@/api/apiHelper";
import {ProductQuestionRequest, ProductQuestionResponse} from "@/api/queryTypes/ProductQuestion";
import {ProductReviewListResponse, ProductReviewResponse} from "@/api/queryTypes/ProductReviews";
import {ProductDetailResponse} from "@/api/queryTypes/Product";
import {ListResponse} from "@/api/queryTypes/Common";

export const productService = {

    getProductDetail: async (productId: string): Promise<ProductDetailResponse> => {
        return api.publicGet<ProductDetailResponse>({url: `/product/${productId}`});
    },

    getProductQuestions: async (productId: string): Promise<ListResponse<ProductQuestionResponse>> => {
        return api.publicGet<ListResponse<ProductQuestionResponse>>({url: `/product-question/${productId}`});
    },

    postProductQuestions: async (productId: string, data: ProductQuestionRequest): Promise<ProductQuestionResponse> => {
        return api.post<ProductQuestionRequest, ProductQuestionResponse>({
            url: `/product-question/${productId}`,
            data
        });
    },

    getProductReviews: async (productId: string): Promise<ProductReviewListResponse> => {
        return api.publicGet<ProductReviewListResponse>({url: `/product/${productId}/reviews`});
    },

};
