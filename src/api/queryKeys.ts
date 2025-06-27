export const AUTH_QUERY_KEYS = {
    USER_PROFILE: ['auth', 'user', 'profile'],
    USER_ORDERS: ['auth', 'user', 'orders'],
    USER_FAVORITES: ['auth', 'user', 'favorites'],
    USER_ADDRESSES: ['auth', 'user', 'addresses'],
    USER_PAYMENT_METHODS: ['auth', 'user', 'payment-methods'],
} as const;

export const PRODUCT_QUERY_KEYS = {
    ALL: ['products'],
    LIST: (filters?: any) => [...PRODUCT_QUERY_KEYS.ALL, 'list', filters],
    DETAIL: (id: string | number) => [...PRODUCT_QUERY_KEYS.ALL, 'detail', id],
    CATEGORIES: ['products', 'categories'],
    BRANDS: ['products', 'brands'],
} as const;

export const CART_QUERY_KEYS = {
    ALL: ['cart'],
    ITEMS: ['cart', 'items'],
    COUNT: ['cart', 'count'],
} as const;

export const ORDER_QUERY_KEYS = {
    ALL: ['orders'],
    LIST: (filters?: any) => [...ORDER_QUERY_KEYS.ALL, 'list', filters],
    DETAIL: (id: string | number) => [...ORDER_QUERY_KEYS.ALL, 'detail', id],
    HISTORY: ['orders', 'history'],
} as const;