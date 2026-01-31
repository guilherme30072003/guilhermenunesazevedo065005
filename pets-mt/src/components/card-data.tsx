import React from "react"
import Text from "./text";

interface CardDataProps {
    className?: string;
    children?: React.ReactNode;
    nome?: string;
    raca?: string;
}

export default function CardData({ nome, raca }: CardDataProps) {
    return (
        <div className={`
              flex flex-col gap-2 px-5.5
              cursor-default select-none
            `}>
            <div className={`
              flex items-center
              `}>
                <Text
                    variant="muted"
                >
                </Text>
                <Text
                    variant="blast"
                >
                    {nome}
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