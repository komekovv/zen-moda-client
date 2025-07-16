import { api } from '@/api/apiHelper';
import {
    CartResponse,
    AddToCartRequest,
    AddToCartResponse,
    UpdateCartItemRequest,
    UpdateCartItemResponse,
    ClearCartResponse,
} from '@/api/queryTypes/Cart';

export const apiCartService = {
    getCart: async (): Promise<CartResponse> => {
        return api.privateGet<CartResponse>({
            url: '/basket'
        });
    },

    addToCart: async (data: AddToCartRequest): Promise<AddToCartResponse> => {
        return api.post<AddToCartRequest, AddToCartResponse>({
            url: '/basket/add',
            data
        });
    },

    updateCartItem: async (itemId: number, data: UpdateCartItemRequest): Promise<UpdateCartItemResponse> => {
        return api.put<UpdateCartItemRequest, UpdateCartItemResponse>({
            url: `/basket/update/${itemId}`,
            data
        });
    },

    removeFromCart: async (productId: number): Promise<void> => {
        return api.delete({
            url: `/basket/remove/${productId}`,
            data: {}
        });
    },

    clearCart: async (): Promise<ClearCartResponse> => {
        return api.delete<{}, ClearCartResponse>({
            url: '/basket/clear',
            data: {}
        });
    }
};