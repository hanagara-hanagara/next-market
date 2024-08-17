'use client';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/utils/useAuth';
import { ItemData } from '@/app/api/item/create/route';
import { Context } from '@/app/api/item/readsingle/[id]/route';
import Image from 'next/image';

const DeleteItem: NextPage<Context> = context => {
    const [item, setItem] = useState({
        title: '',
        price: '',
        image: '',
        description: '',
    });
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const loginUserEmail = useAuth();
    const router = useRouter();

    useEffect(() => {
        const getSingleItem = async (id: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, { cache: 'no-store' });
            const jsonData = await response.json();
            const singleItem: ItemData = jsonData.singleItem;
            setItem({
                ...singleItem,
            });
            setEmail(singleItem.email);
            setLoading(true);
        };
        getSingleItem(context.params.id);
    }, [context]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('name =', name, 'value =', value);
        setItem({
            ...item,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    email: loginUserEmail,
                }),
            });

            const jsonData: { message: string } = await response.json();
            console.log(jsonData);
            alert(jsonData.message);
            router.push('/');
            router.refresh();
        } catch (err) {
            alert('アイテム削除失敗');
        }
    };

    if (loading) {
        if (loginUserEmail === email) {
            return (
                <div>
                    <h1 className="page-title">アイテム削除</h1>
                    <form onSubmit={handleSubmit}>
                        <h2>{item.title}</h2>
                        <Image
                            src={item.image}
                            width={750}
                            height={500}
                            alt={item.title}
                            priority
                        />
                        <p>{item.description}</p>
                        <button>削除</button>
                    </form>
                </div>
            );
        } else {
            <h1>権限がありません</h1>;
        }
    } else {
        return <h1>ローディング中...</h1>;
    }
};

export default DeleteItem;
