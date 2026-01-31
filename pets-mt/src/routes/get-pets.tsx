import axios from "axios";
import { useEffect, useRef } from "react";

interface GetLoginProps {
    Token: string | null;
}

export default function GetPets({ Token }: GetLoginProps) {

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

