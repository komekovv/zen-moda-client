// api/apiHelper.ts
import { isEmpty } from '@/lib/utils/helpers';
import { getAxiosInstance } from '@/api/axiosInstance';
import { cookieToken } from './authToken';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface ApiProps {
    url: string;
    serverToken?: RequestCookie | string;
    config?: {};
}

interface CommonType<T> extends ApiProps {
    data: T;
}

const privateConfig = {
    headers: {
        Authorization: '',
        'Content-type': 'application/json',
    },
};

const publicConfig = {
    headers: {
        'Content-type': 'application/json',
    },
};

const getAuthToken = (serverToken?: RequestCookie | string): string => {
    if (serverToken) {
        return serverToken.toString();
    }

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('client_auth_token');
        if (token) {
            return token;
        }
    }

    try {
        return cookieToken();
    } catch (error) {
        console.warn('Failed to get cookie token:', error);
        return '';
    }
};

const api = {
    // Public GET request (no authentication)
    publicGet: async <T>(args: ApiProps): Promise<T> => {
        const { url, config = {} } = args;
        const axiosInstance = getAxiosInstance();

        const headers = {
            ...publicConfig,
            ...config,
            headers: {
                ...publicConfig.headers,
                ...(config as any)?.headers,
            },
        };

        return axiosInstance.get(url, headers).then((response) => response.data);
    },

    // Private GET request (with authentication)
    privateGet: async <T>(args: ApiProps): Promise<T> => {
        const { url, serverToken, config = {} } = args;
        const axiosInstance = getAxiosInstance();
        const token = getAuthToken(serverToken);

        const headers = {
            ...privateConfig,
            ...config,
            headers: {
                ...privateConfig.headers,
                ...(config as any)?.headers,
                Authorization: token ? `Bearer ${token}` : '',
            },
        };

        return axiosInstance.get(url, headers).then((response) => response.data);
    },

    // Existing get method (kept for backward compatibility)
    get: async <T>(args: ApiProps): Promise<T> => {
        return api.privateGet<T>(args);
    },

    // Public POST request (no authentication)
    publicPost: async <T, R>(args: CommonType<T>): Promise<R> => {
        const { url, data, config = {} } = args;
        const axiosInstance = getAxiosInstance();

        return axiosInstance
            .post(
                url,
                { ...data },
                {
                    ...publicConfig,
                    ...config,
                    headers: {
                        ...publicConfig.headers,
                        ...(config as any)?.headers,
                    },
                },
            )
            .then((response) => response.data);
    },

    // Public PUT request (no authentication)
    publicPut: async <T, R>(args: CommonType<T>): Promise<R> => {
        const { url, data, config = {} } = args;
        const axiosInstance = getAxiosInstance();

        return axiosInstance
            .put(
                url,
                { ...data },
                {
                    ...publicConfig,
                    ...config,
                    headers: {
                        ...publicConfig.headers,
                        ...(config as any)?.headers,
                    },
                },
            )
            .then((response) => response.data);
    },

    // Existing private POST request (with authentication)
    post: async <T, R>(args: CommonType<T>): Promise<R> => {
        const { url, data, serverToken, config = {} } = args;
        const axiosInstance = getAxiosInstance();
        const token = getAuthToken(serverToken);

        return axiosInstance
            .post(
                url,
                { ...data },
                {
                    ...privateConfig,
                    ...config,
                    headers: {
                        ...privateConfig.headers,
                        ...(config as any)?.headers,
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                },
            )
            .then((response) => response.data);
    },

    postFormData: async <R>(args: CommonType<FormData>): Promise<R> => {
        const { url, data, serverToken, config = {} } = args;
        const axiosInstance = getAxiosInstance();
        const token = getAuthToken(serverToken);

        return axiosInstance
            .post(url, data, {
                ...config,
                headers: {
                    ...(config as any)?.headers,
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => response.data);
    },

    put: async <T, R>(args: CommonType<T>): Promise<R> => {
        const { url, data, serverToken, config = {} } = args;
        const axiosInstance = getAxiosInstance();
        const token = getAuthToken(serverToken);

        return axiosInstance
            .put(
                url,
                { ...data },
                {
                    ...privateConfig,
                    ...config,
                    headers: {
                        ...privateConfig.headers,
                        ...(config as any)?.headers,
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                },
            )
            .then((response) => response.data);
    },

    putFormData: async <R>(args: CommonType<FormData>): Promise<R> => {
        const { url, data, serverToken, config = {} } = args;
        const axiosInstance = getAxiosInstance();
        const token = getAuthToken(serverToken);

        return axiosInstance
            .put(url, data, {
                ...config,
                headers: {
                    ...(config as any)?.headers,
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => response.data);
    },

    patch: async <T, R>(args: CommonType<T>): Promise<R> => {
        const { url, data, serverToken, config = {} } = args;
        const axiosInstance = getAxiosInstance();
        const token = getAuthToken(serverToken);

        return axiosInstance
            .patch(
                url,
                { ...data },
                {
                    ...privateConfig,
                    ...config,
                    headers: {
                        ...privateConfig.headers,
                        ...(config as any)?.headers,
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                },
            )
            .then((response) => response.data);
    },

    patchFormData: async <R>(args: CommonType<FormData>): Promise<R> => {
        const { url, data, serverToken, config = {} } = args;
        const axiosInstance = getAxiosInstance();
        const token = getAuthToken(serverToken);

        return axiosInstance
            .patch(url, data, {
                ...config,
                headers: {
                    ...(config as any)?.headers,
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => response.data);
    },

    delete: async <T, R>(args: CommonType<T>): Promise<R> => {
        const { url, serverToken, config = {} } = args;
        const axiosInstance = getAxiosInstance();
        const token = getAuthToken(serverToken);

        return axiosInstance
            .delete(url, {
                ...privateConfig,
                ...config,
                headers: {
                    ...privateConfig.headers,
                    ...(config as any)?.headers,
                    Authorization: token ? `Bearer ${token}` : '',
                },
            })
            .then((response) => {
                if (isEmpty(response.data)) return { status: response.status };
                return response.data;
            });
    },
};

export { api };