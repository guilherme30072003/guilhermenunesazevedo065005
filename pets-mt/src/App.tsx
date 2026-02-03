import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Text from "./components/text";
import HomePage from "./pages/HomePage";
import PetDetailsPage from "./pages/PetDetailsPage";

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pet/:id" element={<PetDetailsPage />} />
        </Routes>
      </main>
    </Router>
  );
}
