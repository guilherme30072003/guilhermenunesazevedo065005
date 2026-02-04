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

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 w-full">
                <button
                    onClick={() => navigate("/tutor/form/new")}
                    className="bg-purple-500 hover:bg-purple-600 text-(--text) font-bold py-2 px-6 rounded-lg w-full sm:w-auto transition-colors"
                >
                    + Novo Tutor
                </button>
                <button
                    onClick={() => navigate("/pet/form/new")}
                    className="bg-green-500 hover:bg-green-600 text-(--text) font-bold py-2 px-6 rounded-lg w-full sm:w-auto transition-colors"
                >
                    + Novo Pet
                </button>
            </div>

            <div className="w-full mb-6">
                <SearchBar searchTerm={SearchTerm} onSearchChange={setSearchTerm} />
            </div>
            {Token && <GetPets Token={Token} onGetPets={setPets} onGetPagesQuantidade={setPagesQuantidade} currentPage={CurrentPage} searchTerm={SearchTerm} />}

            <div className="flex items-center justify-center p-2 gap-2 flex-wrap mb-8">

                {Array.from({
                    length: PagesQuantidade == null ? 0 : PagesQuantidade
                })?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`flex items-center justify-center rounded-xl p-3 cursor-pointer transition-colors ${CurrentPage === index
                            ? 'bg-linear-(--gradient) text-white font-bold'
                            : 'bg-gray-400 hover:bg-gray-500'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {Pets?.map(pet => (
                    <div key={pet.id} onClick={() => handleCardClick(pet.id)} className="flex justify-center">
                        <Button variant="no_bg" style_variant='card'> <Card id={pet.id} nome={pet.nome} raca={pet.raca} idade={pet.idade} foto={pet.foto} /> </Button>
                    </div>
                ))}
            </div >
        </>
    );
}
