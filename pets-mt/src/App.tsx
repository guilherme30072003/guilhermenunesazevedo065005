import SearchBar from "./components/search-bar"
import Home from "./routes/home"


export default function App() {
  return (
    <main className={`
          py-28 px-4 sm:px-10
          flex-1 sm:flex-row
          items-center sm:items-stretch
          gap-2,
          `}>
      <SearchBar />
      <Home />
    </main>
  )
}
