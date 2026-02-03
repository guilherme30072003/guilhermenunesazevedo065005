import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Text from "./components/text";
import HomePage from "./pages/HomePage";

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

export default function App() {
  return (
    <Router>
      <main className={`
                py-16 px-4 sm:px-10
                flex-1 sm:flex-row
                items-center sm:items-stretch
                gap-2,
                `}>
        <Text variant="blast" className="text-blue-500 flex items-center justify-center"> 🐶 Pets MT </Text>
        <Text variant="default" className="text-(--text-secondary) flex items-center justify-center"> clique no card para ver os detalhes do pet </Text>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Rotas Pets */}
            <Route path="/pet/:id" element={<PetDetailsPage />} />
            <Route path="/pet/form/new" element={<PetFormPage />} />
            <Route path="/pet/form/:id" element={<PetFormPage />} />
            {/* Rotas Tutores */}
            <Route path="/tutor/:id" element={<TutorDetailsPage />} />
            <Route path="/tutor/form/new" element={<TutorFormPage />} />
            <Route path="/tutor/form/:id" element={<TutorFormPage />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}
