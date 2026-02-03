import axios from "axios";
import { useEffect, useRef } from "react";

interface SetLoginProps {
    onTokenGerado: React.Dispatch<React.SetStateAction<string | null>>;
}


export default function SetLogin({ onTokenGerado }: SetLoginProps) {

    const executou = useRef(false);

    const getLogin = async () => {
        try {
            const response = await axios.post('https://pet-manager-api.geia.vip/autenticacao/login', {
                "username": "admin",
                "password": "admin"
            })

            const data = response.data;

            const login = {
                access_token: data.access_token,
                expires_in: data.expires_in,
                refresh_expires_in: data.refresh_expires_in,
                refresh_token: data.refresh_token
            };




            onTokenGerado(login.access_token)

            // console.log("Pegando Token...")
            // console.log(login.access_token)

        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        if (executou.current) return;
        executou.current = true;
        getLogin();

    }, [])

    return (
        <>
        </>
    )
}
