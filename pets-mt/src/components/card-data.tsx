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
              flex flex-col gap-3 px-0 h-full
            `}>
            <div className={`
              flex items-center justify-center shrink-0
              w-full h-40 bg-gray-700 rounded-lg overflow-hidden
              `}>
                <img
                    src={foto?.url}
                    alt={foto?.nome}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className={`
              flex items-center justify-center
              `}>
                <Text
                    variant="minus_muted"
                    className="truncate"
                >
                    ID: {id}
                </Text>
            </div>
            <div className={`
              flex items-center justify-center
              `}>
                <Text
                    variant="blast"
                    className="truncate text-center line-clamp-2"
                >
                    {nome}
                </Text>
            </div>
            <div className={`
              flex items-center justify-center
              `}>
                <Text
                    variant="default"
                    className="truncate"
                >
                    Idade: {idade}
                </Text>
            </div>
            <Text
                as="div"
                variant="muted"
                className="flex items-center justify-center truncate"
            >
                {raca}
            </Text>
        </div>
    )
}