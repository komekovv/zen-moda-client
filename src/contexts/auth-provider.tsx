"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { useRefreshTokenMutation } from '@/hooks/useAuth';
import { User, AuthState, AuthContextType } from '@/api/queryTypes/User';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
    loading: true,
};

const ClientAuthContext = createContext<AuthContextType | undefined>(undefined);

const setCookie = (name: string, value: string, days: number = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
};

const clearAuthData = () => {
    localStorage.removeItem('client_auth_token');
    localStorage.removeItem('client_refresh_token');
    localStorage.removeItem('client_auth_user');
    deleteCookie('client_auth_token');
    delete axios.defaults.headers.common['Authorization'];
};

const loadAuthState = (): AuthState => {
    if (typeof window === 'undefined') return initialState;

    try {
        const token = localStorage.getItem('client_auth_token');
        const refreshToken = localStorage.getItem('client_refresh_token');
        const userStr = localStorage.getItem('client_auth_user');

        if (!token || !userStr) return { ...initialState, loading: false };

        const user = JSON.parse(userStr);

        return {
            isAuthenticated: true,
            token,
            refreshToken,
            user,
            loading: false,
        };
    } catch (error) {
        console.error('Failed to load auth state:', error);
        clearAuthData();
        return { ...initialState, loading: false };
    }
};

export function ClientAuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>(initialState);
    const router = useRouter();
    const pathname = usePathname();

    const privateRoutes = [
        '/profile',
        '/orders',
        '/wishlist',
        '/addresses',
        '/payment-methods',
        '/settings',
        '/my-reviews',
        '/account'
    ];

    const publicOnlyRoutes = ['/login', '/register', '/verify'];

    // React Query mutation for token refresh
    const refreshTokenMutation = useRefreshTokenMutation({
        onSuccess: (data) => {
            const { access_token } = data;

            if (access_token) {
                localStorage.setItem('client_auth_token', access_token);
                setCookie('client_auth_token', access_token, 30);
                axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

                setAuthState(prev => ({
                    ...prev,
                    token: access_token
                }));

                return access_token;
            }
        },
        onError: (error) => {
            console.error('Token refresh failed:', error);
            logout();
        }
    });

    // Axios interceptor for automatic token refresh
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401 && authState.isAuthenticated) {
                    // Try to refresh token
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        // Retry the original request
                        error.config.headers['Authorization'] = `Bearer ${newToken}`;
                        return axios.request(error.config);
                    } else {
                        logout();
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [authState.isAuthenticated]);

    // Load auth state on mount
    useEffect(() => {
        const savedState = loadAuthState();
        setAuthState(savedState);

        if (savedState.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${savedState.token}`;
        }
    }, []);

    // Route protection
    useEffect(() => {
        if (!authState.loading && pathname) {
            const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
            const isPublicOnlyRoute = publicOnlyRoutes.some(route => pathname.startsWith(route));

            if (!authState.isAuthenticated && isPrivateRoute) {
                const returnUrl = encodeURIComponent(pathname);
                router.push(`/login?returnUrl=${returnUrl}`);
            } else if (authState.isAuthenticated && isPublicOnlyRoute) {
                const urlParams = new URLSearchParams(window.location.search);
                const returnUrl = urlParams.get('returnUrl');
                router.push(returnUrl ? decodeURIComponent(returnUrl) : '/');
            }
        }
    }, [authState.isAuthenticated, authState.loading, pathname, router]);

    const setAuthData = (user: User, accessToken: string, refreshToken: string) => {
        localStorage.setItem('client_auth_token', accessToken);
        localStorage.setItem('client_refresh_token', refreshToken);
        localStorage.setItem('client_auth_user', JSON.stringify(user));
        setCookie('client_auth_token', accessToken, 30);

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        setAuthState({
            isAuthenticated: true,
            token: accessToken,
            refreshToken,
            user,
            loading: false,
        });
    };

    const refreshAccessToken = async (): Promise<string | null> => {
        try {
            if (!authState.refreshToken) return null;

            // Use the mutation to refresh token
            const result = await refreshTokenMutation.mutateAsync({
                refresh_token: authState.refreshToken
            });

            return result.access_token;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return null;
        }
    };

    const logout = () => {
        clearAuthData();

        setAuthState({
            isAuthenticated: false,
            token: null,
            refreshToken: null,
            user: null,
            loading: false,
        });

        router.push('/');
    };

    return (
        <ClientAuthContext.Provider
            value={{
                ...authState,
                setAuthData,
                logout,
                refreshAccessToken,
            }}
        >
            {children}
        </ClientAuthContext.Provider>
    );
}

export function useClientAuth() {
    const context = useContext(ClientAuthContext);

    if (context === undefined) {
        throw new Error('useClientAuth must be used within a ClientAuthProvider');
    }

    return context;
}