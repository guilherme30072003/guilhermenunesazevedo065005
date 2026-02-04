import { useState } from "react";
import CardBackground from "../components/card-background";
import Text from "../components/text";

interface LoginPageProps {
    onLogin: (username: string, password: string) => Promise<void>;
    loading?: boolean;
    error?: string | null;
}

export default function LoginPage({ onLogin, loading = false, error = null }: LoginPageProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocalError(null);

        if (!username.trim() || !password.trim()) {
            setLocalError("Usuário e senha são obrigatórios");
            return;
        }

        try {
            await onLogin(username, password);
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : "Erro ao fazer login");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 to-gray-800 p-4">
            <CardBackground className="w-full max-w-md p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <Text as="h1" variant="blast" className="text-4xl text-blue-400 mb-2">
                        🐶 Pets MT
                    </Text>
                    <Text variant="default" className="text-gray-400">
                        Sistema de Gerenciamento de Pets e Tutores
                    </Text>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Username Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-blue-300 font-semibold text-sm">
                            Usuário
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ex: admin"
                            disabled={loading}
                            className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-blue-300 font-semibold text-sm">
                            Senha
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ex: admin"
                            disabled={loading}
                            className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        />
                    </div>

                    {/* Error Messages */}
                    {(error || localError) && (
                        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 p-4 rounded-lg text-sm">
                            {error || localError}
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading || !username.trim() || !password.trim()}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="inline-block animate-spin">⏳</span>
                                Entrando...
                            </>
                        ) : (
                            <>
                                ➜ Login
                            </>
                        )}
                    </button>
                </form>

                {/* Helper Text */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                    <Text variant="muted" className="text-center text-xs">
                        Credenciais padrão para teste:
                    </Text>
                    <Text variant="muted" className="text-center text-xs mt-2">
                        <strong>Usuário:</strong> admin<br />
                        <strong>Senha:</strong> admin
                    </Text>
                </div>
            </CardBackground>
        </div>
    );
}
