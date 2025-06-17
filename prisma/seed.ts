import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { fakeContact } from "../factories/contactFactory";


const prisma = new PrismaClient();

async function seed() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await prisma.contact.deleteMany();
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();

    await prisma.user.createMany({
        data: [
            {
                name: '一般ユーザー',
                email: 'test@gmail.com',
                password: hashedPassword
            }
        ]
    });
    await prisma.category.createMany({
        data: [
            { id: 1, category: '商品のお届けについて' },
            { id: 2, category: '商品の交換について' },
            { id: 3, category: '商品トラブル' },
            { id: 4, category: 'ショップへのお問い合わせ' },
            { id: 5, category: 'その他' },
        ],
        skipDuplicates: true,
    });
    for (let i = 0; i < 35; i++) {
        await prisma.contact.createMany({
            data: fakeContact(),
        })
    }
}

seed()
    .then(() => {
        console.log('🌱 Seeding completed!');
    })
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })