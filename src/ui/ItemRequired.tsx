'use client';

type Props = {
    name: string;
}

export default function ItemRequired({ name }: Props) {
    return (
        <div className="w-[30%]">
            <span className=" text-sm">{name}</span>
            <span className="text-red-500 ml-1">※</span>
        </div>
    )
}