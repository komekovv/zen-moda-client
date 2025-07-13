// hooks/useAuth.ts
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { authService, apiService } from '@/api/services/authService';
import {
    LoginRequest,
    LoginResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    User
} from '@/api/queryTypes/User';
import { AUTH_QUERY_KEYS } from '@/api/queryKeys';

// Auth Mutations
export const useLoginMutation = (
    options?: UseMutationOptions<LoginResponse, Error, LoginRequest>
) => {
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: authService.login,
        ...options,
    });
};

export const useVerifyOTPMutation = (
    options?: UseMutationOptions<VerifyOTPResponse, Error, VerifyOTPRequest>
) => {
    return useMutation<VerifyOTPResponse, Error, VerifyOTPRequest>({
        mutationFn: authService.verifyOTP,
        ...options,
    });
};

export const useUpdateProfileMutation = (
    options?: UseMutationOptions<UpdateProfileResponse, Error, UpdateProfileRequest>
) => {
    return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
        mutationFn: authService.updateProfile,
        ...options,
    });
};

export const useRefreshTokenMutation = (
    options?: UseMutationOptions<RefreshTokenResponse, Error, RefreshTokenRequest>
) => {
    return useMutation<RefreshTokenResponse, Error, RefreshTokenRequest>({
        mutationFn: authService.refreshToken,
        ...options,
    });
};

export const useResendLoginSMSMutation = (
    options?: UseMutationOptions<LoginResponse, Error, string>
) => {
    return useMutation<LoginResponse, Error, string>({
        mutationFn: authService.resendLoginSMS,
        ...options,
    });
};

// Auth Queries
export const useUserProfile = (
    userId: string,
    options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<User>({
        queryKey: AUTH_QUERY_KEYS.USER_PROFILE,
        queryFn: () => apiService.privateGet<User>(`/user/${userId}`),
        ...options,
    });
};

export const useUserOrders = (
    options?: Omit<UseQueryOptions<any[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<any[]>({
        queryKey: AUTH_QUERY_KEYS.USER_ORDERS,
        queryFn: () => apiService.privateGet<any[]>('/user/orders'),
        ...options,
    });
};

export const useUserFavorites = (
    options?: Omit<UseQueryOptions<any[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<any[]>({
        queryKey: AUTH_QUERY_KEYS.USER_FAVORITES,
        queryFn: () => apiService.privateGet<any[]>('/user/favorites'),
        ...options,
    });
};

// Generic hooks for reusability
export const usePublicQuery = <T>(
    url: string,
    queryKey: readonly string[],
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<T>({
        queryKey,
        queryFn: () => apiService.publicGet<T>(url),
        ...options,
    });
};

export const usePrivateQuery = <T>(
    url: string,
    queryKey: readonly string[],
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<T>({
        queryKey,
        queryFn: () => apiService.privateGet<T>(url),
        ...options,
    });
};

export const usePublicMutation = <TRequest, TResponse>(
    url: string,
    options?: UseMutationOptions<TResponse, Error, TRequest>
) => {
    return useMutation<TResponse, Error, TRequest>({
        mutationFn: (data: TRequest) => apiService.publicPost<TRequest, TResponse>(url, data),
        ...options,
    });
};

export const usePrivateMutation = <TRequest, TResponse>(
    url: string,
    options?: UseMutationOptions<TResponse, Error, TRequest>
) => {
    return useMutation<TResponse, Error, TRequest>({
        mutationFn: (data: TRequest) => apiService.privatePost<TRequest, TResponse>(url, data),
        ...options,
    });
};