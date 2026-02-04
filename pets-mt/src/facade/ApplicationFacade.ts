import { firstValueFrom } from "rxjs";
import type { Pet, Tutor } from "../types";
import { authService, petService, tutorService } from "../services/api";
import { stateStore } from "../store/StateStore";

/**
 * ApplicationFacade - Padrão Facade
 * Simplifica a interação entre componentes e serviços
 * Abstrai a complexidade de chamadas HTTP e gerenciamento de estado
 */
export class ApplicationFacade {
    // ==================== Autenticação ====================

    async login(username: string, password: string): Promise<void> {
        try {
            stateStore.setAuthLoading(true);
            const response = await authService.login(username, password);
            const { access_token, refresh_token } = response;

            // Armazenar no localStorage
            localStorage.setItem("pets_mt_access_token", access_token);
            localStorage.setItem("pets_mt_refresh_token", refresh_token);

            // Atualizar estado
            stateStore.setAuthSuccess(access_token, refresh_token);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login";
            stateStore.setAuthError(errorMessage);
            throw error;
        }
    }

    logout(): void {
        localStorage.removeItem("pets_mt_access_token");
        localStorage.removeItem("pets_mt_refresh_token");
        stateStore.clearAuth();
        stateStore.clearPets();
        stateStore.clearTutors();
    }

    async refreshToken(): Promise<void> {
        try {
            const state = await firstValueFrom(stateStore.auth$);
            if (!state.refreshToken) {
                throw new Error("Nenhum refresh token disponível");
            }

            const response = await authService.refresh(state.refreshToken);
            const { access_token, refresh_token } = response;

            localStorage.setItem("pets_mt_access_token", access_token);
            localStorage.setItem("pets_mt_refresh_token", refresh_token);

            stateStore.setAuthSuccess(access_token, refresh_token);
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    async loadAuthFromStorage(): Promise<void> {
        const accessToken = localStorage.getItem("pets_mt_access_token");
        const refreshToken = localStorage.getItem("pets_mt_refresh_token");

        if (accessToken && refreshToken) {
            stateStore.loadAuthFromStorage(accessToken, refreshToken);
        } else {
            stateStore.clearAuth();
        }
    }

    // ==================== Pets ====================

    async loadPets(token: string, page: number = 0, searchTerm?: string): Promise<void> {
        try {
            stateStore.setPetsLoading(true);
            const result = await petService.getPets(token, page, searchTerm);
            stateStore.setPetsSuccess(result.content, result.pageCount, page);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao carregar pets";
            stateStore.setPetsError(errorMessage);
            throw error;
        }
    }

    async loadPetById(token: string, id: number): Promise<void> {
        try {
            stateStore.setPetsLoading(true);
            const pet = await petService.getPetById(token, id);
            stateStore.setCurrentPet(pet);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao carregar pet";
            stateStore.setPetsError(errorMessage);
            throw error;
        }
    }

    async createPet(token: string, petData: Omit<Pet, "id" | "foto">): Promise<void> {
        try {
            stateStore.setPetsLoading(true);
            const newPet = await petService.createPet(token, petData);
            stateStore.addPet(newPet);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao criar pet";
            stateStore.setPetsError(errorMessage);
            throw error;
        }
    }

    async updatePet(
        token: string,
        id: number,
        petData: Omit<Pet, "id" | "foto">
    ): Promise<void> {
        try {
            stateStore.setPetsLoading(true);
            const updatedPet = await petService.updatePet(token, id, petData);
            stateStore.updatePet(id, updatedPet);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar pet";
            stateStore.setPetsError(errorMessage);
            throw error;
        }
    }

    async deletePet(token: string, id: number): Promise<void> {
        try {
            stateStore.setPetsLoading(true);
            await petService.deletePet(token, id);
            stateStore.removePet(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao deletar pet";
            stateStore.setPetsError(errorMessage);
            throw error;
        }
    }

    async uploadPetPhoto(token: string, petId: number, file: File): Promise<void> {
        try {
            await petService.uploadPetPhoto(token, petId, file);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao fazer upload de foto";
            stateStore.setPetsError(errorMessage);
            throw error;
        }
    }

    // ==================== Tutores ====================

    async loadTutorById(token: string, id: number): Promise<void> {
        try {
            stateStore.setTutorsLoading(true);
            const tutor = await tutorService.getTutorById(token, id);
            stateStore.setCurrentTutor(tutor);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao carregar tutor";
            stateStore.setTutorsError(errorMessage);
            throw error;
        }
    }

    async createTutor(token: string, tutorData: Omit<Tutor, "id" | "foto">): Promise<void> {
        try {
            stateStore.setTutorsLoading(true);
            const newTutor = await tutorService.createTutor(token, tutorData);
            stateStore.addTutor(newTutor);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao criar tutor";
            stateStore.setTutorsError(errorMessage);
            throw error;
        }
    }

    async updateTutor(
        token: string,
        id: number,
        tutorData: Omit<Tutor, "id" | "foto">
    ): Promise<void> {
        try {
            stateStore.setTutorsLoading(true);
            const updatedTutor = await tutorService.updateTutor(token, id, tutorData);
            stateStore.updateTutor(id, updatedTutor);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar tutor";
            stateStore.setTutorsError(errorMessage);
            throw error;
        }
    }

    async uploadTutorPhoto(token: string, tutorId: number, file: File): Promise<void> {
        try {
            await tutorService.uploadTutorPhoto(token, tutorId, file);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao fazer upload de foto";
            stateStore.setTutorsError(errorMessage);
            throw error;
        }
    }

    async linkPetToTutor(token: string, tutorId: number, petId: number): Promise<void> {
        try {
            await tutorService.linkPetToTutor(token, tutorId, petId);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao vincular pet";
            stateStore.setTutorsError(errorMessage);
            throw error;
        }
    }

    async unlinkPetFromTutor(token: string, tutorId: number, petId: number): Promise<void> {
        try {
            await tutorService.unlinkPetFromTutor(token, tutorId, petId);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao desvincular pet";
            stateStore.setTutorsError(errorMessage);
            throw error;
        }
    }

    async getPetsByTutorId(token: string, tutorId: number): Promise<Pet[]> {
        try {
            return await tutorService.getPetsByTutorId(token, tutorId);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao carregar pets do tutor";
            stateStore.setTutorsError(errorMessage);
            throw error;
        }
    }
}

// Instância singleton do Facade
export const appFacade = new ApplicationFacade();
