import { useState } from "react";
import SetLogin from "./set-login";
import GetPets from "./get-pets";
import Card from "../components/card";




export default function Home() {
    const [Token, setToken] = useState<string | null>(null);
    const [Pets, setPets] = useState<{
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
    }[]>([]);

    return (
        <>
            <SetLogin onTokenGerado={setToken} />
            {Token && <GetPets Token={Token} onGetPets={setPets} />}

            <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 p-3">
                {Pets?.map(pet => (
                    <div key={pet.id}>
                        <Card id={pet.id} nome={pet.nome} raca={pet.raca} idade={pet.idade} foto={pet.foto} />
                    </div>
                ))}
            </div>
        </>
    );
};

