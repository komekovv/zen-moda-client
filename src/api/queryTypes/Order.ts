import { LocalizedText } from "@/types/types";

export interface OrderLocation {
    id: string;
    label: string;
    phone: string;
    fullAddress: string;
}

export interface OrderStore {
    id: string;
    name: string;
    photo: string;
    isVerified: boolean;
}

export interface OrderProduct {
    id: string;
    variationId: string;
    name: LocalizedText;
    photo: string;
    size: string;
    color: LocalizedText;
    price: string;
    originalPrice: string;
    quantity: number;
}

export interface OrderStatusHistory {
    status: string;
    date: string;
}

export interface OrderResponse {
    id: string;
    orderNumber: string;
    orderDate: string;
    deliveryDate: string | null;
    status: string;
    total: string;
    deliveryFee: string;
    discount: string;
    subtotal: string;
    currency: string;
    location: OrderLocation;
    paymentMethod: string;
    store: OrderStore;
    products: OrderProduct[];
    statusHistory: OrderStatusHistory[];
    canReturn: boolean;
    canReview: boolean;
    returnDeadline: string;
    estimatedDelivery: string;
    actualDelivery: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface OrdersListResponse {
    success: boolean;
    message: string;
    data: OrderResponse[];
    totalCount: number;
}

export interface CreateOrderFromBasketRequest {
    addressId: number;
    basketItemIds: number[];
}

export interface CreateOrderDirectRequest {
    addressId: number;
    productId: number;
    quantity: number;
    variationId: number;
}

export interface CreatedOrder {
    id: string;
    marketId: string;
    totalAmount: string;
    address: string;
    isAccept: boolean;
    createdAt: string;
}

export interface CreateOrderResponse {
    success: boolean;
    message: string;
    data: {
        orders: CreatedOrder[];
        totalOrders: number;
        totalItems: number;
        totalAmount: number;
    };
}

export interface OrdersQueryParams {
    page?: number;
    limit?: number;
}

// Order status types
export type OrderStatus = 'waiting' | 'accepted' | 'preparing' | 'on_way' | 'delivered' | 'returned' | 'cancelled';

// Additional types for the UI components
export interface OrderItemUI {
    id: string;
    name: string;
    image: string;
    size: string;
    price: number;
    quantity: number;
}

export interface OrderUI {
    id: string;
    orderNumber: string;
    date: string;
    status: OrderStatus;
    items: OrderItemUI[];
    total: number;
    deliveryAddress: string;
    deliveryFee: number;
    discount: number;
    seller: string;
}