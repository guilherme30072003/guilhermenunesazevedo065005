import axios from "axios";
import { useEffect, useRef } from "react";

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
}

export default function GetPets({ Token, onGetPets }: GetLoginProps) {

    const executou = useRef(false);

    const authAxios = axios.create({
        baseURL: "https://pet-manager-api.geia.vip",
        headers: {
            Authorization: `Bearer ${Token}`
        }
    })


    const getPets = async () => {
        try {
            const response = await authAxios.get("/v1/pets");
            console.log(response);

            const data = response.data.content;

            let index = 0;


            data.forEach((pet: {
                //page: number,
                //size: number,
                //total: number,
                //pageCount: number,
                //content?: [
                //{
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
                //}
                //]
            }) => {
                console.log(pet);
                console.log(typeof (pet));
                //onGetPets(prev => [...prev, pet.content[index]]);
                //const novoPet = pet.content?.[index];
                const novoPet = pet
                if (!novoPet) return;

                onGetPets(prev => [...(prev ?? []), novoPet]);

                //onGetPets(prev => [
                //...(prev ?? []),
                //pet.content[index]
                //]);
                index++;
            });


        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (executou.current) return;
        executou.current = true;

        getPets();

        console.log("Executou!");
        console.log("Usando Token...");
        console.log(Token);

    }, [])



    return (
        <>
        </>
    )
}

