import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePetDetails } from "../hooks/usePetDetails";
import { tutorService, petService } from "../services/api";
import SetLogin from "../loaders/set-login";
import CardBackground from "../components/card-background";
import Text from "../components/text";

export default function PetDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [Token, setToken] = useState<string | null>(null);
    const petId = id ? parseInt(id) : null;
    const { pet, loading, error } = usePetDetails(Token, petId);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [tutorIdToLink, setTutorIdToLink] = useState<string>("");
    const [linkingTutor, setLinkingTutor] = useState(false);
    const [linkError, setLinkError] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

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

    const handleLinkTutor = async () => {
        if (!tutorIdToLink || !Token || !petId) return;
        setLinkingTutor(true);
        setLinkError(null);
        try {
            await tutorService.linkPetToTutor(Token, parseInt(tutorIdToLink), petId);
            setShowLinkModal(false);
            setTutorIdToLink("");
            // Recarregar a página para atualizar os dados
            window.location.reload();
        } catch (err) {
            setLinkError(err instanceof Error ? err.message : "Erro ao vincular tutor");
        } finally {
            setLinkingTutor(false);
        }
    };

    const handleDeletePet = async () => {
        if (!Token || !petId) return;
        setDeleting(true);
        setDeleteError(null);
        try {
            await petService.deletePet(Token, petId);
            // Navegar de volta para home após deletar
            navigate("/");
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : "Erro ao deletar pet");
        } finally {
            setDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate("/")}
                    className="text-blue-400 hover:text-blue-300"
                >
                    ← Voltar
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/pet/form/${petId}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
                    >
                        ✎ Editar
                    </button>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg"
                    >
                        🗑️ Deletar
                    </button>
                </div>
            </div>

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
                <div className="mt-6 pt-6 border-t border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                        <Text
                            as="h2"
                            variant="heading"
                            className="text-2xl text-blue-300"
                        >
                            Tutor{pet.tutores && pet.tutores.length > 1 ? 'es' : ''}
                        </Text>
                        <button
                            onClick={() => setShowLinkModal(true)}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
                        >
                            + Vincular Tutor
                        </button>
                    </div>
                    {pet.tutores && pet.tutores.length > 0 ? (
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

                                    <div className="flex gap-2 pt-4 border-t border-gray-600">
                                        <button
                                            onClick={() => navigate(`/tutor/${tutor.id}`)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                                        >
                                            Ver Tutor
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Text variant="muted" className="text-center py-8">
                            Nenhum tutor vinculado a este pet
                        </Text>
                    )}
                </div>
            </CardBackground>

            {/* Modal de Confirmação de Deleção */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <CardBackground className="p-8 max-w-md w-full mx-4">
                        <Text
                            as="h2"
                            variant="heading"
                            className="text-2xl mb-4 text-red-400"
                        >
                            Confirmar Deleção
                        </Text>

                        <Text variant="default" className="mb-6 text-gray-300">
                            Tem certeza que deseja deletar o pet <strong>{pet?.nome}</strong>? Esta ação não pode ser desfeita.
                        </Text>

                        {deleteError && (
                            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                                {deleteError}
                            </div>
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={handleDeletePet}
                                disabled={deleting}
                                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-2 rounded-lg"
                            >
                                {deleting ? "Deletando..." : "Deletar"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setDeleteError(null);
                                }}
                                disabled={deleting}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 text-white font-bold py-2 rounded-lg"
                            >
                                Cancelar
                            </button>
                        </div>
                    </CardBackground>
                </div>
            )}

            {/* Modal de Vinculação */}
            {showLinkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <CardBackground className="p-8 max-w-md w-full mx-4">
                        <Text
                            as="h2"
                            variant="heading"
                            className="text-2xl mb-4 text-blue-400"
                        >
                            Vincular Tutor
                        </Text>

                        {linkError && (
                            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                                {linkError}
                            </div>
                        )}

                        <div className="flex flex-col gap-4 mb-6">
                            <label htmlFor="tutor-id" className="text-blue-300 font-semibold">
                                ID do Tutor *
                            </label>
                            <input
                                id="tutor-id"
                                name="tutor-id"
                                type="number"
                                value={tutorIdToLink}
                                onChange={(e) => setTutorIdToLink(e.target.value)}
                                placeholder="Digite o ID do tutor"
                                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleLinkTutor}
                                disabled={linkingTutor || !tutorIdToLink}
                                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-2 rounded-lg"
                            >
                                {linkingTutor ? "Vinculando..." : "Vincular"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowLinkModal(false);
                                    setTutorIdToLink("");
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
