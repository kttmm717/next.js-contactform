// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// グローバルに prisma を保持（開発環境での多重生成防止）
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query'], // ← SQLログ見たいとき便利（消してもOK）
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
