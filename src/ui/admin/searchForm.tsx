'use client'

import { useCategories } from "@/lib/hooks/useCategories";
import Button from "../buttons/button"
import Input from "../tags/Input"
import Select from "../tags/Select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //各入力値をstate管理
  const [searchText, setSearchText] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  // categoriesテーブルから全カラム取得
  const { categories } = useCategories();

  // 検索ボタン関数
    const handleSearch = () => {
      const params = new URLSearchParams(searchParams);
      params.set('keyword', searchText);
      params.set('gender', gender);
      params.set('category', category);
      params.set('date', date);
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    }
  
    // リセットボタン関数
    const handleReset = () => {
      setSearchText('');
      setGender('');
      setCategory('');
      setDate('');
      router.push(`${pathname}?page=1`);
    }

  return (
    <>
      {/* 名前やメールアドレス */}
      <Input
        placeholder="名前やメールアドレスを入力してください"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border border-gray-300 w-[40%]"
      />

      {/* 性別 */}
      <Select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">性別</option>
        <option value="男性">男性</option>
        <option value="女性">女性</option>
        <option value="その他">その他</option>
      </Select>

      {/* お問い合わせの種類 */}
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">お問い合わせの種類</option>
        {categories.map((category) => (
          <option
            key={category.id}
            value={category.category}
          >
            {category.category}
          </option>
        ))}
      </Select>

      {/* 日付 */}
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-gray-300"
      />

      {/* 検索ボタン */}
      <Button
        className="w-[10%]"
        onClick={() => handleSearch()}
      >検索
      </Button>

      {/* リセットボタン */}
      <Button
        onClick={() => { handleReset() }}
        className="w-[10%] bg-[#dfcbbb]"
      >
        リセット
      </Button></>
  )
}