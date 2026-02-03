import { useEffect } from "react";
import { petService } from "../services/api";

interface GetPetsProps {
    Token: string | null;
    onGetPets: React.Dispatch<React.SetStateAction<{
        id: number;
        nome: string;
        raca: string;
        idade: number;
        foto: {
            id: number;
            nome: string;
            contentType: string;
            url: string;
        };
    }[]>>;
    onGetPagesQuantidade: React.Dispatch<React.SetStateAction<number | null>>;
    currentPage: number;
    searchTerm: string;
}

export default function GetPets({ Token, onGetPets, onGetPagesQuantidade, currentPage, searchTerm }: GetPetsProps) {
    useEffect(() => {
        if (!Token) return;

        const fetchPets = async () => {
            try {
                const { content, pageCount } = await petService.getPets(Token, currentPage, searchTerm);
                onGetPets(content);
                onGetPagesQuantidade(pageCount);
            } catch (error) {
                console.error("Erro ao buscar pets:", error);
            }
        };

        fetchPets();
    }, [Token, currentPage, searchTerm, onGetPets, onGetPagesQuantidade]);

    return null;
}
