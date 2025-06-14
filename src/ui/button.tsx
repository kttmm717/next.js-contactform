'use client';

import { ReactNode } from "react";


type Props = {
    children: ReactNode;
    onClick?: () => void;
}

export default function Button({ children, onClick }: Props) {
    return (
        <button
            className="bg-[#88786d] text-white w-[140px] text-center mx-auto mt-4 rounded-xs text-sm p-1.5 hover:opacity-90 cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
}