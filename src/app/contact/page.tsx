'use client';

import CategorySelect from "@/ui/CategorySelect";
import Input from "@/ui/Input";
import InputRadio from "@/ui/InputRadio";
import Item from "@/ui/Item";
import ItemRequired from "@/ui/ItemRequired";
import Textarea from "@/ui/Textarea";
import Button from "@/ui/buttons/button";
import { ContactFormData, contactSchema } from "@/lib/validation/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormData } from '@/providers/FormProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";


export default function ContactPage() {

  const { formData, setFormData } = useFormData();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    // zodによるバリデーションをReact Hook Formに接続
    defaultValues: formData ?? undefined,
  });

  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [formData, reset]);

  const router = useRouter();

  // 送信時の関数定義
  const onSubmit = (data: ContactFormData) => {
    setFormData(data);
    router.push('/contact/confirm');
  };


  // ここからビュー（フォーム）
  return (
    <div className="w-[80%] mx-auto text-yellow-800 md:w-[50%]">

      <h2 className="text-center my-6">Contact</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >

        {/* 名前 */}
        <div className="flex justify-between items-center">
          <ItemRequired name='お名前' />
          <Input
            placeholder='例：山田 太郎'
            width='[70%]'
            {...register('name')}
          />
        </div>

        {errors.name &&
          <p className="text-red-500 text-sm">{errors.name.message}</p>}


        {/* 性別 */}
        <div className="flex items-center">
          <ItemRequired name='性別' />
          <div className="flex space-x-4">
            <InputRadio
              value='男性'
              {...register('gender')}
            />
            <InputRadio
              value='女性'
              {...register('gender')}
            />
            <InputRadio
              value='その他'
              {...register('gender')}
            />
          </div>
        </div>

        {errors.gender &&
          <p className="text-red-500 text-sm">{errors.gender.message}</p>}


        {/* メールアドレス */}
        <div className="flex justify-between items-center">
          <ItemRequired name='メールアドレス' />
          <Input
            placeholder='例：test@gmail.com'
            width='[70%]'
            {...register('email')}
          />
        </div>

        {errors.email &&
          <p className="text-red-500 text-sm">{errors.email.message}</p>}


        {/* 電話番号 */}
        <div className="flex justify-between items-center">
          <ItemRequired name='電話番号' />
          <Input
            placeholder='例：080-1111-2222'
            width='[70%]'
            {...register('tel')}
          />
        </div>

        {errors.tel &&
          <p className="text-red-500 text-sm">{errors.tel.message}</p>}


        {/* 住所 */}
        <div className="flex justify-between items-center">
          <ItemRequired name='住所' />
          <Input
            placeholder='例：新潟県燕市'
            width='[70%]'
            {...register('address')}
          />
        </div>

        {errors.address &&
          <p className="text-red-500 text-sm">{errors.address.message}</p>}


        {/* 建物名 */}
        <div className="flex justify-between items-center">
          <Item name='建物名' />
          <Input
            placeholder='例：マンション101'
            width='[70%]'
            {...register('building')}
          />
        </div>


        {/* お問い合わせの種類 */}
        <div className="flex justify-between items-center">
          <ItemRequired name='お問い合わせの種類' />
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <CategorySelect {...field} />
            )}
          />
        </div>

        {errors.category &&
          <p className="text-red-500 text-sm">{errors.category.message}</p>}


        {/* お問い合わせ内容 */}
        <div className="flex justify-between mt-2">
          <ItemRequired name='お問い合わせ内容' />
          <Textarea
            placeholder='お問い合わせ内容をご記載ください'
            {...register('content')} />
        </div>

        {errors.content &&
          <p className="text-red-500 text-sm">{errors.content.message}</p>}


        <div className="text-center mt-4">
          <Button>確認画面</Button>
        </div>

      </form>
    </div>
  );
}
