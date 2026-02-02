import CardBackground from "./card-background"
import Text from "./text"

export default function SearchBar() {
    return (
        <CardBackground className="flex flex-row w-full py-10 px-8">
            <Text
                as="h1"
                variant="muted"
                className="select-none"
            >
                Pesquise um pet
            </Text>
        </CardBackground>
    )
}