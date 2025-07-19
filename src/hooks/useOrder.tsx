import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import {
    OrdersListResponse,
    CreateOrderFromBasketRequest,
    CreateOrderDirectRequest,
    CreateOrderResponse,
    OrdersQueryParams
} from "@/api/queryTypes/Order";
import { orderService } from "@/api/services/orderService";

export const useMyOrders = (
    params?: OrdersQueryParams,
    options?: Omit<UseQueryOptions<OrdersListResponse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<OrdersListResponse>({
        queryKey: ['my_orders', params],
        queryFn: () => orderService.getMyOrders(params),
        ...options,
    });
};

export const useCreateOrderFromBasketMutation = (
    options?: UseMutationOptions<CreateOrderResponse, Error, CreateOrderFromBasketRequest>
) => {
    const queryClient = useQueryClient();

    return useMutation<CreateOrderResponse, Error, CreateOrderFromBasketRequest>({
        mutationFn: (data: CreateOrderFromBasketRequest) => orderService.createOrderFromBasket(data),
        onSuccess: () => {
            // Invalidate orders list to refetch after creating new order
            queryClient.invalidateQueries({ queryKey: ['my_orders'] });
            // Optionally invalidate cart data if you have cart queries
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        ...options,
    });
};

export const useCreateOrderDirectMutation = (
    options?: UseMutationOptions<CreateOrderResponse, Error, CreateOrderDirectRequest>
) => {
    const queryClient = useQueryClient();

    return useMutation<CreateOrderResponse, Error, CreateOrderDirectRequest>({
        mutationFn: (data: CreateOrderDirectRequest) => orderService.createOrderDirect(data),
        onSuccess: () => {
            // Invalidate orders list to refetch after creating new order
            queryClient.invalidateQueries({ queryKey: ['my_orders'] });
        },
        ...options,
    });
};