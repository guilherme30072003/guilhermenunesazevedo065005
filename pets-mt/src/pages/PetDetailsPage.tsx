import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePetDetails } from "../hooks/usePetDetails";
import SetLogin from "../loaders/set-login";
import CardBackground from "../components/card-background";
import Text from "../components/text";

export default function PetDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [Token, setToken] = useState<string | null>(null);
    const petId = id ? parseInt(id) : null;
    const { pet, loading, error } = usePetDetails(Token, petId);

    if (!Token) {
        return (
            <SetLogin onTokenGerado={setToken} />
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Text variant="heading">Carregando detalhes do pet...</Text>
            </div>
        );
    }

    if (error || !pet) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Text variant="heading" className="text-red-500">Erro ao carregar pet</Text>
                <Text variant="default">{error || "Pet não encontrado"}</Text>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 p-6 max-w-2xl mx-auto">
            <button
                onClick={() => navigate("/")}
                className="text-blue-400 hover:text-blue-300 mb-4"
            >
                ← Voltar
            </button>

            <CardBackground className="flex flex-col gap-6 p-8">
                {/* Nome em destaque */}
                <div className="text-center mb-4">
                    <Text
                        as="h1"
                        variant="blast"
                        className="text-4xl font-bold text-blue-400 mb-2"
                    >
                        {pet.nome}
                    </Text>
                </div>

                {/* Foto do pet */}
                {pet.foto?.url && (
                    <div className="flex justify-center">
                        <img
                            src={pet.foto.url}
                            alt={pet.nome}
                            className="rounded-lg max-w-sm max-h-80 object-cover shadow-lg"
                        />
                    </div>
                )}

                {/* Informações básicas */}
                <div className="grid grid-cols-2 gap-4 my-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                        <Text variant="muted" className="text-sm mb-2">Raça</Text>
                        <Text variant="heading" className="text-lg">{pet.raca}</Text>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                        <Text variant="muted" className="text-sm mb-2">Idade</Text>
                        <Text variant="heading" className="text-lg">{pet.idade} anos</Text>
                    </div>
                </div>

                {/* Dados dos tutores */}
                {pet.tutores && pet.tutores.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-600">
                        <Text
                            as="h2"
                            variant="heading"
                            className="text-2xl mb-4 text-blue-300"
                        >
                            Tutor{pet.tutores.length > 1 ? 'es' : ''}
                        </Text>
                        <div className="space-y-4">
                            {pet.tutores.map((tutor, index) => (
                                <div key={tutor.id} className="bg-gray-700 rounded-lg p-4 space-y-3">
                                    {pet.tutores && pet.tutores.length > 1 && (
                                        <Text variant="muted" className="text-xs uppercase font-semibold text-blue-400">
                                            Tutor {index + 1}
                                        </Text>
                                    )}
                                    <div>
                                        <Text variant="muted" className="text-sm">Nome</Text>
                                        <Text variant="heading" className="text-lg">{tutor.nome}</Text>
                                    </div>

                                    {tutor.email && (
                                        <div>
                                            <Text variant="muted" className="text-sm">Email</Text>
                                            <Text variant="heading" className="text-lg">{tutor.email}</Text>
                                        </div>
                                    )}

                                    {tutor.telefone && (
                                        <div>
                                            <Text variant="muted" className="text-sm">Telefone</Text>
                                            <Text variant="heading" className="text-lg">{tutor.telefone}</Text>
                                        </div>
                                    )}

                                    {tutor.endereco && (
                                        <div>
                                            <Text variant="muted" className="text-sm">Endereço</Text>
                                            <Text variant="heading" className="text-lg">{tutor.endereco}</Text>
                                        </div>
                                    )}

                                    {tutor.cpf && (
                                        <div>
                                            <Text variant="muted" className="text-sm">CPF</Text>
                                            <Text variant="heading" className="text-lg">{tutor.cpf}</Text>
                                        </div>
                                    )}

                                    {tutor.foto?.url && (
                                        <div className="mt-3">
                                            <img
                                                src={tutor.foto.url}
                                                alt={tutor.nome}
                                                className="rounded-lg w-24 h-24 object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardBackground>
        </div>
    );
}
