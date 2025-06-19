'use client';

type Props = {
    name: string;
}

export default function Item({ name }: Props) {
    return (
        <div className="w-[30%] ">
            <span className=" text-sm">{name}</span>
        </div>
    )
}