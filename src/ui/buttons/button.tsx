'use client';

import { ReactNode } from "react";


type Props = {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export default function Button({
    children, onClick,
    disabled = false,
    className = '',
}: Props) {
    return (
        <button
            className={`bg-[#88786d] text-white w-[140px] text-center rounded-xs text-sm p-1.5 hover:opacity-90 cursor-pointer ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}