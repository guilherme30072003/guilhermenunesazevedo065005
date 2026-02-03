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
