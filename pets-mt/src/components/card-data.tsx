import React from "react"
import Text from "./text";

interface CardDataProps {
    className?: string;
    children?: React.ReactNode;
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

export default function CardData({ id, nome, raca, idade, foto }: CardDataProps) {
    return (
        <div className={`
              flex flex-col gap-2 px-5.5
            `}>
            <div className={`
              flex items-center
              `}>
                <img src={foto?.url} alt={foto?.nome} />
            </div>
            <div className={`
              flex items-center
              `}>
                <Text
                    variant="minus_muted"
                >
                    ID: {id}
                </Text>
            </div>
            <div className={`
              flex items-center
              `}>
                <Text
                    variant="blast"
                >
                    {nome}
                </Text>
            </div>
            <div className={`
              flex items-end
              `}>
                <Text
                    variant="default"
                >
                    Idade: {idade}
                </Text>
            </div>
            <Text
                as="div"
                variant="muted"
                className="flex items-center"
            >
                {raca}
            </Text>
        </div>
    )
}