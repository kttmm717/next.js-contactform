'use client';

import { ContactFormData } from "@/lib/validation/contactSchema";
import { useFormData } from "@/providers/FormProvider";
import Button from "@/ui/buttons/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ThanksPage() {

    const router = useRouter();
    const { setFormData } = useFormData();
    const { reset } = useForm<ContactFormData>();

    const handleHome = () => {
        setFormData({  //コンテキストに残ってるデータ削除
            name: '',
            gender: '男性',
            email: '',
            tel: '',
            address: '',
            category: '',
            content: '',
        });
        reset();  //react-hook-form上のフォームを初期化
        router.push('/contact');
    }

    return (
        <div className="text-yellow-800 relative text-center">
            <div className="absolute top-60 left-1/2 transform -translate-x-1/2 z-10">
                <p>お問い合わせありがとうございました</p>
                <Button
                    onClick={handleHome}
                    className="mt-4"
                >
                    HOME
                </Button>
            </div>
            <div className="absolute top-30 left-8 text-[20vw] opacity-10">
                <p>Thank you</p>
            </div>
        </div>
    )
}