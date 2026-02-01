import CardBackground from "./card-background";
import CardData from "./card-data";

interface CardProps {
    nome?: string;
    raca?: string;
}

export default function Card({ nome, raca }: CardProps) {
    return (
        <CardBackground className={`
          flex flex-col gap-6.5 w-89
          pt-14 px-8 pb-8
          `}>
            <CardData nome={nome} raca={raca} />
        </CardBackground>
    )
}
