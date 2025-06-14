import {TextareaHTMLAttributes } from "react";

type Props =  & TextareaHTMLAttributes<HTMLTextAreaElement>; 

export default function Textarea({ ...rest }: Props) {
    return (
        <textarea
            className="w-[70%] h-[160px] bg-gray-100 rounded-xs p-2 outline-0 text-xs resize-none"
            {...rest}
        >
        </textarea>
    )
}