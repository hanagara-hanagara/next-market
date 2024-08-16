'use client';
import React, { useState } from 'react';
import useAuth from '@/app/utils/useAuth';

const CreateItem = () => {
    const [item, setItem] = useState({
        title: '',
        price: '',
        image: '',
        description: '',
    });

    const loginUserEmail = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // console.log(e.target);
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    ...item,
                    email: loginUserEmail,
                }),
            });

            const jsonData: { message: string } = await response.json();
            console.log(jsonData);
            alert(jsonData.message);
        } catch (err) {
            alert('アイテム作成失敗');
        }
    };

    if (loginUserEmail) {
        return (
            <div>
                <h1 className="page-title">アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={item.title}
                        onChange={e => handleChange(e)}
                        type="text"
                        name="title"
                        placeholder="アイテム名"
                        required
                    />
                    <input
                        value={item.price}
                        onChange={e => handleChange(e)}
                        type="text"
                        name="price"
                        placeholder="価格"
                        required
                    />
                    <input
                        value={item.image}
                        onChange={e => handleChange(e)}
                        type="text"
                        name="image"
                        placeholder="画像"
                        required
                    />
                    <textarea
                        value={item.description}
                        onChange={e => handleChange(e)}
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
