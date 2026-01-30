import { useState } from "react";
import SetLogin from "./set-login";
import GetPets from "./get-pets";


export default function Home() {
    const [Token, setToken] = useState<string | null>(null);

    return (
        <>
            <SetLogin onTokenGerado={setToken} />
            {Token && <GetPets Token={Token} />}
        </>
    );
};

