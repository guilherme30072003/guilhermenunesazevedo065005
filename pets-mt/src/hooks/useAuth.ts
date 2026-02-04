import { useState, useEffect, useCallback } from "react";
import { authService } from "../services/api";

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

const STORAGE_ACCESS_TOKEN = "pets_mt_access_token";
const STORAGE_REFRESH_TOKEN = "pets_mt_refresh_token";

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        loading: true,
        error: null,
    });

    // Carregar tokens do localStorage ao montar
    useEffect(() => {
        const storedAccessToken = localStorage.getItem(STORAGE_ACCESS_TOKEN);
        const storedRefreshToken = localStorage.getItem(STORAGE_REFRESH_TOKEN);

        if (storedAccessToken && storedRefreshToken) {
            setAuthState({
                isAuthenticated: true,
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
                loading: false,
                error: null,
            });
        } else {
            setAuthState((prev) => ({ ...prev, loading: false }));
        }
    }, []);

    const login = useCallback(async (username: string, password: string) => {
        setAuthState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const response = await authService.login(username, password);
            const { access_token, refresh_token } = response;

            // Armazenar tokens
            localStorage.setItem(STORAGE_ACCESS_TOKEN, access_token);
            localStorage.setItem(STORAGE_REFRESH_TOKEN, refresh_token);

            setAuthState({
                isAuthenticated: true,
                accessToken: access_token,
                refreshToken: refresh_token,
                loading: false,
                error: null,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login";
            setAuthState({
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
                loading: false,
                error: errorMessage,
            });
            throw error;
        }
    }, []);

    const refresh = useCallback(async () => {
        if (!authState.refreshToken) {
            throw new Error("Nenhum refresh token disponível");
        }

        try {
            const response = await authService.refresh(authState.refreshToken);
            const { access_token, refresh_token } = response;

            // Atualizar tokens
            localStorage.setItem(STORAGE_ACCESS_TOKEN, access_token);
            localStorage.setItem(STORAGE_REFRESH_TOKEN, refresh_token);

            setAuthState({
                isAuthenticated: true,
                accessToken: access_token,
                refreshToken: refresh_token,
                loading: false,
                error: null,
            });

            return response;
        } catch (error) {
            // Refresh falhou, fazer logout
            logout();
            throw error;
        }
    }, [authState.refreshToken]);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_REFRESH_TOKEN);

        setAuthState({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            loading: false,
            error: null,
        });
    }, []);

    return {
        ...authState,
        login,
        refresh,
        logout,
    };
};
