import { InputHTMLAttributes } from "react";

type Props = {
    className?: string;
    type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', type = 'text', ...rest }: Props) {
    return (
        <input
            type={type}
            className={`${className} bg-gray-100 rounded-xs p-2 outline-0 text-xs`}
            {...rest}
        />
    )
}