// Paginationコンポーネント

'use client'

import { useRouter, useSearchParams } from "next/navigation"
import clsx from 'clsx';

type Props = {
    currentPage: number; //現在ページ
    totalPages: number; //合計ページ数
};

// ここからPaginationコンポーネント
export const Pagination = ({ currentPage, totalPages }: Props) => {

    const router = useRouter();
    //クライアントコンポーネント内のルート間のナビゲーションができる

    const searchParams = useSearchParams();
    // 現在のURLのパラメータにアクセスできる

    // クリック関数（引数にはユーザーが移動したいページ番号）
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        // クエリパラメータを操作できるようにする
        // /admin?page=1だったら、page=1の部分を編集できるようになる

        params.set('page', String(page));  // ←値を変更
        router.push(`?${params.toString()}`); // ←URLを更新して再フェッチ
        // .append(追加)や.delete(削除)もできる！
    };

    return (
        <div className="flex">
            {/* 1ページ戻るボタン */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border border-gray-300 px-1.5 rounded-l-md hover:cursor-pointer"
            >
                &lt;
            </button>

            {/* ページ番号 */}
            {/* スプレット構文で合計ページ数分の空配列を作る */}
            {[...Array(totalPages)].map((_, i) => {
                // _ ← 各要素（だけど使わない）
                // i ← インデックス（使う）
                //ループでインデックスだけ欲しいとき（今回のページ番号とか）
                const pageNum = i + 1;
                //インデックス番号は0始まりなので＋1

                return (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={clsx(
                            'border border-gray-300 px-1.5 hover:cursor-pointer',
                            pageNum === currentPage && 'bg-[#8C7B6F] text-white'
                        )}
                    >
                        {pageNum}
                    </button>
                )
            })}

            {/* 1ページ進むボタン */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border border-gray-300 px-1.5 rounded-r-md hover:cursor-pointer"
            >
                &gt;
            </button>
        </div>
    )
}