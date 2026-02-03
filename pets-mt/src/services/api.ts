import axios from "axios";
import type { Pet, Tutor } from "../types";

const API_BASE_URL = "https://pet-manager-api.geia.vip";

export const createAuthAxios = (token: string) => {
    return axios.create({
        baseURL: API_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const petService = {
    getPets: async (token: string, page: number = 0, nome?: string) => {
        const authAxios = createAuthAxios(token);
        try {
            const response = await authAxios.get("/v1/pets", {
                params: {
                    page: page,
                    nome: nome || undefined
                }
            });
            return {
                content: response.data.content as Pet[],
                pageCount: response.data.pageCount as number
            };
        } catch (error) {
            console.error("Erro ao buscar pets:", error);
            throw error;
        }
    },

    getPetById: async (token: string, id: number) => {
        const authAxios = createAuthAxios(token);
        try {
            const response = await authAxios.get(`/v1/pets/${id}`);
            return response.data as Pet;
        } catch (error) {
            console.error(`Erro ao buscar pet ${id}:`, error);
            throw error;
        }
    },

    createPet: async (token: string, petData: Omit<Pet, 'id' | 'foto'>) => {
        const authAxios = createAuthAxios(token);
        try {
            const response = await authAxios.post("/v1/pets", petData);
            return response.data as Pet;
        } catch (error) {
            console.error("Erro ao criar pet:", error);
            throw error;
        }
    },

    updatePet: async (token: string, id: number, petData: Omit<Pet, 'id' | 'foto'>) => {
        const authAxios = createAuthAxios(token);
        try {
            const response = await authAxios.put(`/v1/pets/${id}`, petData);
            return response.data as Pet;
        } catch (error) {
            console.error(`Erro ao atualizar pet ${id}:`, error);
            throw error;
        }
    },

    uploadPetPhoto: async (token: string, petId: number, file: File) => {
        const authAxios = createAuthAxios(token);
        const formData = new FormData();
        formData.append('arquivo', file);
        try {
            const response = await authAxios.post(`/v1/pets/${petId}/fotos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Erro ao fazer upload da foto do pet ${petId}:`, error);
            throw error;
        }
    }
};

export const tutorService = {
    getTutorById: async (token: string, id: number) => {
        const authAxios = createAuthAxios(token);
        try {
            const response = await authAxios.get(`/v1/tutores/${id}`);
            return response.data as Tutor;
        } catch (error) {
            console.error(`Erro ao buscar tutor ${id}:`, error);
            throw error;
        }
    }
};
