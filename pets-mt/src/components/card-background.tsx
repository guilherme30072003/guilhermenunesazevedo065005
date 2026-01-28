import React from "react"

interface CardBackgroundProps {
    className?: string;
    children?: React.ReactNode;
}

export default function CardBackground({ children, className }: CardBackgroundProps) {
    return (
        <div className={`
            bg-(--background) shadow-(--shadow)
            rounded-2xl
            ${className ? className : ''}
          `}>
            {children}
        </div>
    )
}