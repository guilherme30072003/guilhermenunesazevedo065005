import { BehaviorSubject, Observable } from "rxjs";
import type { Pet, Tutor } from "../types";

// Estados dos domínios
export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

export interface PetState {
    pets: Pet[];
    currentPet: Pet | null;
    loading: boolean;
    error: string | null;
    pageCount: number;
    currentPage: number;
}

export interface TutorState {
    tutors: Tutor[];
    currentTutor: Tutor | null;
    loading: boolean;
    error: string | null;
}

// Estado global da aplicação
export interface AppState {
    auth: AuthState;
    pets: PetState;
    tutors: TutorState;
}

// Valores iniciais
export const initialAuthState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
};

export const checkingAuthState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
};

const initialPetState: PetState = {
    pets: [],
    currentPet: null,
    loading: false,
    error: null,
    pageCount: 0,
    currentPage: 0,
};

const initialTutorState: TutorState = {
    tutors: [],
    currentTutor: null,
    loading: false,
    error: null,
};

/**
 * StateStore - Gerenciador centralizado de estado com BehaviorSubject
 * Implementa o padrão Facade para abstrair a complexidade do RxJS
 */
export class StateStore {
    // BehaviorSubjects privados para cada domínio
    private readonly authSubject = new BehaviorSubject<AuthState>(checkingAuthState);
    private readonly petSubject = new BehaviorSubject<PetState>(initialPetState);
    private readonly tutorSubject = new BehaviorSubject<TutorState>(initialTutorState);
    private readonly appSubject = new BehaviorSubject<AppState>({
        auth: checkingAuthState,
        pets: initialPetState,
        tutors: initialTutorState,
    });

    // Observables públicos (read-only)
    readonly auth$: Observable<AuthState> = this.authSubject.asObservable();
    readonly pets$: Observable<PetState> = this.petSubject.asObservable();
    readonly tutors$: Observable<TutorState> = this.tutorSubject.asObservable();
    readonly app$: Observable<AppState> = this.appSubject.asObservable();

    // ==================== Auth State ====================
    setAuthLoading(loading: boolean): void {
        const current = this.authSubject.value;
        this.authSubject.next({ ...current, loading });
    }

    setAuthSuccess(accessToken: string, refreshToken: string): void {
        this.authSubject.next({
            isAuthenticated: true,
            accessToken,
            refreshToken,
            loading: false,
            error: null,
        });
        this.updateAppState();
    }

    setAuthError(error: string): void {
        const current = this.authSubject.value;
        this.authSubject.next({ ...current, loading: false, error });
    }

    clearAuth(): void {
        this.authSubject.next(initialAuthState);
        this.updateAppState();
    }

    loadAuthFromStorage(accessToken: string, refreshToken: string): void {
        this.authSubject.next({
            isAuthenticated: true,
            accessToken,
            refreshToken,
            loading: false,
            error: null,
        });
        this.updateAppState();
    }

    // ==================== Pet State ====================
    setPetsLoading(loading: boolean): void {
        const current = this.petSubject.value;
        this.petSubject.next({ ...current, loading });
    }

    setPetsSuccess(pets: Pet[], pageCount: number, currentPage: number): void {
        this.petSubject.next({
            pets,
            currentPet: this.petSubject.value.currentPet,
            loading: false,
            error: null,
            pageCount,
            currentPage,
        });
        this.updateAppState();
    }

    setPetsError(error: string): void {
        const current = this.petSubject.value;
        this.petSubject.next({ ...current, loading: false, error });
    }

    setCurrentPet(pet: Pet | null): void {
        const current = this.petSubject.value;
        this.petSubject.next({ ...current, currentPet: pet });
        this.updateAppState();
    }

    addPet(pet: Pet): void {
        const current = this.petSubject.value;
        this.petSubject.next({
            ...current,
            pets: [pet, ...current.pets],
        });
        this.updateAppState();
    }

    updatePet(id: number, updatedPet: Pet): void {
        const current = this.petSubject.value;
        this.petSubject.next({
            ...current,
            pets: current.pets.map((p: Pet) => (p.id === id ? updatedPet : p)),
            currentPet: current.currentPet?.id === id ? updatedPet : current.currentPet,
        });
        this.updateAppState();
    }

    removePet(id: number): void {
        const current = this.petSubject.value;
        this.petSubject.next({
            ...current,
            pets: current.pets.filter((p: Pet) => p.id !== id),
            currentPet: current.currentPet?.id === id ? null : current.currentPet,
        });
        this.updateAppState();
    }

    clearPets(): void {
        this.petSubject.next(initialPetState);
        this.updateAppState();
    }

    // ==================== Tutor State ====================
    setTutorsLoading(loading: boolean): void {
        const current = this.tutorSubject.value;
        this.tutorSubject.next({ ...current, loading });
    }

    setTutorsSuccess(tutors: Tutor[]): void {
        this.tutorSubject.next({
            tutors,
            currentTutor: this.tutorSubject.value.currentTutor,
            loading: false,
            error: null,
        });
        this.updateAppState();
    }

    setTutorsError(error: string): void {
        const current = this.tutorSubject.value;
        this.tutorSubject.next({ ...current, loading: false, error });
    }

    setCurrentTutor(tutor: Tutor | null): void {
        const current = this.tutorSubject.value;
        this.tutorSubject.next({ ...current, currentTutor: tutor });
        this.updateAppState();
    }

    addTutor(tutor: Tutor): void {
        const current = this.tutorSubject.value;
        this.tutorSubject.next({
            ...current,
            tutors: [tutor, ...current.tutors],
        });
        this.updateAppState();
    }

    updateTutor(id: number, updatedTutor: Tutor): void {
        const current = this.tutorSubject.value;
        this.tutorSubject.next({
            ...current,
            tutors: current.tutors.map((t: Tutor) => (t.id === id ? updatedTutor : t)),
            currentTutor: current.currentTutor?.id === id ? updatedTutor : current.currentTutor,
        });
        this.updateAppState();
    }

    removeTutor(id: number): void {
        const current = this.tutorSubject.value;
        this.tutorSubject.next({
            ...current,
            tutors: current.tutors.filter((t: Tutor) => t.id !== id),
            currentTutor: current.currentTutor?.id === id ? null : current.currentTutor,
        });
        this.updateAppState();
    }

    clearTutors(): void {
        this.tutorSubject.next(initialTutorState);
        this.updateAppState();
    }

    // ==================== App State ====================
    private updateAppState(): void {
        this.appSubject.next({
            auth: this.authSubject.value,
            pets: this.petSubject.value,
            tutors: this.tutorSubject.value,
        });
    }

    // Reset completo do estado
    resetStore(): void {
        this.authSubject.next(initialAuthState);
        this.petSubject.next(initialPetState);
        this.tutorSubject.next(initialTutorState);
        this.updateAppState();
    }
}

// Instância singleton
export const stateStore = new StateStore();
