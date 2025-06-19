'use server';

import { signIn } from "../../../auth";
import { AuthError } from "next-auth";


export async function authenticate(
    prevState: string | undefined,
    // 前回の状態（エラーやメッセージなど）を第一引数
    formData: FormData
    // ログインに必要な情報のformDataを第二引数

): Promise<string | undefined> {
    // 関数の戻り値の型（省略可 型推論してくれるので）
    // この関数は「stringかundefinedを返すPromise（非同期処理）」という意味

    try {
        await signIn('credentials', formData);
        // 第一引数にログイン方法、第二引数にformDataを指定
        // credentialsはユーザー名やパスワードでログイン（独自認証）

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return '認証情報が正しくありません';
                default:
                    return '問題が発生しました';
            }
        }
        throw error;
    }
}