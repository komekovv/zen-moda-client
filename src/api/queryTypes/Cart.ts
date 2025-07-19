import {LocalizedText} from "@/types/types";

export interface CartItem {
    id: string;
    variationId: string;
    basketItemId: string;
    name: LocalizedText;
    photo: string;
    size: string;
    basePrice: string;
    currentPrice: string;
    discountPrice: string;
    subtotal: number;
    quantity: number;
    isAvailable: boolean;
    isInWishlist: boolean;
}

export interface CartResponse {
    success: boolean;
    message: string;
    data: CartItem[];
}

export interface AddToCartRequest {
    product_id: string;
    variation_id: string;
    quantity: number;
}

export interface AddToCartResponse {
    success: boolean;
    message: string;
}

export interface UpdateCartItemRequest {
    quantity: number;
}

export interface UpdateCartItemResponse {
    success: boolean;
    message: string;
}

export interface ClearCartResponse {
    success: boolean;
    message: string;
}