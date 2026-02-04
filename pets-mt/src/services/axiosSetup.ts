import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";

const API_BASE_URL = "https://pet-manager-api.geia.vip";

let refreshTokenPromise: Promise<any> | null = null;

export const setupAxiosInterceptors = (
    getAccessToken: () => string | null,
    getRefreshToken: () => string | null,
    onRefresh: (response: any) => void,
    onTokenExpired: () => void
) => {
    // Criar instância global do Axios
    const apiClient = axios.create({
        baseURL: API_BASE_URL,
    });

    // Interceptor de requisição - Adiciona access token
    apiClient.interceptors.request.use(
        (config) => {
            const token = getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Interceptor de resposta - Trata refresh token
    apiClient.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as any;

            // Se erro é 401 e não é uma requisição de refresh, tentar fazer refresh
            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !originalRequest.url?.includes("/autenticacao/refresh")
            ) {
                originalRequest._retry = true;

                try {
                    // Se já existe uma promise de refresh, esperar por ela
                    if (!refreshTokenPromise) {
                        const refreshToken = getRefreshToken();
                        if (!refreshToken) {
                            onTokenExpired();
                            return Promise.reject(error);
                        }

                        refreshTokenPromise = axios.put(
                            `${API_BASE_URL}/autenticacao/refresh`,
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${refreshToken}`,
                                },
                            }
                        );
                    }

                    const response = await refreshTokenPromise;
                    refreshTokenPromise = null;

                    const { access_token, refresh_token } = response.data;
                    onRefresh({ access_token, refresh_token });

                    // Retry da requisição original com novo token
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    refreshTokenPromise = null;
                    onTokenExpired();
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return apiClient;
};
