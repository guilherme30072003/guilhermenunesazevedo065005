import React from "react"


const textVariants = {
    default: 'text-xl',
    muted: 'text-xl text-(--text-secondary)',
    minus_muted: 'text text-(--text-secondary)',
    heading: 'text-2xl',
    blast: 'text-3xl',
} as const

type TextVariant = keyof typeof textVariants



interface TextProps {
    as?: keyof React.JSX.IntrinsicElements;
    variant: TextVariant
    className?: string;
    children?: React.ReactNode;
    textVariants?: {
        default: 'text-xl',
        muted: 'text-xl text-(--text-secondary)',
        minus_muted: 'text text-(--text-secondary)',
        heading: 'text-2xl',
        blast: 'text-3xl',
    };
}


export default function Text({
    as = 'span',
    variant = 'default',
    className,
    children,
    ...props
}: TextProps) {
    return React.createElement(
        as,
        {
            className: `${textVariants[variant]} ${className ? className : ''}`,
            ...props
        },
        children
    )
}