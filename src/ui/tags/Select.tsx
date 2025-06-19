import { ReactNode, SelectHTMLAttributes } from "react"

type Props = {
    children: ReactNode
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ children, ...rest }: Props) {
    return (
        <select
            className="text-xs border border-gray-300 rounded-xs p-2 bg-gray-100"
            {...rest}
        >
            {children}
        </select>
    )
}