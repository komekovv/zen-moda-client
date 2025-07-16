export interface CartItemVariation {
    id: number;
    name: string;
    price: number;
    stock: number;
}

export interface CartItem {
    id: number;
    name: string;
    basePrice: number;
    discountPrice: number;
    quantity: number;
    basketItemId: number;
    variation: CartItemVariation;
    currentPrice: number;
    subtotal: number;
    isAvailable: boolean;
    photos: string;
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