import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    await prisma.user.createMany({
        data: [
            {
                name: '一般ユーザー',
                email: 'test.gmail.com',
                password: 'password123'
            }
        ]
    });

    await prisma.category.createMany({
        data: [
            { category: '商品のお届けについて' },
            { category: '商品の交換について' },
            { category: '商品トラブル' },
            { category: 'ショップへのお問い合わせ' },
            { category: 'その他' },
        ]
    });
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