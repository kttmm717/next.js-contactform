//APIルートでcategoriesテーブルから全カラム取得のカスタムフック

import { Category } from "@prisma/client";
import { useEffect, useState } from "react";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    return { categories };
}