export interface UserResponse {
    id: string;
    phone_number: string;
    fullname?: string;
    gender?: 'MALE' | 'FEMALE';
}

export interface UserApiResponse {
    user: UserResponse;
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
    userAlreadyExist?: boolean;
    user?: UserResponse;
}

export type GenderType = 'MALE' | 'FEMALE';

export interface UpdateProfileRequest {
    fullname: string;
    gender: GenderType;
    phone_number?: string;
}

export interface UpdateProfileResponse {
    user: UserResponse;
}

export interface RefreshTokenRequest {
    refresh_token: string;
}

export interface RefreshTokenResponse {
    access_token: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: UserResponse | null;
    token: string | null;
    refreshToken: string | null;
    loading: boolean;
}

export interface AuthContextType extends AuthState {
    setAuthData: (user: UserResponse, accessToken: string, refreshToken: string) => void;
    updateUser: (user: UserResponse) => void;
    logout: () => void;
    refreshAccessToken: () => Promise<string | null>;
}