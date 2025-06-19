'use client'

import { deleteContact } from "@/lib/actions/deleteContact";
import { useContacts } from "@/lib/hooks/useContacts";
import { ContactWithCategory } from "@/lib/types/contact";
import { Pagination } from "@/ui/pagination/Pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AdminTable from "@/ui/admin/table";
import DetailModal from "@/ui/admin/detailModal";
import SearchForm from "@/ui/admin/searchForm";


export default function Admin() {

  const searchParams = useSearchParams();

  // URLから各キーワード取得
  const page = Number(searchParams.get('page')) || 1;
  const keyword = searchParams.get('keyword') || '';
  const keywordGender = searchParams.get('gender') || '';
  const keywordCategory = searchParams.get('category') || '';
  const keywordDate = searchParams.get('date') || '';

  // contactsテーブルから全カラム取得
  const { contacts, totalPages } = useContacts({ page, keyword, keywordGender, keywordCategory, keywordDate });

  // APIで取得したcontactsをstate定義
  const [contactList, setContactList] =
    useState<ContactWithCategory[]>([]);

  // APIで取得したcontactsをstateにセット
  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  // 削除ボタンのスピナー
  const [pending, setPending] = useState(false);

  // 詳細ボタンクリック時の選ばれたお問い合わせのstate管理
  const [selectedContact, setSelectedContact] = useState<ContactWithCategory | null>(null);

  // 削除ボタンクリック関数
  const handleDelete = async () => {
    setPending(true)
    if (!selectedContact) return null;
    const formData = new FormData();
    formData.append('id', String(selectedContact.id));
    formData.append('page', String(page));
    await deleteContact(formData);
    setContactList((prev) => prev.filter((c) => c.id !== selectedContact.id)); //contactListから削除（filter()はある条件を満たす要素だけを残す）
    setSelectedContact(null); //モーダル閉じる
    setPending(false);
  }


  return (
    <div className="text-yellow-800">
      <h1 className="text-center py-6 ">Admin</h1>      
      <div className="px-10 max-w-[1540px] mx-auto lg:px-50">
        <div className="flex justify-between gap-2">
          
          {/* 検索エリア */}
          <SearchForm />
        </div>      
        <div className="flex justify-between items-center py-6">

          {/* エクスポート */}
          <Link
            href=''
            className="text-[#8C7B6F] bg-[#ECE8E3] text-sm px-2 py-1 rounded-xs"
          >
            エクスポート
          </Link>

          {/* ページネーション */}
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
        <div>

          {/* テーブル */}
          <AdminTable
            contactList={contactList}
            setSelectedContact={setSelectedContact}
          />
          {/* モーダル */}
          <DetailModal
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            handleDelete={handleDelete}
            pending={pending}
          />
        </div>
      </div>
    </div>
  )
}