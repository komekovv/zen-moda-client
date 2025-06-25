// useLogin.ts
import { useModal } from "@/contexts/modal-context";
import { useClientAuth } from "@/contexts/auth-provider";

interface UseLoginOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
    closeOnClickOutside?: boolean;
}

export const useLogin = (options?: UseLoginOptions) => {
    const { openModal } = useModal();
    const { setAuthData } = useClientAuth();

    const openLoginModal = () => {
        openModal('login', {
            onSuccess: (data: any) => {
                if (data.user && data.tokens) {
                    setAuthData(data.user, data.tokens.accessToken, data.tokens.refreshToken);
                }
                options?.onSuccess?.(data);
            },
            onError: options?.onError,
            closeOnClickOutside: options?.closeOnClickOutside ?? false
        });
    };

    return { openLoginModal };
};