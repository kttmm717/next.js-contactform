import { z } from "zod";

export const authSchema = z.object({
    id: z.string(),
    name: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.string({ required_error: 'お名前を入力してください' })
    ),
    email: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.string({ required_error: 'メールアドレスを入力してください' })
            .email('正しいメールアドレス形式で入力してください'),
    ),
    password: z.string()
        .min(6, 'パスワードは6文字以上で入力してください'),
});

export type ContactFormData = z.infer<typeof authSchema>