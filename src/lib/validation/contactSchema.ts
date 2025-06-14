// Zodは【バリデーション】と【型定義】を一緒にできる神ライブラリ

import { z } from 'zod';

export const contactSchema = z.object({
    name: z.
        string()
        .min(1, 'お名前を入力してください'),
    gender: z.
        enum(['男性', '女性', 'その他'], {
            errorMap: () => ({ message: '性別を選択してください' }),
        }),
    email: z.
        string()
        .min(1, 'メールアドレスを入力してください')
        .email('正しいメールアドレスを入力してください'),
    tel: z.
        string()
        .min(1, '電話番号を入力してください'),
    address: z.
        string()
        .min(1, '住所を入力してください'),
    building: z.
        string()
        .optional(),
    category: z.
        string()
        .min(1, 'お問い合わせの種類を選択してください'),
    content: z.
        string()
        .min(1, 'お問い合わせ内容を入力してください'),
});

export type ContactFormData = z.infer<typeof contactSchema>