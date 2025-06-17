'use server'

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { authSchema } from "../validation/authSchema";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

type prevState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
}

const CreateUser = authSchema.omit({ id: true });

export async function addUser(
    prevState: prevState,
    formData: FormData
): Promise<prevState> {

    const validatedFields = CreateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '入力項目が足りません。ユーザーの追加に失敗しました。',
        };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`
            INSERT INTO users (name, email, PASSWORD)
                VALUES (${name}, ${email}, ${hashedPassword})
        `;
    } catch {
        return {
            message: 'データベースエラー：ユーザーの追加に失敗しました',
        }
    }

    revalidatePath('/login');
    redirect('/login');
}