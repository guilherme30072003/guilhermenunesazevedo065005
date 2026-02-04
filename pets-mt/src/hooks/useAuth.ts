import { useEffect } from "react";
import { appFacade } from "../facade/ApplicationFacade";
import { stateStore, checkingAuthState } from "../store/StateStore";
import { useObservable } from "./useObservable";

/**
 * useAuth - Hook para gerenciar autenticação
 * Usa o Facade (ApplicationFacade) como interface simplificada
 * e o StateStore (com RxJS BehaviorSubject) para gerenciar estado
 */
export const useAuth = () => {
    const authState = useObservable(stateStore.auth$, checkingAuthState);

    // Carregar tokens do localStorage ao montar
    useEffect(() => {
        appFacade.loadAuthFromStorage();
    }, []);

    return {
        ...authState,
        login: appFacade.login.bind(appFacade),
        logout: appFacade.logout.bind(appFacade),
        refresh: appFacade.refreshToken.bind(appFacade),
    };
};
