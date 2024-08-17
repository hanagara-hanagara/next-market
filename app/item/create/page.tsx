'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/utils/useAuth';
import type { NextPage } from 'next';
import ImgInput from '../../components/imginput';

const CreateItem: NextPage = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const loginUserEmail = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail,
                }),
            });

            const jsonData: { message: string } = await response.json();
            console.log(jsonData);
            alert(jsonData.message);
            router.push('/');
            router.refresh();
        } catch (err) {
            alert('アイテム作成失敗');
        }
    };

    if (loginUserEmail) {
        return (
            <div>
                <h1 className="page-title">アイテム作成</h1>
                <ImgInput setImage={setImage} />
                <form onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        placeholder="アイテム名"
                        required
                    />
                    <input
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        type="text"
                        name="price"
                        placeholder="価格"
                        required
                    />
                    <input
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        type="text"
                        name="image"
                        placeholder="画像"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        name="description"
                        rows={15}
                        placeholder="商品説明"
                        required></textarea>
                    <button>作成</button>
                </form>
            </div>
        );
    }
};

export default CreateItem;
