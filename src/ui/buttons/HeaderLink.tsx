import Link from "next/link";
import { ReactNode } from "react";


type Props = {
    href: string;
    children: ReactNode;
}

export default function HeaderLink({ href, children }: Props) {
    return (
        <Link
            href={href}
            className="border border-[#e0d4ca] text-xs p-1 bg-[#f4efeb] text-[#b1a49a] hover:bg-[#dfdbd8]"
        >
            {children}
        </Link>
    )
}