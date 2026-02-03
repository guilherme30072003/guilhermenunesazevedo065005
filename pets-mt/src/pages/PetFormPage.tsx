import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { petService } from "../services/api";
import SetLogin from "../loaders/set-login";
import CardBackground from "../components/card-background";
import Text from "../components/text";
import type { Pet } from "../types";

export default function PetFormPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [Token, setToken] = useState<string | null>(null);
    const isEditMode = !!id;
    const petId = id ? parseInt(id) : null;

    const [formData, setFormData] = useState({
        nome: "",
        raca: "",
        idade: "",
        especie: ""
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isEditMode && Token && petId) {
            const fetchPet = async () => {
                try {
                    const pet = await petService.getPetById(Token, petId);
                    setFormData({
                        nome: pet.nome,
                        raca: pet.raca,
                        idade: pet.idade.toString(),
                        especie: pet.raca // Ajustar conforme necessário
                    });
                    if (pet.foto?.url) {
                        setPreview(pet.foto.url);
                    }
                } catch (err) {
                    setError("Erro ao carregar dados do pet");
                }
            };
            fetchPet();
        }
    }, [isEditMode, Token, petId]);

    if (!Token) {
        return <SetLogin onTokenGerado={setToken} />;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const petPayload = {
                nome: formData.nome,
                raca: formData.raca,
                idade: parseInt(formData.idade),
                especie: formData.especie
            };

            let createdPetId = petId;

            if (isEditMode && petId) {
                // Editar pet
                await petService.updatePet(Token, petId, petPayload);
            } else {
                // Criar novo pet
                const newPet = await petService.createPet(Token, petPayload);
                createdPetId = newPet.id;
            }

            // Upload de foto se selecionado
            if (selectedFile && createdPetId) {
                await petService.uploadPetPhoto(Token, createdPetId, selectedFile);
            }

            setSuccess(true);
            setTimeout(() => {
                navigate(createdPetId ? `/pet/${createdPetId}` : "/");
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao salvar pet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 max-w-2xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-400 hover:text-blue-300 mb-4"
            >
                ← Voltar
            </button>

            <CardBackground className="flex flex-col gap-6 p-8">
                <div className="text-center mb-4">
                    <Text
                        as="h1"
                        variant="blast"
                        className="text-4xl font-bold text-blue-400 mb-2"
                    >
                        {isEditMode ? "Editar Pet" : "Novo Pet"}
                    </Text>
                </div>

                {error && (
                    <div className="bg-red-500 text-white p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500 text-white p-4 rounded-lg">
                        Pet salvo com sucesso!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Foto */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="foto" className="text-blue-300 font-semibold">
                            Foto do Pet
                        </label>
                        {preview && (
                            <div className="flex justify-center mb-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="rounded-lg max-w-xs max-h-64 object-cover"
                                />
                            </div>
                        )}
                        <input
                            id="foto"
                            name="foto"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        />
                    </div>

                    {/* Nome */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-blue-300 font-semibold">
                            Nome *
                        </label>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                            placeholder="Digite o nome do pet"
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Espécie */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="especie" className="text-blue-300 font-semibold">
                            Espécie *
                        </label>
                        <input
                            id="especie"
                            name="especie"
                            type="text"
                            value={formData.especie}
                            onChange={handleInputChange}
                            required
                            placeholder="Ex: Cão, Gato, Pássaro"
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Idade */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="idade" className="text-blue-300 font-semibold">
                            Idade (anos) *
                        </label>
                        <input
                            id="idade"
                            name="idade"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.idade}
                            onChange={handleInputChange}
                            required
                            placeholder="Digite a idade em anos"
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Raça */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="raca" className="text-blue-300 font-semibold">
                            Raça *
                        </label>
                        <input
                            id="raca"
                            name="raca"
                            type="text"
                            value={formData.raca}
                            onChange={handleInputChange}
                            required
                            placeholder="Digite a raça do pet"
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Botões */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
                        >
                            {loading ? "Salvando..." : isEditMode ? "Atualizar" : "Criar"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </CardBackground>
        </div>
    );
}
