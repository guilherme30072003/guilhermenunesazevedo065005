import axios from "axios";
import { useEffect } from "react";

interface GetLoginProps {
    Token: string | null;
}

export default function GetPets({ Token }: GetLoginProps) {


    if (Token) {

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

        console.log("Usando Token...")
        console.log(Token)

        useEffect(() => {

            getPets();

        }, [Token])
    }


    return (
        <>
        </>
    )
}

