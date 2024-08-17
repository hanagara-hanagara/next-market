import type { NextPage } from 'next';
import React from 'react';
import { ItemData } from '@/app/api/item/create/route';
import Image from 'next/image';
import Link from 'next/link';

type Context = {
    params: { id: string };
};

const getSingleItem = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle//${id}`, { cache: 'no-store' });
    const jsonData = await response.json();
    const singleItem: ItemData = jsonData.singleItem;
    return singleItem;
};

const ReadSingleItem: NextPage<Context> = async context => {
    const singleItem = await getSingleItem(context.params.id);

    return (
        <div className="grid-container-si">
            <div>
                <Image
                    src={singleItem.image}
                    width={750}
                    height={500}
                    alt={singleItem.title}
                />
            </div>
            <h1>{singleItem.title}</h1>
            <h2>¥{singleItem.price}</h2>
            <hr />
            <p>{singleItem.description}</p>
            <div>
                <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
                <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
            </div>
        </div>
    );
};

export default ReadSingleItem;
