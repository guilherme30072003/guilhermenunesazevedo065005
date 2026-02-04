import { useEffect, useState } from "react";
import { Observable } from "rxjs";
import { stateStore } from "../store/StateStore";

/**
 * useObservable - Hook para consumir Observables no React
 * Simplifica a conversão de RxJS Observables para React state
 */
export function useObservable<T>(observable: Observable<T>, initialValue: T): T {
    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        const subscription = observable.subscribe((value: T) => {
            setState(value);
        });

        return () => subscription.unsubscribe();
    }, [observable]);

    return state;
}

/**
 * useAppState - Hook para consumir o estado global da aplicação
 */
export function useAppState() {
    return {
        auth: useObservable(stateStore.auth$, {
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            loading: true,
            error: null,
        }),
        pets: useObservable(stateStore.pets$, {
            pets: [],
            currentPet: null,
            loading: false,
            error: null,
            pageCount: 0,
            currentPage: 0,
        }),
        tutors: useObservable(stateStore.tutors$, {
            tutors: [],
            currentTutor: null,
            loading: false,
            error: null,
        }),
        app: useObservable(stateStore.app$, {
            auth: {
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
                loading: true,
                error: null,
            },
            pets: {
                pets: [],
                currentPet: null,
                loading: false,
                error: null,
                pageCount: 0,
                currentPage: 0,
            },
            tutors: {
                tutors: [],
                currentTutor: null,
                loading: false,
                error: null,
            },
        }),
    };
}
