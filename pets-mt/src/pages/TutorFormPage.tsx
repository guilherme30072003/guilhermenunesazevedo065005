import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tutorService } from "../services/api";
import { useInputMasks } from "../hooks/useInputMasks";
import SetLogin from "../loaders/set-login";
import CardBackground from "../components/card-background";
import Text from "../components/text";

export default function TutorFormPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [Token, setToken] = useState<string | null>(null);
    const isEditMode = !!id;
    const tutorId = id ? parseInt(id) : null;
    const { maskPhone } = useInputMasks();

    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        endereco: "",
        email: ""
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isEditMode && Token && tutorId) {
            const fetchTutor = async () => {
                try {
                    const tutor = await tutorService.getTutorById(Token, tutorId);
                    setFormData({
                        nome: tutor.nome,
                        telefone: tutor.telefone || "",
                        endereco: tutor.endereco || "",
                        email: tutor.email || ""
                    });
                    if (tutor.foto?.url) {
                        setPreview(tutor.foto.url);
                    }
                } catch (err) {
                    setError("Erro ao carregar dados do tutor");
                }
            };
            fetchTutor();
        }
    }, [isEditMode, Token, tutorId]);

    if (!Token) {
        return <SetLogin onTokenGerado={setToken} />;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = e.target;

        if (name === "telefone") {
            value = maskPhone(value);
        }

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
            const tutorPayload = {
                nome: formData.nome,
                telefone: formData.telefone,
                endereco: formData.endereco,
                email: formData.email
            };

            let createdTutorId = tutorId;

            if (isEditMode && tutorId) {
                await tutorService.updateTutor(Token, tutorId, tutorPayload);
            } else {
                const newTutor = await tutorService.createTutor(Token, tutorPayload);
                createdTutorId = newTutor.id;
            }

            if (selectedFile && createdTutorId) {
                await tutorService.uploadTutorPhoto(Token, createdTutorId, selectedFile);
            }

            setSuccess(true);
            setTimeout(() => {
                navigate(createdTutorId ? `/tutor/${createdTutorId}` : "/");
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao salvar tutor");
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
                        {isEditMode ? "Editar Tutor" : "Novo Tutor"}
                    </Text>
                </div>

                {error && (
                    <div className="bg-red-500 text-white p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500 text-white p-4 rounded-lg">
                        Tutor salvo com sucesso!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Foto */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="foto" className="text-blue-300 font-semibold">
                            Foto do Tutor
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

                    {/* Nome Completo */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-blue-300 font-semibold">
                            Nome Completo *
                        </label>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                            placeholder="Digite o nome completo"
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-blue-300 font-semibold">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Digite o email"
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Telefone */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="telefone" className="text-blue-300 font-semibold">
                            Telefone *
                        </label>
                        <input
                            id="telefone"
                            name="telefone"
                            type="text"
                            value={formData.telefone}
                            onChange={handleInputChange}
                            required
                            placeholder="(11) 9999-9999"
                            maxLength={15}
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Endereço */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="endereco" className="text-blue-300 font-semibold">
                            Endereço *
                        </label>
                        <textarea
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleInputChange}
                            required
                            placeholder="Digite o endereço completo"
                            rows={4}
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
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
