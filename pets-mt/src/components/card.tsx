import Button from "./button";
import CardBackground from "./card-background";
import CardData from "./card-data";


export default function Card() {
    return (
        <CardBackground className={`
          flex flex-col gap-6.5 w-89
          pt-14 px-8 pb-8
          `}>
            <CardData nome="Nome Pet" raca="Raça Pet" />

            <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <Button className="flex-1 h-16" variant="primary">Detalhes</Button>
                </div>
            </div>
        </CardBackground>
    )
}