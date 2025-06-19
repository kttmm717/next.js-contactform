//APIルートでcontactsテーブルから全カラム取得のカスタムフック

import { useEffect, useState } from "react";
import { ContactWithCategory } from "../types/contact";


type Props = {
    page: number;
    keyword: string;
    keywordGender: string;
    keywordCategory: string;
    keywordDate: string;
}

export function useContacts({ page, keyword, keywordGender, keywordCategory, keywordDate }: Props) {
    const [contacts, setContacts] = useState<ContactWithCategory[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchContacts = async () => {

            const params = new URLSearchParams();
            params.set('page', page.toString());
            params.set('keyword', keyword);
            params.set('gender', keywordGender);
            params.set("category", keywordCategory);
            params.set("date", keywordDate);

            try {
                const res = await fetch(`/api/contacts?${params.toString()}`);
                const data = await res.json();
                setContacts(data.contacts);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };
        fetchContacts();
    }, [page, keyword, keywordGender, keywordCategory, keywordDate]);

    return { contacts, totalPages };
}