// GETお問い合わせテーブルから全カラム取得
// POSTお問い合わせ送信時の処理（テーブルに保存処理）

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    //urlをURLオブジェクトに変換（検索パラメータなどを楽に扱えるようにするため）
    const page = Number(searchParams.get('page') || '1');
    const keyword = searchParams.get('keyword') || '';
    const gender = searchParams.get('gender') || '';
    const category = searchParams.get('category') || '';
    const date = searchParams.get('date') || '';
    const perPage = 7;
    const whereCondition = {
        AND: [
            {
                OR: [
                    { name: { contains: keyword, } },
                    { email: { contains: keyword, } }
                ]
            },
            gender ? { gender: { equals: gender } } : {},
            category ? { category: { category: { equals: category } } } : {}, //カテゴリーはリレーション
            date ? { create_at: { gte: new Date(date + "T00:00:00Z"), lt: new Date(date + "T23:59:59Z")}} : {},
        ]
    };
    const [contacts, totalCount] = await Promise.all([
        prisma.contact.findMany({ //実際のページのデータを取得
            where: whereCondition,
            skip: (page - 1) * perPage, //前のページの分だけスキップ
            take: perPage, //7件だけ取り出す
            include: {  //リレーションしてるカテゴリー情報も含める
                category: true,
            }
        }),
        prisma.contact.count({
            where: whereCondition
        }), //全体の件数を数える
    ]);
    const totalPages = Math.ceil(totalCount / perPage); //ページ数を計算

    return NextResponse.json({ //クライアントへ返す
        contacts, totalPages,
    });
}

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
    } catch (error) {
        console.error('保存エラー:', error);
        return NextResponse.json({ message: '保存失敗' }, { status: 500 });
    }
}