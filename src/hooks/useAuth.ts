// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { authService } from '@/api/services/authService';
import {
    LoginRequest,
    LoginResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    UserResponse, UserApiResponse
} from '@/api/queryTypes/User';
import { AUTH_QUERY_KEYS } from '@/api/queryKeys';
import {api} from "@/api/apiHelper";

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

export const useCompleteProfileMutation = (
    options?: UseMutationOptions<UpdateProfileResponse, Error, UpdateProfileRequest>
) => {
    return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
        mutationFn: authService.completeProfile,
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
    options?: Omit<UseQueryOptions<UserApiResponse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<UserApiResponse>({
        queryKey: ['profile', userId],
        queryFn: () => authService.getUserProfile(userId),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
        ...options,
    });
};

// Enhanced update profile mutation with cache management
export const useUpdateProfileWithCache = (
    options?: UseMutationOptions<UpdateProfileResponse, Error, UpdateProfileRequest>
) => {
    const queryClient = useQueryClient();
    
    return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
        mutationFn: authService.updateProfile,
        onSuccess: (data, variables) => {
            // Update the profile query cache
            queryClient.setQueryData(['profile', data.user.id], {
                user: data.user
            });
            
            // Invalidate profile queries to refetch
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        ...options,
    });
};

