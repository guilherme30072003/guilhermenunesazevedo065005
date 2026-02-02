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
          flex flex-col gap-6.5 w-89
          pt-14 px-8 pb-8 cursor-pointer
          `}>
            <CardData id={id} nome={nome} raca={raca} idade={idade} foto={foto} />
        </CardBackground>
    )
}
