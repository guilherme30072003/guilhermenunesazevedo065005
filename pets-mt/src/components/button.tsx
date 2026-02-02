import React from "react"
import Text from "./text";



const buttonVariants = {
    default: 'bg-(--background)',
    primary: 'bg-(--primary)',
    no_bg: ''

} as const

type ButtonVariant = keyof typeof buttonVariants

const styleVariants = {
    default: 'flex items-center justify-center rounded-xl p-3 cursor-pointer  bg-linear-(--gradient)  hover:bg-linear-(--gradient-hover) shadow-(--shadow)',
    pagination: 'flex items-center justify-center gap-1.5 p-3 cursor-pointer  bg-linear-(--gradient)  hover:bg-linear-(--gradient-hover) shadow-(--shadow)',
    card: 'flex items-center justify-center cursor-pointer'
} as const

type StyleVariant = keyof typeof styleVariants


interface ButtonProps {
    variant: ButtonVariant;
    className?: string;
    children?: React.ReactNode;
    buttonVariants?: {
        default: 'bg-(--background)',
        primary: 'bg-(--primary)',
        no_bg: ''
    };
    style_variant: StyleVariant;
    styleVariants?: {
        default: 'flex items-center justify-center rounded-xl p-3 cursor-pointer  bg-linear-(--gradient)  hover:bg-linear-(--gradient-hover) shadow-(--shadow)',
        pagination: 'flex items-center justify-center gap-1.5 p-3 cursor-pointer  bg-linear-(--gradient)  hover:bg-linear-(--gradient-hover) shadow-(--shadow)',
        card: 'flex items-center justify-center cursor-pointer'
    };
}


export default function Button({
    variant = 'default',
    style_variant = 'default',
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <Text
            as="button"
            variant="heading"
            className={`
            ${styleVariants[style_variant]}
            ${buttonVariants[variant]}
            ${className ? className : ''}
          `}
            {...props}
        >
            {children}
        </Text>
    )
}

