import { useState, useEffect } from "react";
import { petService, tutorService } from "../services/api";
import type { PetDetalhes } from "../types";

export const usePetDetails = (token: string | null, petId: number | null) => {
    const [pet, setPet] = useState<PetDetalhes | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token || petId === null) return;

        const fetchPetDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const petData = await petService.getPetById(token, petId);
                let petWithTutores: PetDetalhes = { ...petData, tutores: [] };

                if (petData.tutorIds && petData.tutorIds.length > 0) {
                    try {
                        const tutoresPromises = petData.tutorIds.map(tutorId =>
                            tutorService.getTutorById(token, tutorId).catch(() => null)
                        );
                        const tutoresData = await Promise.all(tutoresPromises);
                        petWithTutores.tutores = tutoresData.filter(tutor => tutor !== null);
                    } catch (tutoresError) {
                        // console.warn("Erro ao buscar dados dos tutores, continuando sem tutores");
                    }
                }

                setPet(petWithTutores);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };

        fetchPetDetails();
    }, [token, petId]);

    return { pet, loading, error };
};
