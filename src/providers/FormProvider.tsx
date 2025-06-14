// 複数ステップに分かれたフォームで状態を保持したいのでグローバルな状態管理作成

// ① use client 宣言
'use client';

// ② 必要なインポート
import { createContext, useState, ReactNode, useContext } from "react";
import { ContactFormData } from "@/lib/validation/contactSchema";

// ③ コンテキストの型定義
type FormContextType = {
    formData: ContactFormData | null;
    setFormData: (data: ContactFormData) => void;
}
type Props = {
    children: ReactNode;
}

// ④ Contextの作成
const FormContext = createContext<FormContextType | undefined>(undefined);

// ⑤ カスタムフック（Contextを使いやすくする）
// useFormDataを呼ぶだけでconst context = useContext(FormContext);をインポートできる
export const useFormData = () => {
    const context = useContext(FormContext);
    if (!context) throw new Error('FormProviderが必要です');
    return context;
  };

// ⑥ Context Providerの作成とエクスポート
export const FormProvider = ({children}: Props) => {
    const [formData, setFormData] = useState<ContactFormData | null>(null);

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    )
}