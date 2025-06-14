'use client';

import { useFormData } from "@/providers/FormProvider";
import Button from "@/ui/button";
import { useRouter } from "next/navigation";

export default function ConfirmPage() {

    const { formData } = useFormData();
    //state [formData, setFormData]の、formDataのほうをインポート

    const router = useRouter();

    if (!formData) {
        return (
            <p className="text-center my-6 text-yellow-800">
                フォームの情報がありません。戻って再入力してください。
            </p>
        )
    };

    const handleSecd = async() => {
        try {
            //API経由でデータをサーバーに送信
            const res = await fetch('/api/contact', { //送信先
                method: 'POST', // 送信方法
                headers: {
                    'Content-Type': 'application/json',
                    //データの形式をサーバーに伝える
                },
                body: JSON.stringify(formData),
                //実際に送りたいデータ（JSON文字列に変換してから）
            });
            if (res.ok) { 
                router.push('/contact/thanks');
            } else {
                console.error('送信失敗:', await res.text());
            }
        } catch (error) {
            console.error('エラー:', error);
        }
    }

    // スタイル
    const th = 'bg-[#b49e8e] text-white font-light px-6 py-4 border border-gray-300 w-[30%]';
    const td = 'px-6 py-4 border border-gray-300 w-[70%]';

    // ここからビュー
    return (
        <div className="w-[80%] mx-auto text-yellow-800 md:w-[50%]">
            <h2 className="text-center my-6">Confirm</h2>

            <table className="w-full">
                <tbody className="text-left text-sm">
                    <tr>
                        <th className={th}>お名前</th>
                        <td className={td}>{formData.name}</td>
                    </tr>
                    <tr>
                        <th className={th}>性別</th>
                        <td className={td}>{formData.gender}</td>
                    </tr>
                    <tr>
                        <th className={th}>メールアドレス</th>
                        <td className={td}>{formData.email}</td>
                    </tr>
                    <tr>
                        <th className={th}>電話番号</th>
                        <td className={td}>{formData.tel}</td>
                    </tr>
                    <tr>
                        <th className={th}>住所</th>
                        <td className={td}>{formData.address}</td>
                    </tr>
                    <tr>
                        <th className={th}>建物名</th>
                        <td className={td}>{formData.building}</td>
                    </tr>
                    <tr>
                        <th className={th}>お問い合わせの種類</th>
                        <td className={td}>{formData.category}</td>
                    </tr>
                    <tr>
                        <th className={th}>お問い合わせの内容</th>
                        <td className={td}>{formData.content}</td>
                    </tr>
                </tbody>
            </table>

            <div className="text-center mt-5">
                {/* 送信ボタン */}
                <Button onClick={handleSecd}>送信</Button>

                {/* 修正ボタン */}
                <button
                    className="ml-5 underline decoration-1 hover: cursor-pointer"
                    onClick={() => router.back()}
                >
                    修正
                </button>
            </div>
        </div>
    )
}