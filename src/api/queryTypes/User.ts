export interface User {
    id: number;
    phone_number: string;
    fullname?: string;
    gender?: 'MALE' | 'FEMALE';
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

export interface LoginRequest {
    phone: string;
}

export interface LoginResponse {
    success: boolean;
    message?: string;
}

export interface VerifyOTPRequest {
    phone_number: string;
    code: string;
}

export interface VerifyOTPResponse {
    access_token: string;
    refresh_token: string;
    user?: User;
}

export type GenderType = 'male' | 'female';

export interface UpdateProfileRequest {
    fullname: string;
    gender: GenderType;
    // phone_number: string;
}

export interface UpdateProfileResponse {
    user: User;
}

export interface RefreshTokenRequest {
    refresh_token: string;
}

export interface RefreshTokenResponse {
    access_token: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    loading: boolean;
}

export interface AuthContextType extends AuthState {
    setAuthData: (user: User, accessToken: string, refreshToken: string) => void;
    logout: () => void;
    refreshAccessToken: () => Promise<string | null>;
}