import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import postgres from 'postgres';
import bcrypt from 'bcrypt';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
//.envにあるデータベースURLでPostgreSQLに接続（SSLを有効）

type User = {
    name: string;
    email: string;
    password: string;
    create_at: string;
}

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`
            SELECT
                *
            FROM
                users
            WHERE
                email = ${email}
        `;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
    }
}

export const { auth, signIn, signOut } = NextAuth({
    //NextAuthからauth, signIn, signOutを取り出して使えるようにする
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                //メール＋パスワードでログインしたいときに使うのがこれ！

                const validationResult = z
                    //zodでバリデーションチェック
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6)
                    })
                    .safeParse(credentials);

                if (validationResult.success) {
                    const { email, password } = validationResult.data;

                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    //入力されたパスワードがDBに保存されたハッシュと一致するかチェック
                    if (passwordMatch) return user;
                }
                return null;
            },
        }),
    ],
});