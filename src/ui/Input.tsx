import { InputHTMLAttributes } from "react";

type Props = {
    width?: string;
    type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ width = 'full', type = 'text', ...rest }: Props) {
    return (
        <input
            type={type}
            className={`w-${width} bg-gray-100 rounded-xs p-2 outline-0 text-xs`}
            {...rest}
        />
    )
}