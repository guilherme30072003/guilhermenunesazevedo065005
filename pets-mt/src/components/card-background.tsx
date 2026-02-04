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
            transition-all duration-300 ease-in-out
            hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1
            ${className ? className : ''}
          `}>
            {children}
        </div>
    )
}