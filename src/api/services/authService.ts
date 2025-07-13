import { api } from '@/api/apiHelper';
import {
    LoginRequest,
    LoginResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    RefreshTokenRequest,
    RefreshTokenResponse
} from '@/api/queryTypes/User';

/**
 * Pure service functions for authentication
 * These can be used in any context (React components, Node.js, testing, etc.)
 */
export const authService = {
    /**
     * Send login SMS
     */
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        return api.publicPost<LoginRequest, LoginResponse>({
            url: '/auth/login',
            data
        });
    },

    /**
     * Verify OTP code
     */
    verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
        return api.publicPost<VerifyOTPRequest, VerifyOTPResponse>({
            url: '/auth/confirm-otp',
            data
        });
    },

    /**
     * Update user profile
     */
    completeProfile: async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
        return api.post<UpdateProfileRequest, UpdateProfileResponse>({
            url: '/auth/complete-registration',
            data
        });
    },

    /**
     * Update user profile
     */
    updateProfile: async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
        return api.put<UpdateProfileRequest, UpdateProfileResponse>({
            url: '/user/profile',
            data
        });
    },

    /**
     * Refresh access token
     */
    refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
        return api.publicPost<RefreshTokenRequest, RefreshTokenResponse>({
            url: '/auth/refresh',
            data
        });
    },

    /**
     * Resend login SMS
     */
    resendLoginSMS: async (phone: string): Promise<LoginResponse> => {
        return api.publicPost<LoginRequest, LoginResponse>({
            url: '/auth/login',
            data: { phone }
        });
    }
};

/**
 * Generic service functions for reusability
 */
export const apiService = {
    /**
     * Generic public GET request
     */
    publicGet: async <T>(url: string): Promise<T> => {
        return api.publicGet<T>({ url });
    },

    /**
     * Generic private GET request
     */
    privateGet: async <T>(url: string): Promise<T> => {
        return api.privateGet<T>({ url });
    },

    /**
     * Generic public POST request
     */
    publicPost: async <TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> => {
        return api.publicPost<TRequest, TResponse>({ url, data });
    },

    /**
     * Generic private POST request
     */
    privatePost: async <TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> => {
        return api.post<TRequest, TResponse>({ url, data });
    }
};