import type { Metadata } from "next";
import "../globals.css";
import LoginHeader from "@/ui/headers/LoginHeader";


// メタデータ設定
export const metadata: Metadata = {
    title: "ログインページ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <LoginHeader />
            {children}
        </>
    );
}
