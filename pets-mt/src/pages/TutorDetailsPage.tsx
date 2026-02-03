import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tutorService } from "../services/api";
import SetLogin from "../loaders/set-login";
import CardBackground from "../components/card-background";
import Text from "../components/text";
import type { Tutor, Pet } from "../types";

export default function TutorDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [Token, setToken] = useState<string | null>(null);
    const tutorId = id ? parseInt(id) : null;

    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [unlinkingPetId, setUnlinkingPetId] = useState<number | null>(null);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [petIdToLink, setPetIdToLink] = useState<string>("");
    const [linkingPet, setLinkingPet] = useState(false);
    const [linkError, setLinkError] = useState<string | null>(null);

    useEffect(() => {
        if (!Token || !tutorId) return;

        const fetchTutorDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const tutorData = await tutorService.getTutorById(Token, tutorId);
                setTutor(tutorData);

                // Buscar pets vinculados ao tutor
                const petsData = await tutorService.getPetsByTutorId(Token, tutorId);
                setPets(petsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro ao carregar tutor");
            } finally {
                setLoading(false);
            }
        };

        fetchTutorDetails();
    }, [Token, tutorId]);

    if (!Token) {
        return <SetLogin onTokenGerado={setToken} />;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Text variant="heading">Carregando detalhes do tutor...</Text>
            </div>
        );
    }

    if (error || !tutor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Text variant="heading" className="text-red-500">Erro ao carregar tutor</Text>
                <Text variant="default">{error || "Tutor não encontrado"}</Text>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Voltar
                </button>
            </div>
        );
    }

    const handleUnlinkPet = async (petId: number) => {
        if (!tutorId) return;
        setUnlinkingPetId(petId);
        try {
            await tutorService.unlinkPetFromTutor(Token, tutorId, petId);
            setPets(pets.filter(p => p.id !== petId));
        } catch (err) {
            alert("Erro ao remover vínculo do pet");
        } finally {
            setUnlinkingPetId(null);
        }
    };

    const handleLinkPet = async () => {
        if (!petIdToLink || !Token || !tutorId) return;
        setLinkingPet(true);
        setLinkError(null);
        try {
            await tutorService.linkPetToTutor(Token, tutorId, parseInt(petIdToLink));
            setShowLinkModal(false);
            setPetIdToLink("");
            window.location.reload();
        } catch (err) {
            setLinkError(err instanceof Error ? err.message : "Erro ao vincular pet");
        } finally {
            setLinkingPet(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate("/")}
                    className="text-blue-400 hover:text-blue-300"
                >
                    ← Voltar
                </button>
                <button
                    onClick={() => navigate(`/tutor/form/${tutorId}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
                >
                    ✎ Editar
                </button>
            </div>

            <CardBackground className="flex flex-col gap-6 p-8">
                {/* Nome em destaque */}
                <div className="text-center mb-4">
                    <Text
                        as="h1"
                        variant="blast"
                        className="text-4xl font-bold text-blue-400 mb-2"
                    >
                        {tutor.nome}
                    </Text>
                </div>

                {/* Foto do tutor */}
                {tutor.foto?.url && (
                    <div className="flex justify-center">
                        <img
                            src={tutor.foto.url}
                            alt={tutor.nome}
                            className="rounded-lg max-w-sm max-h-80 object-cover shadow-lg"
                        />
                    </div>
                )}

                {/* Informações do tutor */}
                <div className="space-y-4">
                    {tutor.email && (
                        <div className="bg-gray-700 rounded-lg p-4">
                            <Text variant="muted" className="text-sm mb-2">Email</Text>
                            <Text variant="heading" className="text-lg">{tutor.email}</Text>
                        </div>
                    )}

                    {tutor.telefone && (
                        <div className="bg-gray-700 rounded-lg p-4">
                            <Text variant="muted" className="text-sm mb-2">Telefone</Text>
                            <Text variant="heading" className="text-lg">{tutor.telefone}</Text>
                        </div>
                    )}

                    {tutor.endereco && (
                        <div className="bg-gray-700 rounded-lg p-4">
                            <Text variant="muted" className="text-sm mb-2">Endereço</Text>
                            <Text variant="heading" className="text-lg">{tutor.endereco}</Text>
                        </div>
                    )}

                    {tutor.cpf && (
                        <div className="bg-gray-700 rounded-lg p-4">
                            <Text variant="muted" className="text-sm mb-2">CPF</Text>
                            <Text variant="heading" className="text-lg">{tutor.cpf}</Text>
                        </div>
                    )}
                </div>

                {/* Pets vinculados */}
                <div className="mt-6 pt-6 border-t border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                        <Text
                            as="h2"
                            variant="heading"
                            className="text-2xl text-blue-300"
                        >
                            Pets Vinculados ({pets.length})
                        </Text>
                        <button
                            onClick={() => setShowLinkModal(true)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
                        >
                            + Vincular Pet
                        </button>
                    </div>

                    {pets.length === 0 ? (
                        <Text variant="muted" className="text-center py-8">
                            Nenhum pet vinculado a este tutor
                        </Text>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {pets.map(pet => (
                                <div
                                    key={pet.id}
                                    className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                                >
                                    <div>
                                        <Text variant="heading" className="text-lg">{pet.nome}</Text>
                                        <Text variant="muted" className="text-sm">{pet.raca} • {pet.idade} anos</Text>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/pet/${pet.id}`)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                            Ver
                                        </button>
                                        <button
                                            onClick={() => handleUnlinkPet(pet.id)}
                                            disabled={unlinkingPetId === pet.id}
                                            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white px-4 py-2 rounded"
                                        >
                                            {unlinkingPetId === pet.id ? "Removendo..." : "Remover"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardBackground>

            {/* Modal de Vinculação */}
            {showLinkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <CardBackground className="p-8 max-w-md w-full mx-4">
                        <Text
                            as="h2"
                            variant="heading"
                            className="text-2xl mb-4 text-blue-400"
                        >
                            Vincular Pet
                        </Text>

                        {linkError && (
                            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                                {linkError}
                            </div>
                        )}

                        <div className="flex flex-col gap-4 mb-6">
                            <label htmlFor="pet-id" className="text-blue-300 font-semibold">
                                ID do Pet *
                            </label>
                            <input
                                id="pet-id"
                                name="pet-id"
                                type="number"
                                value={petIdToLink}
                                onChange={(e) => setPetIdToLink(e.target.value)}
                                placeholder="Digite o ID do pet"
                                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleLinkPet}
                                disabled={linkingPet || !petIdToLink}
                                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-2 rounded-lg"
                            >
                                {linkingPet ? "Vinculando..." : "Vincular"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowLinkModal(false);
                                    setPetIdToLink("");
                                    setLinkError(null);
                                }}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 rounded-lg"
                            >
                                Cancelar
                            </button>
                        </div>
                    </CardBackground>
                </div>
            )}
        </div>
    );
}
