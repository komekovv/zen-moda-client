import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from '@tanstack/react-query';
import {apiCartService} from '@/api/services/cartService';
import {
    AddToCartRequest,
    AddToCartResponse,
    CartResponse,
    ClearCartResponse,
    UpdateCartItemRequest,
    UpdateCartItemResponse,
} from '@/api/queryTypes/Cart';

export const useCart = (
    options?: Omit<UseQueryOptions<CartResponse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<CartResponse>({
        queryKey: ['cart'],
        queryFn: apiCartService.getCart,
        staleTime: 2 * 60 * 1000, // 2 minutes
        retry: 2,
        ...options,
    });
};
export const useAddToCart = (
    options?: UseMutationOptions<AddToCartResponse, Error, AddToCartRequest>
) => {
    return useMutation<AddToCartResponse, Error, AddToCartRequest>({
        mutationFn: apiCartService.addToCart,
        ...options,
    });
};

export const useUpdateCartItem = (
    options?: UseMutationOptions<UpdateCartItemResponse, Error, { itemId: number; data: UpdateCartItemRequest }>
) => {
    return useMutation<UpdateCartItemResponse, Error, { itemId: number; data: UpdateCartItemRequest }>({
        mutationFn: ({ itemId, data }) => apiCartService.updateCartItem(itemId, data),
        ...options,
    });
};

export const useRemoveFromCart = (
    options?: UseMutationOptions<void, Error, number>
) => {
    return useMutation<void, Error, number>({
        mutationFn: apiCartService.removeFromCart,
        ...options,
    });
};

export const useClearCart = (
    options?: UseMutationOptions<ClearCartResponse, Error, void>
) => {
    return useMutation<ClearCartResponse, Error, void>({
        mutationFn: apiCartService.clearCart,
        ...options,
    });
};
