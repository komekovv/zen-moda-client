export const AUTH_QUERY_KEYS = {
    USER_PROFILE: ['auth', 'user', 'profile'],
    USER_ORDERS: ['auth', 'user', 'orders'],
    USER_FAVORITES: ['auth', 'user', 'favorites'],
    USER_ADDRESSES: ['auth', 'user', 'addresses'],
    USER_PAYMENT_METHODS: ['auth', 'user', 'payment-methods'],
} as const;

export const HOME_QUERY_KEYS = {
    HOME: ['home'] as const,
    HOME_DATA: ['home', 'data'] as const,
} as const;


export const CATALOG_QUERY_KEYS = {
    // Base keys
    CATALOGS: ['catalogs'] as const,

    // List queries
    CATALOGS_LIST: () => ['catalogs', 'list'] as const,
} as const;

export const createCatalogListKey = () =>
    CATALOG_QUERY_KEYS.CATALOGS_LIST();