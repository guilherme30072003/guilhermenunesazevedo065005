import CardBackground from "./card-background"

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
        <CardBackground className="flex flex-row w-full py-10 px-8">
            <input
                id="search-pet"
                name="search-pet"
                type="text"
                placeholder="Pesquise um pet"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            />
        </CardBackground>
    )
}