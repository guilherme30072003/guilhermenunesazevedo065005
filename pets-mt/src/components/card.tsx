import CardBackground from "./card-background";
import CardData from "./card-data";

interface CardProps {
    id: number;
    nome?: string;
    raca?: string;
    idade?: number;
    foto?: {
        id?: number;
        nome?: string;
        contentType?: string;
        url?: string;
    };
}

export default function Card({ id, nome, raca, idade, foto }: CardProps) {
    return (
        <CardBackground className={`
          flex flex-col gap-4 w-full h-96
          pt-4 px-6 pb-6 cursor-pointer
          overflow-hidden
          `}>
            <CardData id={id} nome={nome} raca={raca} idade={idade} foto={foto} />
        </CardBackground>
    )
}
