import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Text from "./components/text";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { setupAxiosInterceptors } from "./services/axiosSetup";
import { setGlobalApiClient } from "./services/api";

// Lazy load - Módulo Pets
const PetDetailsPage = lazy(() => import("./pages/PetDetailsPage"));
const PetFormPage = lazy(() => import("./pages/PetFormPage"));

// Lazy load - Módulo Tutores
const TutorDetailsPage = lazy(() => import("./pages/TutorDetailsPage"));
const TutorFormPage = lazy(() => import("./pages/TutorFormPage"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Text variant="heading">Carregando...</Text>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const { isAuthenticated, loading, login, logout, accessToken, refreshToken } = useAuthContext();

  // Configurar interceptor quando tokens mudarem
  useEffect(() => {
    if (accessToken && refreshToken) {
      const apiClient = setupAxiosInterceptors(
        () => accessToken,
        () => refreshToken,
        (response) => {
          // Atualizar tokens quando refresh acontecer
          localStorage.setItem("pets_mt_access_token", response.access_token);
          localStorage.setItem("pets_mt_refresh_token", response.refresh_token);
          // Nota: O contexto será atualizado automaticamente no próximo render
        },
        () => {
          // Token expirado, fazer logout
          logout();
        }
      );
      setGlobalApiClient(apiClient);
    }
  }, [accessToken, refreshToken, logout]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={login} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900">
        {/* Header - Centralizado */}
        <div className="w-full bg-gray-800 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 py-6 gap-4">
            <div className="text-center flex-1 sm:text-left">
              <Text variant="blast" className="text-blue-500 text-3xl sm:text-4xl"> 🐶 Pets MT </Text>
              <Text variant="default" className="text-gray-400 text-sm mt-1"> clique no card para ver os detalhes do pet </Text>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
        {/* Main Content */}
        <main className="flex-1 w-full px-4 sm:px-10 py-8">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              {/* Rotas Pets */}
              <Route path="/pet/:id" element={
                <ProtectedRoute>
                  <PetDetailsPage />
                </ProtectedRoute>
              } />
              <Route path="/pet/form/new" element={
                <ProtectedRoute>
                  <PetFormPage />
                </ProtectedRoute>
              } />
              <Route path="/pet/form/:id" element={
                <ProtectedRoute>
                  <PetFormPage />
                </ProtectedRoute>
              } />
              {/* Rotas Tutores */}
              <Route path="/tutor/:id" element={
                <ProtectedRoute>
                  <TutorDetailsPage />
                </ProtectedRoute>
              } />
              <Route path="/tutor/form/new" element={
                <ProtectedRoute>
                  <TutorFormPage />
                </ProtectedRoute>
              } />
              <Route path="/tutor/form/:id" element={
                <ProtectedRoute>
                  <TutorFormPage />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
