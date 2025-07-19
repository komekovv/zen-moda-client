import { api } from "@/api/apiHelper";
import {
    OrdersListResponse,
    CreateOrderFromBasketRequest,
    CreateOrderDirectRequest,
    CreateOrderResponse,
    OrdersQueryParams
} from "@/api/queryTypes/Order";

export const orderService = {
    getMyOrders: async (params?: OrdersQueryParams): Promise<OrdersListResponse> => {
        const searchParams = new URLSearchParams();

        if (params?.page !== undefined) {
            searchParams.append('page', params.page.toString());
        }
        if (params?.limit !== undefined) {
            searchParams.append('limit', params.limit.toString());
        }

        const queryString = searchParams.toString();
        const url = queryString ? `/orders/my-orders?${queryString}` : '/orders/my-orders';

        return api.privateGet<OrdersListResponse>({ url });
    },

    createOrderFromBasket: async (data: CreateOrderFromBasketRequest): Promise<CreateOrderResponse> => {
        return api.post<CreateOrderFromBasketRequest, CreateOrderResponse>({
            url: '/orders/from-basket',
            data: data
        });
    },

    createOrderDirect: async (data: CreateOrderDirectRequest): Promise<CreateOrderResponse> => {
        return api.post<CreateOrderDirectRequest, CreateOrderResponse>({
            url: '/orders/direct',
            data: data
        });
    }
};