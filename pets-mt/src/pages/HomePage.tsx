import { useState } from "react";
import SetLogin from "../loaders/set-login";
import GetPets from "../loaders/get-pets";
import Card from "../components/card";
import Button from "../components/button";
import SearchBar from "../components/search-bar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
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
    const [PagesQuantidade, setPagesQuantidade] = useState<number | null>(null);
    const [CurrentPage, setCurrentPage] = useState<number>(0);
    const [SearchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();

    const handleCardClick = (petId: number) => {
        navigate(`/pet/${petId}`);
    };

    return (
        <>
            <SetLogin onTokenGerado={setToken} />
            <SearchBar searchTerm={SearchTerm} onSearchChange={setSearchTerm} />
            {Token && <GetPets Token={Token} onGetPets={setPets} onGetPagesQuantidade={setPagesQuantidade} currentPage={CurrentPage} searchTerm={SearchTerm} />}

            <div className="flex items-center justify-center p-2 gap-2">

                {Array.from({
                    length: PagesQuantidade == null ? 0 : PagesQuantidade
                })?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`flex items-center justify-center rounded-xl p-3 cursor-pointer ${CurrentPage === index
                            ? 'bg-linear-(--gradient) text-white font-bold'
                            : 'bg-gray-400 hover:bg-gray-500'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 p-3">
                {Pets?.map(pet => (
                    <div key={pet.id} onClick={() => handleCardClick(pet.id)}>
                        <Button variant="no_bg" style_variant='card'> <Card id={pet.id} nome={pet.nome} raca={pet.raca} idade={pet.idade} foto={pet.foto} /> </Button>
                    </div>
                ))}
            </div >
        </>
    );
}
