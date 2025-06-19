'use client';

import { forwardRef, SelectHTMLAttributes, useEffect, useState } from "react";


type Category = {
    id: number;
    category: string;
    create_at: string;
}

type Props = SelectHTMLAttributes<HTMLSelectElement>;
const CategorySelect = forwardRef<HTMLSelectElement, Props>(({ ...rest }, ref) => {
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

    return (
        <select
            className="w-[70%] bg-gray-100 rounded-xs p-2 outline-0 text-xs"
            ref={ref} // ★ここが重要！！
            {...rest}
        >
            <option value="">選択してください</option>
            {categories.map((category) => (
                <option key={category.id} value={category.category}>
                    {category.category}
                </option>
            ))}
        </select>
    );
});

CategorySelect.displayName = 'CategorySelect'; // forwardRefを使うと必要

export default CategorySelect;