import Text from "./components/text"
import Home from "./routes/home"


export default function App() {
  return (
    <main className={`
          py-16 px-4 sm:px-10
          flex-1 sm:flex-row
          items-center sm:items-stretch
          gap-2,
          `}>
      <Text variant="blast" className="text-blue-500 flex items-center justify-center"> 🐶 Pets MT </Text>
      <Text variant="default" className="text-(--text-secondary) flex items-center justify-center"> clique no card para ver os detalhes do pet </Text>
      <Home />
    </main>
  )
}
