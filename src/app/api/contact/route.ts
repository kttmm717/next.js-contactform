// 送信時の処理（テーブルに保存処理）

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, gender, email, tel, address, building, category, content } = body;

        const categoryRecord = await prisma.category.findFirst({
        //categoriesテーブルから最初の1件だけを探す関数
            where: { category: category }
            //categoryカラムで検索してレコード取得
        })

        if (!categoryRecord) {
            throw new Error("カテゴリが存在しません");
          }

        await prisma.contact.create({
            data: {
                // 省略記法（キーと変数名が同じ時に使う）
                name,
                gender,
                email,
                tel,
                address,
                building,
                category: { connect: { id: categoryRecord.id } },
                // Prismaでリレーションを張るときの書き方
                content
            }
        });
        return NextResponse.json({ message: '保存成功' }, { status: 200 });
    }catch(error) {
        console.error('保存エラー:', error);
        return NextResponse.json({ message: '保存失敗' }, { status: 500 });
    }
}