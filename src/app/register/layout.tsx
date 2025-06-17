import type { Metadata } from "next";
import "../globals.css";
import RegisterHeader from "@/ui/headers/RegisterHeader";


// メタデータ設定
export const metadata: Metadata = {
    title: "新規登録ページ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <RegisterHeader />
            {children}
        </>
    );
}
