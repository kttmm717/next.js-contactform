import type { Metadata } from "next";
import "../globals.css";
import LogoutHeader from "@/ui/headers/LogoutHeader";


// メタデータ設定
export const metadata: Metadata = {
    title: "管理者ページ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <LogoutHeader />
            {children}
        </>
    );
}
