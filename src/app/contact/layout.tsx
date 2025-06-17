import type { Metadata } from "next";
import "../globals.css";
import Header from "@/ui/headers/Header";
import { FormProvider } from "@/providers/FormProvider";


// メタデータ設定
export const metadata: Metadata = {
  title: "お問い合わせフォーム",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <Header />
      <FormProvider>
        {children}
      </FormProvider>
    </>
  );
}
