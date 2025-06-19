'use server'

import { revalidatePath } from "next/cache"
import postgres from "postgres"

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function deleteContact(formdate: FormData) {
    const id = formdate.get('id');

    if (typeof id !== 'string') throw new Error('Invalid id');

    await sql`
        DELETE FROM contacts
        WHERE id = ${id}
    `;

    revalidatePath('/admin');
}