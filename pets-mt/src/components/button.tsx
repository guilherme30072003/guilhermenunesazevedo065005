import React from "react"
import Text from "./text";



const buttonVariants = {
    default: 'bg-(--background)',
    primary: 'bg-(--primary)'
} as const

type ButtonVariant = keyof typeof buttonVariants



interface ButtonProps {
    variant: ButtonVariant
    className?: string;
    children?: React.ReactNode;
    buttonVariants?: {
        default: 'bg-(--background)',
        primary: 'bg-(--primary)'
    };
}


export default function Button({
    variant = 'default',
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <Text
            as="button"
            variant="heading"
            className={`
            flex items-center justify-center rounded-xl
            p-3 cursor-pointer text-(--text) 
            bg-linear-(--gradient) 
            hover:bg-linear-(--gradient-hover)
            shadow-(--shadow)
            ${buttonVariants[variant]}
            ${className ? className : ''}
          `}
            {...props}
        >
            {children}
        </Text>
    )
}

