import axios from "axios";
import { useEffect } from "react";

interface GetLoginProps {
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

export default function GetPets({ Token, onGetPets, onGetPagesQuantidade, currentPage, searchTerm }: GetLoginProps) {


    const authAxios = axios.create({
        baseURL: "https://pet-manager-api.geia.vip",
        headers: {
            Authorization: `Bearer ${Token}`
        }
    })


    const getPets = async (page: number, search: string) => {
        try {
            const response = await authAxios.get("/v1/pets", {
                params: {
                    page: page,
                    nome: search || undefined
                }
            });
            console.log(response);

            const data = response.data.content;
            onGetPets([]); // Limpa os pets anteriores

            data.forEach((pet: {
                id: number,
                nome: string,
                raca: string,
                idade: number,
                foto: {
                    id: number,
                    nome: string,
                    contentType: string,
                    url: string
                }
            }) => {
                console.log(pet);
                console.log(typeof (pet));
                const novoPet = pet
                if (!novoPet) return;

                onGetPets(prev => [...(prev ?? []), novoPet]);
                onGetPagesQuantidade(response.data.pageCount)
            });


        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (!Token) return;

        getPets(currentPage, searchTerm);

        console.log("Executou!");
        console.log("Usando Token...");
        console.log(Token);
        console.log("Página atual:", currentPage);
        console.log("Termo de busca:", searchTerm);

    }, [Token, currentPage, searchTerm])



    return (
        <>
        </>
    )
}

