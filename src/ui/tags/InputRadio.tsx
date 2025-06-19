import { InputHTMLAttributes } from "react";

type Props = {
    value: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputRadio({ value, ...rest }: Props) {
    return (
        <div className="flex items-center space-x-1">
            <input
                type="radio"
                id={value}
                value={value}
                {...rest}
            />
            <label htmlFor={value} className="text-sm">{value}</label>
        </div>
    )
}