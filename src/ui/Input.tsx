import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...rest }: Props) {
    return (
        <input
            type="text"
            className="w-[70%] bg-gray-100 rounded-xs p-2 outline-0 text-xs"
            {...rest}
        />
    )
}